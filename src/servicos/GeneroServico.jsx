import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from '../firebaseConfig';

const generoCollectionRef = collection(db, "generos");

export const getGenerosAPI = async () => {
    const snapshot = await getDocs(generoCollectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getGeneroPorIdAPI = async (id) => {
    const generoDoc = doc(db, "generos", id);
    const snapshot = await getDoc(generoDoc);
    return { id: snapshot.id, ...snapshot.data() };
};

const getLastGeneroId = async () => {
    const q = query(generoCollectionRef, orderBy("id", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data().id;
    } else {
        return 0;
    }
};

export const cadastrarGeneroAPI = async (metodo, genero) => {
    if (metodo === "POST") {
        const lastId = await getLastGeneroId();
        const newId = lastId + 1;
        const generoDocRef = doc(db, "generos", String(newId)); // Usando o ID como nome do documento
        await setDoc(generoDocRef, { ...genero, id: newId });
        return { status: "success", message: "Gênero cadastrado com sucesso!", objeto: { id: newId, ...genero } };
    } else {
        const generoDoc = doc(db, "generos", String(genero.id));
        await updateDoc(generoDoc, genero);
        return { status: "success", message: "Gênero atualizado com sucesso!", objeto: genero };
    }
};

export const deleteGeneroPorIdAPI = async (id) => {
    const generoDoc = doc(db, "generos", String(id));
    await deleteDoc(generoDoc);
    return { status: "success", message: "Gênero deletado com sucesso!" };
};
