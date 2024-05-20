<script setup>
import { ref } from 'vue';
import {auth, db} from '../firebase/firebaseInit.js'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {collection, setDoc, doc} from 'firebase/firestore'
import {useRouter} from 'vue-router'
import emailImg from '../assets/Icons/envelope-regular.svg'
import passwordImg from '../assets/Icons/lock-alt-solid.svg'
import userImg from '../assets/Icons/user-alt-light.svg'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)
const errorMsg = ref('')

const register = async () => {
    try{
    if (
        email.value !== '' ||
        password.value !== '' ||
        firstName.value !== '' ||
        lastName.value !== '' ||
        username.value !== ''
    ){
        error.value = false
        errorMsg.value = ''
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const userId = userCredential.user.uid
        const userCollection = collection(db, 'users')
        await setDoc (doc(userCollection, userId), {
            userId,
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            email: email.value
        })
        router.push({name: 'Home'})
        return
    }
    error.value = true
    errorMsg.value = 'Please fill out all the fields!'
    }catch(err){
        console.log(err)
    }
}
</script>

<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
            </p>
            <h2>Create Your FireBlog Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName">
                    <userImg class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName">
                    <userImg class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="username">
                    <userImg class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="email" v-model="email">
                    <emailImg class="icon"/>
                </div>
                <div class="input">
                    <input type="password" placeholder="password" v-model="password">
                    <passwordImg class="icon"/>
                </div>
                <div class="error" v-show="error">{{ errorMsg }}</div>
            </div>
            <button @click.prevent="register">Sign Up</button>
            <div class="angle">

            </div>
        </form>
        <div class="background">

        </div>
    </div>
</template>

<style lang="scss" scoped>
.register {
    h2{
        max-width: 350px
    }
}
</style>