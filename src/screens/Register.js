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
import { crearPerfil } from '../hooks/usePerfil';
import CampoTexto from '../components/CampoTexto';
import BotonPrimario from '../components/BotonPrimario';

const Register = ({ navigation }) => {
  const { registrarse } = useAuth();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [carnet, setCarnet] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleRegister = async () => {
    if (!correo || !contrasena || !confirmarContrasena || !nombreCompleto || !fechaNacimiento || !carnet) {
      Alert.alert('Datos incompletos', 'Completa todos los campos obligatorios.');
      return;
    }

    if (contrasena.length < 6) {
      Alert.alert('Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      Alert.alert('Las contraseñas no coinciden', 'Vuelve a escribirlas.');
      return;
    }

    setEnviando(true);
    try {
      const usuarioCreado = await registrarse(correo.trim(), contrasena);
      await crearPerfil(usuarioCreado.uid, {
        nombreCompleto: nombreCompleto.trim(),
        fechaNacimiento: fechaNacimiento.trim(),
        carnet: carnet.trim(),
        urlImagen: urlImagen.trim(),
      });
    } catch (error) {
      console.error('Error al registrarse:', error.code, error.message);
      Alert.alert('No se pudo crear la cuenta', traducirErrorAuth(error.code));
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
        <Text style={styles.titulo}>Crear cuenta</Text>
        <Text style={styles.subtitulo}>Completa tus datos para registrarte</Text>

        <CampoTexto
          etiqueta="Nombre completo"
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
          placeholder="Ej: Camila Mariana Gómez"
        />

        <CampoTexto
          etiqueta="Fecha de nacimiento"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
          placeholder="DD/MM/AAAA"
          keyboardType="numbers-and-punctuation"
        />

        <CampoTexto
          etiqueta="Carnet institucional"
          value={carnet}
          onChangeText={setCarnet}
          placeholder="Ej: 20240059"
          autoCapitalize="characters"
        />

        <CampoTexto
          etiqueta="URL de imagen de perfil"
          value={urlImagen}
          onChangeText={setUrlImagen}
          placeholder="https://..."
          autoCapitalize="none"
          keyboardType="url"
        />

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
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
        />

        <CampoTexto
          etiqueta="Confirmar contraseña"
          value={confirmarContrasena}
          onChangeText={setConfirmarContrasena}
          placeholder="••••••••"
          secureTextEntry
        />

        <BotonPrimario titulo="Crear cuenta" onPress={handleRegister} cargando={enviando} />

        <TouchableOpacity
          style={styles.enlace}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.enlaceTexto}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    marginBottom: 24,
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
