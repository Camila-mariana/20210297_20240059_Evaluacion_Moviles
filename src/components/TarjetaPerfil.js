import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TarjetaPerfil = ({ etiqueta, valor }) => {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor || 'Sin definir'}</Text>
    </View>
  );
};

export default TarjetaPerfil;

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0D4F0',
    shadowColor: '#4A2A73',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7C6A93',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  valor: {
    fontSize: 16,
    color: '#2B1B40',
    fontWeight: '500',
  },
});
