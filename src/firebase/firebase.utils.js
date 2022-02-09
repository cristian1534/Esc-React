import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyDchf4cqxkj0iSDVpTmLd4tfUtjxmF-pEg",
    authDomain: "react-enero-fb-c8e9e.firebaseapp.com",
    projectId: "react-enero-fb-c8e9e",
    storageBucket: "react-enero-fb-c8e9e.appspot.com",
    messagingSenderId: "518297010991",
    appId: "1:518297010991:web:3213a567434dea94e797da"
  };

firebase.initializeApp(config);

//create profile document
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`); //reference doc to specified path

    const snapShot = await userRef.get(); //object

    if(!snapShot.exits) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                ...additionalData
            })
        }catch (err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;

}


export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

