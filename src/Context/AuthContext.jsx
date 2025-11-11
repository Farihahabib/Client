import { createUserWithEmailAndPassword, GoogleAuthProvider,  onAuthStateChanged,  sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config.js';
import { AuthContext } from './AuthProvider';

const AuthProvder = ({children}) => {
    const[user,setUser] = useState(null);
    const [loading , setLoading] = useState(true);
const googleProvider = new GoogleAuthProvider();
    const createuserWithEmailAndPasswordFunc = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth , email, password);
    }
    const updateprofileFunc = (displayName, photoURL)=>{
  
        return updateProfile (auth.currentUser, {
            displayName,
            photoURL,
        });
    }
    const signInWithEmailAndPasswordFunc = (email,password)=>{
        setLoading(true);
     return  signInWithEmailAndPassword(auth, email, password)
    }
    const signinwithgooglefunc =()=>{
       setLoading(true);
        return signInWithPopup (auth, googleProvider);
    }
    const logout = ()=>{ 
        setLoading(true);
        return signOut (auth);
    }
    const sendPasswordResetEmailFunc = (email)=>{
        setLoading(true);
        return sendPasswordResetEmail (auth, email);
    }
const authInfo={
    user,
    setUser,
    logout,
   loading,
    setLoading,
    updateprofileFunc,
    signinwithgooglefunc,
    createuserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    sendPasswordResetEmailFunc
};
useEffect(()=>{
 const unsubscribe =   onAuthStateChanged(auth,(currentuser) =>{
    console.log(currentuser)
    setUser(currentuser);
    setLoading(false);
});
return()=>{
    unsubscribe();
}
},[])




    return <AuthContext value={authInfo}>{children}</AuthContext>
       

};

export default AuthProvder;