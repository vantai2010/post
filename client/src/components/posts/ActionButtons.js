import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button'
import { PostContext } from '../../contexts/PostContext'
const ActionButtons = ({url , _id}) => {
    const {deletePost, findPost, setShowUpdatePostModal} = useContext(PostContext)
    const choosePost = postId => {
        findPost(postId)
        setShowUpdatePostModal(true)
    }
    return (
       <>
        <Button className='post-button' href={url} target='_blank'>
            <p>play</p>
        </Button>
        <Button className='post-button' onClick={choosePost.bind(this, _id)}>
            <p>c xua</p>
        </Button>
        <Button className='post-button' onClick={deletePost.bind(this, _id)}>          
            <p>X</p>
        </Button>
       </>
    )
}

export default ActionButtons
