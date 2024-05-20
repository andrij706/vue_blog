<script setup>
import {ref} from 'vue'
import emailImg from '../assets/Icons/envelope-regular.svg'
import Modal from '../components/Modal.vue';
import Loading from '../components/Loading.vue'
import {auth} from '../firebase/firebaseInit.js'
import {sendPasswordResetEmail} from 'firebase/auth'

const email = ref('')
const modalActive = ref(null)
const modalMessage = ref('')
const loadingActive = ref(null)

const closeModal = () =>{
    modalActive.value = !modalActive.value
    email.value = ''
}

const resetPassword = () => {
    loadingActive.value = true
    sendPasswordResetEmail(auth, email.value)
    .then(() => {
        modalMessage.value = 'If your account exists, you will receive a email'
        loadingActive.value = false
        modalActive.value = true
    })
    .catch((err) => {
        modalMessage.value = err.message
        loadingActive.value = false
        modalActive.value = true
    })
}
</script>

<template>
<div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
    <Loading v-if="loadingActive"/>
    <div class="form-wrap">
        <form class="reset">
            <p class="login-register">
                Back to
                <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
            </p>
            <h2>Reset Password</h2>
            <p>Forgot your password? Enter your email to reset it</p>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email"/>
                    <emailImg class="icon"/>
                </div>
            </div>
            <button @click.prevent="resetPassword">Reset</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.reset-password{
    position: relative;
    .form-wrap{
        .reset{
            h2{
                margin-bottom: 8px;
            }
            p{
                margin-bottom: 32px;
                text-align: center;
            }
        }
    }
}
</style>