import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {DataModel, Field} from '../types';
import CustomInputComponent from './CustomInputComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props {
  model: DataModel;
  goBack: () => void;
}

export default function DataModelComponent(props: Props) {
  const [model, setModel] = React.useState<DataModel>(props.model);
  const [isProceeded, setIsProceeded] = React.useState<boolean>(false);

  const handleFieldChange = (field: string, value: string) => {
    if (props.model.fields[field].type === 'int' && isNaN(Number(value))) {
      return;
    }

    setModel(prevModel => {
      return {
        ...prevModel,
        fields: {
          ...prevModel.fields,
          [field]: {
            ...prevModel.fields[field],
            value: value,
          },
        },
      };
    });
  };

  const getVariables = useCallback((fields: {[key: string]: Field}) => {
    const keys = Object.keys(fields);

    let _variables = '';

    keys.forEach(key => {
      const value = fields[key].value || fields[key].defaultValue;
      if (value) {
        const getValue = () => {
          if (fields[key].type === 'string') {
            return `'${value || ''}'`;
          } else {
            return value;
          }
        };
        _variables += `const $${key} = ${getValue()}; \n`;
      }
    });

    return _variables;
  }, []);

  const variables = useMemo(() => {
    const fields = model.fields;
    return getVariables(fields);
  }, [getVariables, model.fields]);

  const handleGoBack = () => {
    if (isProceeded) {
      setIsProceeded(false);
    } else {
      props.goBack();
    }
  };

  const handleCalculate = () => {
    let _variables = String(variables);

    setModel(prevModel => {
      for (const key of Object.keys(prevModel.fields)) {
        const field = prevModel.fields[key];
        if (field.calculate) {
          const helperUtils = field.utils || '';
          // eslint-disable-next-line no-eval
          const value = eval(helperUtils + _variables + field.calculate);
          field.value = value?.toString() || '';
          _variables += `const $${key} = ${field.value}; \n`;
        }
      }

      return prevModel;
    });

    setIsProceeded(true);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View>
          <Button color={'black'} onPress={handleGoBack} title="Back" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{model.name}</Text>
        </View>
        <View>
          <Button color={'black'} onPress={handleCalculate} title="Calculate" />
        </View>
      </View>
    );
  };

  const renderFields = ({readOnly}: {readOnly: boolean}) => {
    return Object.keys(model.fields)
      .filter(key => readOnly === model.fields[key].readOnly)
      .map((key, index) => {
        const field = model.fields[key];
        const value =
          field.value ||
          field.defaultValue ||
          (field.type === 'int' ? '0' : '');
        return (
          <View key={`${key}_${index}`} style={styles.fieldWrapper}>
            <CustomInputComponent
              label={field.label}
              value={String(value)}
              editable={!field.readOnly}
              multiline
              autoCapitalize="none"
              onChange={text => handleFieldChange(key, text)}
            />
          </View>
        );
      });
  };

  const renderScreen = () => {
    if (isProceeded) {
      return renderFields({readOnly: true});
    }

    return renderFields({readOnly: false});
  };

  return (
    <View>
      {renderHeader()}
      <KeyboardAwareScrollView
        extraHeight={120}
        contentInsetAdjustmentBehavior="automatic">
        {renderScreen()}
        <View style={styles.spacing} />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 5,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 25,
    textAlign: 'center',
  },
  fieldWrapper: {
    padding: 5,
  },
  spacing: {
    height: 200,
  },
});
