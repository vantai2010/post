import React, {useContext, useEffect} from 'react'
import { PostContext } from '../contexts/PostContext'
import Spinner from 'react-bootstrap/Spinner'
import {AuthContext} from '../contexts/AuthContext'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
const Dashboard = () => {
    const {authState: {user: {username}}} = useContext(AuthContext)
    const {
        postState: {post, posts, postsLoading}, 
        getPosts,
        setShowAddPostModal,
        showToast: {show, message, type},
        setShowToast,
    } = useContext(PostContext)

    useEffect(() =>getPosts(), [])
    
    let body = null
    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation='border' varinat='info' />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        hi {username}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>welcome to leanrIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>Add</Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className="row-col-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map(post => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>
                    )
                    )}
                </Row>
                <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>hien</Button>
            </>
        )
    }
    return (
         <>
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostModal />}
            {/* sau khi add post moi vao*/}
            <Toast 
                show={show} 
                style={{position: 'fixed', top: '20%', right: '10px', width: '80px', height: '80px'}} 
                className={`bg-${type} text-white`} 
                onClose={setShowToast.bind(this, {show: false, message: '', type: null})}
                delay={3000}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    )
       
}

export default Dashboard
