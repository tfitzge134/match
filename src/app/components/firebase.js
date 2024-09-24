import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH-68OKDXLEkoY9-sW_QU_Eed5zYs8JKA",
  authDomain: "tier-dating.firebaseapp.com",
  databaseURL: "https://tier-dating-default-rtdb.firebaseio.com",
  projectId: "tier-dating",
  storageBucket: "tier-dating.appspot.com",
  messagingSenderId: "641741913591",
  appId: "1:641741913591:web:3b450ee620e9005fa4c2f2",
  measurementId: "G-EY1MT9MY7P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to verify connection to Firestore
const verifyConnection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'phoneNumbers')); // Replace 'phoneNumbers' with your collection name
    if (querySnapshot.empty) {
      console.log("No documents found in the collection.");
    } else {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    }
  } catch (error) {
    console.error("Error connecting to Firestore: ", error);
  }
};

// Export the Firestore database instance and the verifyConnection function
export { db, verifyConnection };