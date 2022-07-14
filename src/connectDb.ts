const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../firestore.json");
let db: any;
function connect() {
    initializeApp({
      credential: cert(serviceAccount),
    });
    db = getFirestore();
};

export {connect, db};
