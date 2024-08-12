import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from '../firebaseConfig';

const filmeCollectionRef = collection(db, "filmes");
const generoCollectionRef = collection(db, "generos");

export const getFilmesAPI = async () => {
    const snapshot = await getDocs(filmeCollectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getFilmePorIdAPI = async (id) => {
    const filmeDoc = doc(db, "filmes", id);
    const snapshot = await getDoc(filmeDoc);
    return { id: snapshot.id, ...snapshot.data() };
};

const getLastFilmeId = async () => {
    const q = query(filmeCollectionRef, orderBy("id", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data().id;
    } else {
        return 0;
    }
};

export const cadastrarFilmeAPI = async (metodo, filme) => {
    // Criando a referência ao documento do gênero
    const generoDocRef = doc(db, "generos", String(filme.genero_id));

    // Verificando se o gênero existe
    const generoSnapshot = await getDoc(generoDocRef);

    if (!generoSnapshot.exists()) {
        return { status: "error", message: "Gênero não encontrado. Verifique o código do gênero.", objeto: null };
    }

    const generoData = generoSnapshot.data();

    if (metodo === "POST") {
        const lastId = await getLastFilmeId();
        const newId = lastId + 1;
        const filmeDocRef = doc(db, "filmes", String(newId)); // Usando o ID como nome do documento
        await setDoc(filmeDocRef, { 
            ...filme, 
            id: newId, 
            genero_id: generoDocRef,  // Referência ao documento do gênero
            genero_nome: generoData.nome 
        });
        return { status: "success", message: "Filme cadastrado com sucesso!", objeto: { id: newId, ...filme, genero_id: generoDocRef, genero_nome: generoData.nome } };
    } else {
        const filmeDoc = doc(db, "filmes", String(filme.id));
        await updateDoc(filmeDoc, { 
            ...filme, 
            genero_id: generoDocRef,  // Referência ao documento do gênero
            genero_nome: generoData.nome 
        });
        return { status: "success", message: "Filme atualizado com sucesso!", objeto: { ...filme, genero_id: generoDocRef, genero_nome: generoData.nome } };
    }
};

export const deleteFilmePorIdAPI = async (id) => {
    const filmeDoc = doc(db, "filmes", String(id));
    await deleteDoc(filmeDoc);
    return { status: "success", message: "Filme deletado com sucesso!" };
};
