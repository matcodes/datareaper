import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  label?: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  editable?: boolean;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  multiline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function CustomInputComponent(props: Props) {
  return (
    <View style={styles.inputContainer}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={[styles.wrapper]}>
        <TextInput
          style={[styles.textInput]}
          onChangeText={props.onChange}
          value={props.value}
          placeholderTextColor={'#98a1a8'}
          editable={props.editable}
          selectTextOnFocus={props.editable}
          onEndEditing={props.onSubmitEditing}
          blurOnSubmit={false}
          multiline={props.multiline}
          keyboardType={props.keyboardType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 5,
    backgroundColor: '#f7f8fa',
    alignItems: 'center',
    borderColor: '#d7dfe4',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  inputContainer: {},
  icon: {
    color: 'black',
  },
  textInput: {
    flex: 1,
    width: '100%',
    color: 'black',
    fontSize: 18,
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  label: {
    color: 'black',
  },
});
