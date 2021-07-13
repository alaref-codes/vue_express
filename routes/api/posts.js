const express = require('express');
const mongodb = require('mongodb')

const router = express.Router();

// GET posts
router.get('/' ,  async (req,res) => {
    const posts = await loadPosts();
    res.send( await posts.find({}).toArray() );

     
})


// // POST posts

router.post('/', async(req,res) => {
    const posts = await loadPosts();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
} )



// DELETE posts

router.delete('/:id' ,  async(req,res) => {
    const posts = await loadPosts();
    await posts.deleteOne({_id : mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


async function loadPosts() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Alaref:yJ6uo7c5PbT7no0z@cluster0.n9u2f.mongodb.net/postsSys?retryWrites=true&w=majority' , 
    {useNewUrlParser: true , useUnifiedTopology: true});  
    return client.db('postsSys').collection('posts')
}

module.exports = router