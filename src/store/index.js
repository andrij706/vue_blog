import { createStore } from "vuex"
import {auth, db} from '../firebase/firebaseInit.js'
import {getDoc, doc, updateDoc} from 'firebase/firestore'


const store = createStore({
    state: {
        sampleBlogCards : [
            {blogTitle: 'Blog Card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2023'},
            {blogTitle: 'Blog Card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2023'},
            {blogTitle: 'Blog Card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2023'},
            {blogTitle: 'Blog Card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2023'}
        ],
        blogHTML: 'Write your blog title here...',
        blogTitle: '',
        blogPhotoname: '',
        blogPhotoFileURL: '',
        blogPhotoPreview: null,
        editPost: null,
        user: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUserName: null,
        profileId: null,
        profileInitials: null
    },
    mutations: {
        fileNameChange(state, payload){
            state.blogPhotoname = payload
        },
        createFileURL(state, payload){
            state.blogPhotoFileURL = payload
        },
        openPhotoPreview(state){
            state.blogPhotoPreview = !state.blogPhotoPreview
        },
        newBlogPost(state, payload){
            state.blogHTML = payload
        },
        updateBlogTitle(state, payload){
            state.blogTitle = payload
        },
        toggleEditPost(state, payload){
            state.editPost = payload
        },
        updateUser(state, payload){
            state.user = payload
        },
        setProfileInfo(state, dbRes){
            state.profileId = dbRes.id,
            state.profileEmail = dbRes.data().email,
            state.profileFirstName = dbRes.data().firstName
            state.profileLastName = dbRes.data().lastName
            state.profileUserName = dbRes.data().username
        },
        setProfileInitials(state){
            state.profileInitials = 
                state.profileFirstName.match(/(\b\S)?/g).join('')
                state.profileLastName.match(/(\b\S)?/g).join('')
        },
        changeFirstName(state, payload){
            state.profileFirstName = payload
        },
        changeLastName(state, payload){
            state.profileLastName = payload
        },
        changeUsername(state, payload){
            state.profileUserName = payload
        }
    },
    actions: {
        async getCurrentUser({commit}) {
            const dataBase = await doc(db, 'users', auth.currentUser.uid)
            const dbResult = await getDoc(dataBase)

            commit('setProfileInfo', dbResult)
            commit('setProfileInitials')
        },
        async updateUserSettings({commit, state}){
            const dataBase = await doc(db, 'users', state.profileId)
            await updateDoc(dataBase, {
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                username: state.profileUserName
            })
            commit('setProfileInitials')
        }
    }
})

export default store