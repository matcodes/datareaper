import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import {DataModel} from '../types';
import {helperFunctions} from '../utils/helpers';
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

  const getExpressionValue = (expression: string) => {
    const fields = model.fields;
    const keys = Object.keys(fields);

    let variables = '';

    keys.forEach(key => {
      if (fields[key].calculate === null) {
        const getValue = () => {
          if (fields[key].type === 'int') {
            return model.fields[key].value || '0';
          } else if (fields[key].type === 'string') {
            return `'${model.fields[key].value || ''}'`;
          } else {
            return '';
          }
        };
        variables += `const ${key} = ${getValue()}; \n`;
      }
    });

    return `
      ${variables}
      ${expression}
    `;
  };

  const handleGoBack = () => {
    if (isProceeded) {
      setIsProceeded(false);
    } else {
      props.goBack();
    }
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
          <Button
            color={'black'}
            onPress={() => setIsProceeded(true)}
            title="Proceed"
          />
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
          field.calculate !== null
            ? // eslint-disable-next-line no-eval
              eval(
                helperFunctions + getExpressionValue(field.calculate || ''),
              )?.toString()
            : field.value || (field.type === 'int' ? '0' : '');
        return (
          <View key={index} style={styles.fieldWrapper}>
            <CustomInputComponent
              label={field.label}
              value={value}
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
        <View style={styles.extraHeight} />
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
  extraHeight: {
    height: 200,
  },
});
