const express = require('express')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const router = new express.Router()


//* Create Posts 
router.post('/posts', auth, async (req, res) => {
    // const post = new Post(req.body)
    const post = new Post({
      ...req.body,
      owner: req.user._id
    })
    try {
      await post.save()
      res.status(201).send(post);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  

  //! Get All Posts  
  router.get('/home', async (req, res) => {
    try {
    const posts = await Post.find({ })
    res.send(posts)
    } catch (e) {
      res.status(500).send()
    }
  })

// GET /posts?completed=true  filter
// GET /posts?limit=10&skip=20  paginating
// GET /posts?sortBy=createdAt:desc   sorting
router.get('/posts', auth, async (req, res) => {
  const match = {}

  // if (req.query.completed) {
  //     match.completed = req.query.completed === 'true'
  // }

  try {
      await req.user.populate({
          path: 'posts',
          match,
          options: {
              limit: parseInt(req.query.limit),
              // skip: parseInt(req.query.skip),
              // sort: {
              //   completed: 1
              // }
          }
      }).execPopulate()
      res.send(req.user.posts)
  } catch (e) {
      res.status(500).send()
  }
})
  
  // Get one Post
  router.get('/posts/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
      const post = await Post.findOne({ _id, owner: req.user._id })
        if (!post){
          return res.status(404).send()
        }
      res.send(post)
    } catch (e) {
      res.status(500).send()
    }
  
  })
  
 
  // Update post
  router.patch('/posts/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.params.id
  
    if (!isValidOperation){
      return res.status(400).send({ error: 'Invalid update!' })
    }
    
    try {      
      const post  = await Post.findOne({_id: req.params.id, owner: req.user._id})

          if (!post){
            return res.status(404).send()
          }
      
      updates.forEach((update) => post[update] = req.body[update])
      await post.save()

        res.send(post)
    } catch (e) {
      res.status(500).send()
    }
   
  })
  
  //! Delete Post
  router.delete('/posts/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
      const post  = await Post.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!posts){
          return res.status(404).send()
        }
      res.send(posts)
    } catch (e) {
      res.status(500).send()
    }
  
  })
  
  module.exports = router 