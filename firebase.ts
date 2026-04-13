import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAoKVNWa5_0Cbwe1ArKdrDQcPEQhzuErGI",

  authDomain: "biru-a1678.firebaseapp.com",

  projectId: "biru-a1678",

  storageBucket: "biru-a1678.firebasestorage.app",

  messagingSenderId: "708925927169",

  appId: "1:708925927169:web:6d33aec553eaa8ba2af500"

};


const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// 🔥 AQUI ESTÁ A CORREÇÃO REAL
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);