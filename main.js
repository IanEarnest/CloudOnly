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

const register = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const result = document.getElementById('result').innerHTML

    auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user)
        result = "successful registration"
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
        result = "failed registration"
    })
}

const login = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const result = document.getElementById('result').innerHTML

    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user)
        result = "successful login"
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
        result = "failed registration"
    })
}

const saveData = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const result = document.getElementById('result').innerHTML

    db.collection('users')
    .add({
        email: email,
        password: password
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        result = "successful save"
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        result = "failed save"
    });
}

const readData = () => {
    const result = document.getElementById('result').innerHTML

    db.collection('users')
    .get()
    .then((data) => {
        console.log(data.docs.map((item) => {
            return {...item.data(), id: item.id}
        }))
        result = "successful read"
    })
    .catch((err) =>{
        console.log(err)
        result = "failed read"
    })
}

const updateData = () => {
    const result = document.getElementById('result').innerHTML
    
    db.collection('users').doc('j52W06qCaHWOmu4tiKYxJmphUUQ2')
    .update({
        email: 'ashishisagoodboy1234@gmail.com',
        password: '123456'
    })
    .then(() => {
        alert('Data Updated')
        result = "successful update"
    })
    .catch((err) =>{
        console.log(err)
        result = "failed update"
    })
}

const deleteData = () => {
    const result = document.getElementById('result').innerHTML

    db.collection('users').doc('j52W06qCaHWOmu4tiKYxJmphUUQ2').delete()
    .then(() => {
        alert('Data Deleted')
        result = "successful delete"
    })
    .catch((err) =>{
        console.log(err)
        result = "failed delete"
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