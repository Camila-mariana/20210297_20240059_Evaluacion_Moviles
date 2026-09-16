import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import useAuth, { traducirErrorAuth } from '../hooks/useAuth';
import CampoTexto from '../components/CampoTexto';
import BotonPrimario from '../components/BotonPrimario';

const Login = ({ navigation }) => {
  const { iniciarSesion } = useAuth();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      Alert.alert('Datos incompletos', 'Ingresa tu correo y tu contraseña.');
      return;
    }

    setEnviando(true);
    try {
      await iniciarSesion(correo.trim(), contrasena);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.code, error.message);
      Alert.alert('No se pudo iniciar sesión', traducirErrorAuth(error.code));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

        <CampoTexto
          etiqueta="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          placeholder="tucorreo@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <CampoTexto
          etiqueta="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          placeholder="••••••••"
          secureTextEntry
        />

        <BotonPrimario titulo="Ingresar" onPress={handleLogin} cargando={enviando} />

        <TouchableOpacity
          style={styles.enlace}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.enlaceTexto}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6C3FA6',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#7C6A93',
    textAlign: 'center',
    marginBottom: 28,
    marginTop: 4,
  },
  enlace: {
    marginTop: 20,
  },
  enlaceTexto: {
    color: '#6C3FA6',
    fontWeight: '700',
    textAlign: 'center',
  },
});
