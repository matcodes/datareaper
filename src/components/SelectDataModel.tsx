import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Dimensions} from 'react-native';
import {DataModel} from '../types';
const logo = require('../assets/logo.png');

interface Props {
  dataModels: DataModel[];
  onSelectDataModel: (dataModel: DataModel) => void;
}

export default function SelectDataModel(props: Props) {
  return (
    <View style={styles.wrapper}>
      <Image source={logo} style={styles.logo} />
      <SelectDropdown
        data={props.dataModels}
        onSelect={(selectedItem: DataModel) => {
          props.onSelectDataModel(selectedItem);
        }}
        defaultButtonText="Select a Data Model"
        buttonTextStyle={styles.selectButtonText}
        buttonStyle={styles.selectButton}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem.name;
        }}
        rowTextForSelection={(item: DataModel) => {
          return item.name;
        }}
        rowTextStyle={styles.rowText}
        rowStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height - 250,
  },
  logo: {
    width: 260,
    height: 260,
  },
  title: {
    fontSize: 20,
  },
  selectButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  selectButton: {
    width: Dimensions.get('screen').width - 50,
    backgroundColor: 'black',
  },
  rowText: {
    color: 'white',
  },
  row: {
    backgroundColor: 'black',
  },
});
