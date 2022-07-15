import { json } from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { route } from "./route";
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../firestore.json");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(json());

// connect to Firebase
initializeApp({
  credential: cert(serviceAccount),
});
export const db = getFirestore();

route(app);

app.listen(port, () => {
  console.log("Start server at port " + port);
});
