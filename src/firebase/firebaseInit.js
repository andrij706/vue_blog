import { initializeApp } from "firebase/app"
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAbtANiqiiY2YKAESmdUBfKDbYQVgO2EY4",
    authDomain: "vue-blog-578bd.firebaseapp.com",
    projectId: "vue-blog-578bd",
    storageBucket: "vue-blog-578bd.appspot.com",
    messagingSenderId: "685671219472",
    appId: "1:685671219472:web:e83d3cb9e4ac02dab26595"
  };

  const app = initializeApp(firebaseConfig)

  const auth = getAuth(app)
  const db = getFirestore(app)

  export {auth, db}