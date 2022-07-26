import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
  } from 'firebase/auth';
  import {auth} from '../firebase';

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('No hay usuario');
  return context
}

export const signUp =(email, password,displayName) =>
createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>{
      const user = userCredential.user;
        updateProfile(user, {displayName});
     
      })

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider()
  return signInWithPopup(auth, googleProvider)
  }

export function AuthProvider({ children }) {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


  const logOut = () => signOut(auth);

    useEffect (() => {
      onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false)
      })
    },[])

  return (
  <authContext.Provider value={{ user, logOut, loading}}>{children}</authContext.Provider>
  );
}
export default AuthProvider;




