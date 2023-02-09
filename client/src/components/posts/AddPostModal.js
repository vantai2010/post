import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {useContext, useState} from 'react'
import {PostContext} from '../../contexts/PostContext'
const AddPostModal = () => {
    const {showAddPostModal, setShowAddPostModal, addPost, setShowToast} = useContext(PostContext)

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const {title, description, url} = newPost

    const onChangeNewPostForm = event => {
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }
    const closeDialog = () => {
        setNewPost({title: '', description: '', url: '', status: 'TO LEARN'})
        setShowAddPostModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addPost(newPost)
        setNewPost({title: '', description: '', url: '', status: 'TO LEARN'})
        setShowAddPostModal(false)
        setShowToast({show: true, message, type: success ? 'success': 'danger'})
    }
    return (
        <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learnt ?</Modal.Title>
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
                            onChange={onChangeNewPostForm} 
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
                            onChange={onChangeNewPostForm} 
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control 
                            type='text' 
                            placeholder='url link' 
                            name='url' 
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
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

export default AddPostModal
