import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
} from 'firebase/firestore';

import {
  firebaseConfig,
} from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Armazenar conta do usuário//

export async function userData(nome, email, uid) {
  await addDoc(collection(db, 'users'), {
    displayName: nome,
    email,
    uid,
  });
}

// criar post//
export async function newPost(dataPostagem, id, post, username) {
  const docRef = await addDoc(collection(db, 'post'), {
    date: dataPostagem,
    idUser: id,
    textArea: post,
    userName: username,
  });
  console.log(docRef.id);
}

export async function postsNaTela() {
  const novoArray = [];
  const q = query(collection(db, 'post'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const dados = doc.data();
    dados.id = doc.id;
    novoArray.push(dados);
  });
  console.log(novoArray);
  return novoArray;
}
