import { useEffect, useState, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const useAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargandoSesion(false);
    });

    return () => unsubscribe();
  }, []);

  const iniciarSesion = useCallback(async (correo, contrasena) => {
    const credenciales = await signInWithEmailAndPassword(
      auth,
      correo,
      contrasena,
    );
    return credenciales.user;
  }, []);

  const registrarse = useCallback(async (correo, contrasena) => {
    const credenciales = await createUserWithEmailAndPassword(
      auth,
      correo,
      contrasena,
    );
    return credenciales.user;
  }, []);

  const cerrarSesion = useCallback(async () => {
    await signOut(auth);
  }, []);

  return { usuario, cargandoSesion, iniciarSesion, registrarse, cerrarSesion };
};

export default useAuth;

export const traducirErrorAuth = (codigo) => {
  switch (codigo) {
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido.';
    case 'auth/user-not-found':
      return 'No existe una cuenta con ese correo.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'El correo o la contraseña son incorrectos.';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta registrada con ese correo.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Intenta de nuevo más tarde.';
    case 'auth/operation-not-allowed':
      return 'El inicio de sesión con correo y contraseña no está habilitado en Firebase. Actívalo en Firebase Console → Authentication → Sign-in method.';
    case 'auth/network-request-failed':
      return 'No hay conexión con Firebase. Revisa tu conexión a internet.';
    default:
      return `Ocurrió un error inesperado (${codigo ?? 'sin código'}). Intenta nuevamente.`;
  }
};
