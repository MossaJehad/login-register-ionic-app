import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { signOut, updateProfile, onAuthStateChanged, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
    'Your firebase config here'
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export async function loginUser(email: string, password: string): Promise<boolean> {
    try {
        const res: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        return true; 
    } catch (err) {
        console.error(err);
        return false; 
    }
}

export async function registerUser(username:string, email:string, password:string) {
    try {
        const res: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user,{displayName : username});
        return true; 
    } catch (err) {
        console.error(err);
        return false; 
    }
}

export function getCurrentUser() {
   return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, function(user) {
        if (user) {
            
            resolve(user)
        } else {
            resolve (null)
        }
        unsubscribe()
    }
    )
})}


export async function signOutUser() {
    try {
        await signOut(auth);
        window.location.href = '/';
    } catch (error) {
        console.error(error);
    }
}

export default signOutUser;