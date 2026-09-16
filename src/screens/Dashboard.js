import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import { useObtenerPerfil, actualizarPerfil } from '../hooks/usePerfil';
import TarjetaPerfil from '../components/TarjetaPerfil';
import CampoTexto from '../components/CampoTexto';
import BotonPrimario from '../components/BotonPrimario';

const Dashboard = () => {
  const { usuario, cerrarSesion } = useAuth();
  const { perfil, cargandoPerfil } = useObtenerPerfil(usuario?.uid);

  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [carnet, setCarnet] = useState('');
  const [urlImagen, setUrlImagen] = useState('');

  useEffect(() => {
    if (perfil) {
      setNombreCompleto(perfil.nombreCompleto ?? '');
      setFechaNacimiento(perfil.fechaNacimiento ?? '');
      setCarnet(perfil.carnet ?? '');
      setUrlImagen(perfil.urlImagen ?? '');
    }
  }, [perfil]);

  const handleGuardar = async () => {
    if (!nombreCompleto || !fechaNacimiento || !carnet) {
      Alert.alert('Datos incompletos', 'Completa todos los campos obligatorios.');
      return;
    }

    setGuardando(true);
    try {
      await actualizarPerfil(usuario.uid, {
        nombreCompleto: nombreCompleto.trim(),
        fechaNacimiento: fechaNacimiento.trim(),
        carnet: carnet.trim(),
        urlImagen: urlImagen.trim(),
      });
      setEditando(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar tu información. Intenta de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoPerfil) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C3FA6" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContenedor}>
        {perfil?.urlImagen ? (
          <Image source={{ uri: perfil.urlImagen }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarVacio]}>
            <Text style={styles.avatarInicial}>
              {(perfil?.nombreCompleto || usuario?.email || '?').charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.correo}>{usuario?.email}</Text>
      </View>

      {editando ? (
        <View style={styles.formulario}>
          <CampoTexto
            etiqueta="Nombre completo"
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
          />
          <CampoTexto
            etiqueta="Fecha de nacimiento"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            placeholder="DD/MM/AAAA"
          />
          <CampoTexto etiqueta="Carnet institucional" value={carnet} onChangeText={setCarnet} />
          <CampoTexto
            etiqueta="URL de imagen"
            value={urlImagen}
            onChangeText={setUrlImagen}
            autoCapitalize="none"
            keyboardType="url"
          />

          <BotonPrimario titulo="Guardar cambios" onPress={handleGuardar} cargando={guardando} />
          <View style={styles.espacio} />
          <BotonPrimario
            titulo="Cancelar"
            variante="secundario"
            onPress={() => setEditando(false)}
            disabled={guardando}
          />
        </View>
      ) : (
        <View style={styles.formulario}>
          <TarjetaPerfil etiqueta="Nombre completo" valor={perfil?.nombreCompleto} />
          <TarjetaPerfil etiqueta="Fecha de nacimiento" valor={perfil?.fechaNacimiento} />
          <TarjetaPerfil etiqueta="Carnet institucional" valor={perfil?.carnet} />

          <BotonPrimario titulo="Editar información" onPress={() => setEditando(true)} />
          <View style={styles.espacio} />
          <BotonPrimario titulo="Cerrar sesión" variante="peligro" onPress={cerrarSesion} />
        </View>
      )}
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    paddingTop: 40,
  },
  avatarContenedor: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#9B6FD1',
  },
  avatarVacio: {
    backgroundColor: '#F5F0FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInicial: {
    fontSize: 36,
    fontWeight: '800',
    color: '#6C3FA6',
  },
  correo: {
    marginTop: 10,
    fontSize: 14,
    color: '#7C6A93',
  },
  formulario: {
    width: '100%',
  },
  espacio: {
    height: 12,
  },
});