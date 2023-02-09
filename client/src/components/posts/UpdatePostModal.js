import React, {useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {useContext, useState} from 'react'
import {PostContext} from '../../contexts/PostContext'
const UpdatePostModal = () => {
    const {postState: {post} ,showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast} = useContext(PostContext)

    const [updatedPost, setUpdatedPost] = useState(post)
    useEffect(()=> setUpdatedPost(post), [post])
    const {title, description, url, status} = updatedPost

    const onChangeUpdatedPostForm = event => {
        setUpdatedPost({...updatedPost, [event.target.name]: event.target.value})
    }
    const closeDialog = () => {
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updatePost(updatedPost)
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
        setShowToast({show: true, message, type: success ? 'success': 'danger'})
    }
    return (
        <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress ?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group >
                        <Form.Control 
                            type='text' 
                            placeholder='Title' 
                            name='title' 
                            aria-descripbedby='title-help'
                            value={title}
                            onChange={onChangeUpdatedPostForm} 
                        />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Control 
                            as='textarea' 
                            row={3}  
                            placeholder='Description' 
                            name='description' 
                            value={description}
                            onChange={onChangeUpdatedPostForm} 
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control 
                            type='text' 
                            placeholder='url link' 
                            name='url' 
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name='status' onChange={onChangeUpdatedPostForm}>
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>learnIt</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal
