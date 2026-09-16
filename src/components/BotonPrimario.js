import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const BotonPrimario = ({ titulo, onPress, cargando, disabled, variante = 'primario' }) => {
  const esSecundario = variante === 'secundario';
  const esPeligro = variante === 'peligro';

  return (
    <TouchableOpacity
      style={[
        styles.boton,
        esSecundario && styles.botonSecundario,
        esPeligro && styles.botonPeligro,
        disabled && styles.botonDeshabilitado,
      ]}
      onPress={onPress}
      disabled={disabled || cargando}
      activeOpacity={0.8}
    >
      {cargando ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.texto}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
};

export default BotonPrimario;

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#6C3FA6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  botonSecundario: {
    backgroundColor: '#9B6FD1',
  },
  botonPeligro: {
    backgroundColor: '#E1473B',
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  texto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
