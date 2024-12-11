import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCezId7X-RHMUJNGua1zhTaMR0kGdZvo7s",
    authDomain: "fyndus-eebec.firebaseapp.com",
    projectId: "fyndus-eebec",
    storageBucket: "fyndus-eebec.firebasestorage.app",
    messagingSenderId: "32190410611",
    appId: "1:32190410611:web:142964090ba97b26c3df06",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
