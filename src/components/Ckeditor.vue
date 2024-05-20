<template>
    <div>
      <div class="editor" id="editor"></div>
    </div>
  </template>
  
  <script setup>
  import {ref, onMounted} from 'vue'
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  
  import { createFirebaseUploadAdapter } from '../plugins/FirebaseUploadAdapter';
  
  const editorData = ref('');
  const editor = ref(null);
  
  onMounted(() => {
    editor.value = ClassicEditor
    .create( document.querySelector( '#editor' ))
    .then( editor => {
        console.log( 'Editor was initialized', editor );
  }
  )}
)

  </script>