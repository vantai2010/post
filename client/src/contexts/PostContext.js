import {createContext, useReducer, useState} from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl, POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from './constants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })
    
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if(response.data.success) {
                dispatch({type: POSTS_LOADED_SUCCESS, payload: response.data.posts})
            }
           
        } catch (error) {
            dispatch({type: POSTS_LOADED_FAIL})
        }
    }

    const addPost = async newPost =>{
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if(response.data.success){
                dispatch({type: ADD_POST, payload: response.data.post})
                return response.data
            }
            
        } catch (error) {
            return error.response.data ? error.response.data: {success: false, message: error.message}
        }
    }

    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if(response.data.success) {
                dispatch({type: DELETE_POST, payload: postId})
            }
        } catch (error) {
            console.log(error)
        }
    }
    //tim post duoc click de put 
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({type: FIND_POST, payload: post})
    }

    const updatePost = async updatePost =>{
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)
            if(response.data.success) {
                dispatch({type: UPDATE_POST, payload: response.data.post})
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data: {success: false, message: error.message}
        }
    }

    const postContextData = {
        postState, 
        getPosts, 
        showAddPostModal, 
        setShowAddPostModal, 
        addPost,
        setShowToast,
        showToast,
        deletePost,
        updatePost,
        findPost,
        showUpdatePostModal,
        setShowUpdatePostModal,
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider