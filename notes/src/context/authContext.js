import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        updateProfile, 
        signOut, 
        onAuthStateChanged,
        GoogleAuthProvider,
        signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {auth} from '../firebase';
//import {db} from '../firebase';
//import{getDocs,collection} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
export const authContext =  createContext();
export const useAuth = () => {
    const context =  useContext(authContext) ;
    if(!context) throw new Error('There is not auth  provider')
    return context;
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signup = async (email, password,displayName) =>
      await  createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>{
            const user = userCredential.user;
              updateProfile(user, {displayName});
              console.log(userCredential)
           
            });

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut (auth)
    const loginWhitGoogle = () =>{
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup (auth,googleProvider)


    }
    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);
    return (
        <authContext.Provider value={{ signup, login, user, logout,loading, loginWhitGoogle}} >
            {children}</authContext.Provider>
    );
}






