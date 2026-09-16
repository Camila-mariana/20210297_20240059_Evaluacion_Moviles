import { useEffect, useState } from 'react';
import { doc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { database } from '../config/firebase';

const coleccion = 'usuarios';

export const crearPerfil = async (uid, datos) => {
  await setDoc(doc(database, coleccion, uid), {
    nombreCompleto: datos.nombreCompleto,
    fechaNacimiento: datos.fechaNacimiento,
    carnet: datos.carnet,
    urlImagen: datos.urlImagen,
    creado: new Date().toISOString(),
  });
};

export const actualizarPerfil = async (uid, datos) => {
  await updateDoc(doc(database, coleccion, uid), datos);
};

export const useObtenerPerfil = (uid) => {
  const [perfil, setPerfil] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  useEffect(() => {
    if (!uid) {
      setPerfil(null);
      setCargandoPerfil(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(database, coleccion, uid), (snap) => {
      setPerfil(snap.exists() ? snap.data() : null);
      setCargandoPerfil(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { perfil, cargandoPerfil };
};
