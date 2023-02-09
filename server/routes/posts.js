const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Posts = require('../models/Posts');

const Post = require('../models/Posts')

// POST api/posts
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url , status } = req.body

    if(!title)
        return res.status(400).json({success: false, message: 'title is required'});
    
    try {
        const newPost = new Post({title, description, url: url.startsWith('https://') ? url : `https://${url}` , status: status || 'TO LEARN', user: req.userId})

        await newPost.save()
        res.json({success: true, message: 'jappy learn =ing', post: newPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: 'loi loi lon ra roi'})
    }
})

// GET api/posts
router.get('/', verifyToken, async(req, res)=>{
    try {
        //populate giup lay ra cac truong cua user va doi so thu 2 chinh la nhung thu muon lay ra neu nhu ko muon lay tat ca
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        res.json({success: true, posts})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: 'internal server error'})
    }
})

// PUT api/posts
router.put('/:id', verifyToken, async (req, res) => {
    const { title, url, description, status } = req.body

    if(!title){
        return res.status(400).json({success: false, message: 'title is required'});
    }
    
    
    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '' , 
            status: status || 'TO LEARN'
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true});
        if(!updatedPost) {
            return res.status(401).json({success: false, message:'post not found'})
        }
        res.json({success: true, message: 'updated successfully', post: updatedPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: 'loi loi lon ra roi'})
    }
})


// DELETE api/posts/:id
router.delete('/:id', verifyToken, async (req, res)=>{
    try{
        const deletedPost = await Post.findOneAndDelete({_id: req.params.id, userId: req.userId});
        if(!deletedPost){
            return res.status(400).json({success: false, message: 'delete failure'})
        }
        res.json({success: true, message:'deleted successfully', post: deletedPost}) 
    }catch(error){
        console.log(error);
        res.status(400).json({success: false, message: 'sever loi roi ne'})
    }
})
module.exports = router