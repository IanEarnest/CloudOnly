//import firebase from "firebase/compat/app";
        // Required for side-effects
        
        //import "firebase/firestore";
        import firebase from "firebase/app";
        //import { initializeApp } from "firebase/app";
        
        // TODO: Replace the following with your app's Firebase project configuration
        // See: https://support.google.com/firebase/answer/7015592
        const firebaseConfig = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: ""
        };

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);

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