// import { createContext } from "react";

// export const AuthContext = createContext();
import { createUserWithEmailAndPassword, GoogleAuthProvider,  onAuthStateChanged,  sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config.js';
import { AuthContext } from './AuthContext.jsx';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null);
    const [loading , setLoading] = useState(true);

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

export default AuthProvider;
// import { useState } from 'react'
// import { AuthContext } from './AuthContext'
// import {
// 	createUserWithEmailAndPassword,
// 	GithubAuthProvider,
// 	GoogleAuthProvider,
// 	onAuthStateChanged,
// 	signInWithEmailAndPassword,
// 	signInWithPopup,
// 	signOut,
// 	updateProfile,
// } from 'firebase/auth'
// import { auth } from '../Firebase/firebase.config.js';
// import { useEffect } from 'react'

// const googleProvider = new GoogleAuthProvider()
// const githubProvider = new GithubAuthProvider()

// const AuthProvider = ({ children }) => {
// 	const [user, setUser] = useState(null)
// 	const [loading, setLoading] = useState(false)

// 	// create user with email and password
// 	const userRegister = (email, password) => {
// 		setLoading(true)
// 		return createUserWithEmailAndPassword(auth, email, password)
// 	}

// 	const updateUserProfile = (profile) => {
// 		return updateProfile(auth.currentUser, profile)
// 	}

// 	const userLogin = (email, password) => {
// 		setLoading(true)
// 		return signInWithEmailAndPassword(auth, email, password)
// 	}

// 	// google pop up login
// 	const googleLogin = () => {
// 		setLoading(true)
// 		return signInWithPopup(auth, googleProvider)
// 	}

// 	const githubLogin = () => {
// 		setLoading(true)
// 		return signInWithPopup(auth, githubProvider)
// 	}

// 	// user logout
// 	const userLogout = () => {
// 		return signOut(auth)
// 	}

// 	useEffect(() => {
// 		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
// 			if (currentUser) {
// 				setUser(currentUser)
// 			} else {
// 				setUser(null)
// 			}
// 			setLoading(false)
// 		})

// 		return () => unSubscribe()
// 	}, [])

// 	const authInfo = {
// 		user,
// 		loading,
// 		userRegister,
// 		userLogin,
// 		googleLogin,
// 		githubLogin,
// 		updateUserProfile,
// 		userLogout,
// 	}

// 	return (
// 		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
// 	)
// }

// export default AuthProvider
