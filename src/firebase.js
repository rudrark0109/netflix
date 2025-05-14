import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "firebase_api_key",
  authDomain: "app_name.firebaseapp.com",
  projectId: "app_name",
  storageBucket: "app_name.firebasestorage.app",
  messagingSenderId: "sender_id",
  appId: "app_ID",
  measurementId: "m_ID"
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
