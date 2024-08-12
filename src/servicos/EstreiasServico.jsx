import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const getEstreiasAPI = async () => {
    const estreiasCollection = collection(db, 'estreias');
    const snapshot = await getDocs(estreiasCollection);
    return snapshot.docs.map(doc => doc.data());
};
