import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCpr4U8A7js9Zi8Yx7bQ3d4cUNxFSZQ9O4",
  authDomain: "netflix-be94a.firebaseapp.com",
  projectId: "netflix-be94a",
  storageBucket: "netflix-be94a.firebasestorage.app",
  messagingSenderId: "264169572488",
  appId: "1:264169572488:web:e5f908d85771cccaa2373d",
  measurementId: "G-4NZCSNZGFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" ")); 
} 
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" ")); 
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, signup, login, logout}