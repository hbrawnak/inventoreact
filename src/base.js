import Rebase from "re-base";
import fb from "firebase";

const firebaseApp = fb.initializeApp({
    apiKey: "AIzaSyACncCNqA5sW2ccTQMERLYVPBiKhW3y6no",
    authDomain: "catch-of-the-day-15caf.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-15caf-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export {firebaseApp};

// this is a default export
export default base;