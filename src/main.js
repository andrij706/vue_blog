import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './firebase/firebaseInit.js'
import CKEditor from '@ckeditor/ckeditor5-vue'

let app

onAuthStateChanged(auth, () =>{
    if(!app){
        app = createApp(App)

        app.use(router).use(store).use(CKEditor)

        app.mount('#app')
    }
})
