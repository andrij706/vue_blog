<script setup>
import {computed} from 'vue'
import store from '../store';

const {blogTitie, blogHTML, blogPhotoname }= computed(() => {
    {store.state.blogTitle, store.state.blogHTML, store.state.blogPhotoname}
})


</script>

<template>
    <div class="post-preview">
        <h2>{{ blogTitie }}</h2>
    </div>
</template>

