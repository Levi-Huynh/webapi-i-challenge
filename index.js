// implement your API here

const express = require('express');
 const db = require('./data/db.js');

const server = express();
const port = 5555;

//middleware
//returns own body parser
server.use(express.json());

server.get('/', (req, res) => {

    res.send('<h2>Testing Server</h2>');
})

//get all users

server.get('/api/users', (req, res) =>{



    db.find()
    .then(users => {
        if(users) {
            res.json(users);
        }else {
        res.status(500).json({err:"The user information could not be retrieved."})
    }
    })
    .catch(({code, message}) =>{
        res.status(code).json({err: message});
    });

});

//post new user

server.post('/api/users', (req, res) => {

    const {name, bio, } =req.body;


    db.insert({name, bio,})
    .then(addedUser => {
        if(addedUser) {
            res.status(201).json(addedUser)
        }else {
        res.status(400).json({err:"Please provide name and bio for the user."})
    }
       
    })
    .catch(({code,message}) => {
        res.status(500).json({err: "There was an error while saving the user to the database"});
    });


});


//GETrequest with specific id

server.get('/api/users/:id', (req, res) => {

    const {id} = req.params;

    db.findById(id)
    .then(rightUser => {
        if(rightUser){
            res.json(rightUser);

        }else{
            res.status(404).json({err:"The user with specified ID does not exist"});
        }
    })
    .catch(({code,message}) => {
        res.status(500).json({err: "The users information could not be retrieved"});
    });

})

//DELETE REQ

server.delete('/api/users/:id', (req, res) => {

    const {id} = req.params;

    db.remove(id)
    .then(removedUser => {
        if(removedUser) {
            res.json(removedUser);
        }else {
            res.status(404).json({err:"The user with the specified ID does not exist"})
        }
    })
    .catch(({code,message}) => {
        res.status(500).json({err: "The user could not be removed"});
    });
})

//update User

server.put('/api/users/:id', (req,res) => {
    const{id} = req.params;
    const {name, bio}= req.body;

    db.update(id, {name,bio})
    .then(updatedUser => {
        if(updatedUser) {
            res.json(updatedUser);

        }
        if(!name || !bio){
            res.status(400).json({err:"Please provide name and bio for the user"}); 
        }
        else{
            res.status(404).json({err: "The user with the specified ID does not exist"});
        }
    })
    .catch(({code, message}) => {

        res.status(500).json({err:"The user information could not be modified"});
})

})

//listening

server.listen(port, () => console.log(`Server running on port ${port}`));