/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DataModelComponent from './components/DataModelComponent';
import SelectDataModel from './components/SelectDataModel';
import dataModels from './dataModels';
import {DataModel} from './types';

const App = () => {
  const [currentDataModel, setCurrentDataModel] = React.useState<DataModel>();

  const onSelectDataModel = (dataModel: DataModel) => {
    setCurrentDataModel(dataModel);
  };

  const goBack = () => {
    setCurrentDataModel(undefined);
  };

  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  const renderUI = () => {
    if (currentDataModel) {
      return <DataModelComponent goBack={goBack} model={currentDataModel} />;
    } else {
      return (
        <ScrollView
          style={styles.container}
          contentInsetAdjustmentBehavior="automatic">
          <SelectDataModel
            dataModels={dataModels as DataModel[]}
            onSelectDataModel={onSelectDataModel}
          />
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {renderUI()}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
