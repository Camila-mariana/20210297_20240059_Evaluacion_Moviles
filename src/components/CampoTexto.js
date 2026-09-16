import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CampoTexto = ({
  etiqueta,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'sentences',
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7C6A93"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default CampoTexto;

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    marginBottom: 16,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2B1B40',
  },
  input: {
    height: 46,
    borderColor: '#E0D4F0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    color: '#2B1B40',
    fontSize: 15,
  },
});
