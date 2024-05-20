<script setup>
import {ref as fbRef, getStorage, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {ref, computed} from 'vue'
import store from '../store';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import BlogCoverPreview from '../components/BlogCoverPreview.vue'; 
//5:10

const ckeditor = CKEditor.component
const editor = ClassicEditor

const storage = getStorage()

const error = ref(null)
const errorMsg = ref(null)
const file = ref(null)
const blogPhoto = ref(null)

const fileChange = () => {
    file.value = blogPhoto.value.files[0]
    const fileName = file.value.name
    store.commit('fileNameChange', fileName)
    store.commit('createFileURL', URL.createObjectURL(file.value))
}

const openPreview = () => {
    store.commit('openPhotoPreview')
}



const imageHandler = (file, editor, cursorLocation, resetUploader) => {
    const storageRef = ref(storage)
    const docRef = fbRef(storage, `documents/blogPostPhotos/${file.value.name}`)
    uploadBytesResumable(docRef, file).on('state_changed', (snapshot) => {
        console.log(snapshot)
    }, (err) => {
        console.log(err)
    }, async () => {
        const downloadURL = await getDownloadURL(docRef)
        editor.model.change(writer => {
            const imageElement = writer.createElement('image', {
                src: downloadURL,
                alt: 'Image'
            })
            editor.model.insertContent(imageElement, cursorLocation)
            resetUploader()
        })
        editor.insertEmded(cursorLocation, 'image', downloadURL)
    })
}

const profileID = computed(() => {
    return store.state.profileId
})

const blogCoverPhotoName = computed(() => {
    return store.state.blogPhotoname
})

const blogTitle = computed({
    get(){
        return store.state.blogTitle
    },
    set(payload){
        store.commit('updateBlogTitle', payload)
    }
})

const blogHTML = computed({
    get(){
        return store.state.blogHTML
    },
    set(payload){
        store.commit('newBlogPost', payload)
    }

})

</script>

<template>
    <div class="create-post">
        <BlogCoverPreview v-show="store.state.blogPhotoPreview"/>
        <div class="container">
            <div :class="{invisible: !error}" class="err-message">
                <p><span>Error:</span>{{ errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle"/>
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" @change="fileChange" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg"/>
                    <button @click="openPreview" class="preview" :class="{'button-inactive': !store.state.blogPhotoFileURL}">Preview Photo</button>
                    <span>File Chosen: {{ store.state.blogPhotoname }}</span>
                </div>
            </div>
            <div class="editor-container">
                <ckeditor class="editor" :editor="editor"  v-model="blogHTML"></ckeditor>
            </div>
            <div class="blog-actions">
                <button>Publish Blog</button>
                <router-link class="router-button" :to="{name: 'PostPreview'}">Post Preview</router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.create-post {
    position: relative;
    height: 100%;

    button {
        margin-top: 0;
    }

    .router-button {
        text-decoration: none;
        color: #fff;
    }

    label,
    button,
    .router-button {
        transition: 500ms ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;

        &:hover {
            background-color: rgba(48, 48, 48, 0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;
    }

    // error styling
    .invisible{
        opacity: 0 !important;
    }

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #303030;
        opacity: 1;
        transition: 0.5s ease all;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1) {
            min-width: 300px;
        }

        input{
            transition: 0.5s ease-in-out all;
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid #303030;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }

        .upload-file {
            flex: 1;
            margin-left: 16px;
            position: relative;
            display: flex;

            input {
                display: none;
            }

            .preview {
                margin-left: 16px;
                text-transform: initial;
            }

            span {
                font-size: 12px;
                margin-left: 16px;
                align-self: center;
            }
        }
    }

    .editor-container {
        height: 60vh;
        display: flex;
        flex-direction: column;

        .ck-editor{
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ck-editor__main{
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }

        .ck-content {
            height: 100%;
            padding: 20px 16px 30px;
        }
    }

    .blog-actions {
        margin-top: 32px;

        button{
            margin-right: 16px;
        }
    }
}
</style>