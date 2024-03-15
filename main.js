const result = document.getElementById('result')
var email;
var password;

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBVgNV4u6JgOFWcNsT5Zx9Cna_il49Ykdk",
    authDomain: "cloudonly-80ade.firebaseapp.com",
    databaseURL: "https://cloudonly-80ade-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cloudonly-80ade",
    storageBucket: "cloudonly-80ade.appspot.com",
    messagingSenderId: "713827963294",
    appId: "1:713827963294:web:ba2419f1d0e9200224068f"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


function getValues(){
    email = document.getElementById('email').value
    password = document.getElementById('password').value    
}

const register = () => {
    getValues();

    auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user)
        result.innerHTML = "successful registration"
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
        result.innerHTML = "failed registration"
    })
}

const login = () => {
    getValues();

    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user)
        result.innerHTML = "successful login"
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
        result.innerHTML = "failed registration"
    })
}

const saveData = () => {
    getValues();

    db.collection('users')//.doc('YC7WFOPSqWNCVDx99wML')
    .add({
        email: email,
        password: password
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        result.innerHTML = "successful save"
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        result.innerHTML = "failed save"
    });
}

const readData = () => {
    getValues();

    db.collection('users')
    .get()
    .then((data) => {
        console.log(data.docs.map((item) => {
            return {...item.data(), id: item.id}
        }))
        result.innerHTML = "successful read"
    })
    .catch((err) =>{
        console.log(err)
        result.innerHTML = "failed read"
    })
}

const updateData = () => {
    getValues();

    db.collection('users').doc('YC7WFOPSqWNCVDx99wML')
    .update({
        email: '123456@gmail.com',
        password: '123456'
    })
    .then(() => {
        alert('Data Updated')
        result.innerHTML = "successful update"
    })
    .catch((err) =>{
        console.log(err)
        result.innerHTML = "failed update"
    })
}

const deleteData = () => {
    getValues();

    db.collection('users').doc('YC7WFOPSqWNCVDx99wML').delete()
    .then(() => {
        alert('Data Deleted')
        result.innerHTML = "successful delete"
    })
    .catch((err) =>{
        console.log(err)
        result.innerHTML = "failed delete"
    })
}








const loginWithGmail = () => {

    /*
    Google auth
    */
    result.innerHTML = "Logging in with Google Auth..."
    console.log("Logging in with Google Auth...");

    // move into button...
    const auth2 = firebase.auth; //firebase/auth
    const auth3 = firebase.auth();
    //getAuth(firebaseApp);

    firebase.auth().onAuthStateChanged(auth3, user => {
        console.log("Logged in as ", user);
        //result.innerHTML = "Logged in as ", user
        result.innerHTML = "Logged in as ..."
    });

    var provider = new firebase.auth.GoogleAuthProvider();
    //auth2.signInWithPopup(auth2, new auth2.GoogleAuthProvider())

    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // IdP data available in result.additionalUserInfo.profile.
        console.log("google auth success");
        result.innerHTML = "google auth success";

    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        
        console.log(err);
        result.innerHTML = "google auth fail";
    });




    // Reference to documnet in firestore
    const db2 = firebaseApp.firestore();
    //getFirestore(firebaseApp);

    const boatRef = firebase.auth.doc(db2, "boats/myboat");
    //doc(db2, "boats/myboat");


    firebase.auth().setDoc(boatRef, {
        owner: auth2.currentUser.uid,
        name: "Starfire",
        length: 32,
        color: "red",
    });

    // realtime listener

    firebase.auth().onSnapshot(boatRef, snapshot =>{
        const boat = snapshot.data();
    })
}



/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVgNV4u6JgOFWcNsT5Zx9Cna_il49Ykdk",
    authDomain: "cloudonly-80ade.firebaseapp.com",
    databaseURL: "https://cloudonly-80ade-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cloudonly-80ade",
    storageBucket: "cloudonly-80ade.appspot.com",
    messagingSenderId: "713827963294",
    appId: "1:713827963294:web:ba2419f1d0e9200224068f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //firebase.initializeApp

//import firebase from "firebase/compat/app";
        // Required for side-effects
        //import "firebase/firestore";
        //import firebase from "firebase/app";
        //import { initializeApp } from "firebase/app";
        
const auth = getAuth(app);
onAuthStateChanged(auth, user => {
    console.log("Logged in as ", user);
});

signInWithPopup(auth, new GoogleAuthProvider())

// Reference to documnet in firestore
const db = getFirestore(app);
const boatRef = doc(db, "boats/myboat");

setDoc(boatRef, {
    owner: auth.currentUser.uid,
    name: "Starfire",
    length: 32,
    color: "red",
});

// realtime listener
onSnapshot(boatRef, snapshot =>{
    const boat = snapshot.data();
})
*/

        // Rules
        // Allow read/write access on all documents to any user signed in to the application
        /*
        //firestore.rules
        match /accounts/{userId} {
            allow read;
            allow write: if request.auth.uid == userId;
        }


        service cloud.firestore {
            match /databases/{database}/documents {
                match /{document=**} {
                    allow read, write: if request.auth != null;
                }
            }
        }
        */

        /*
        // Initialize Cloud Firestore and get a reference to the service
        const db = firebase.firestore();

        db.collection("users").add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        // Add a second document with a generated ID.
        db.collection("users").add({
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
        */

        // Allow read/write access on all documents to any user signed in to the application
        /*
        service cloud.firestore {
            match /databases/{database}/documents {
                match /{document=**} {
                    allow read, write: if request.auth != null;
                }
            }
        }
        */