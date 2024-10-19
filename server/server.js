import express from 'express';
const app = express();
import connectionDB from './config/db.js';
import User from './models/user.model.js';
import bodyparser from 'body-parser';


connectionDB();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.post('/register', async(req, res) => {
    try {
    const data = req.body;
    if(!data.email){
        return res.send({status: "email is required"});
    }
    if(!data.name){
        return res.send({status: "name is required"});
    }
    if(!data.password){
        return res.send({status: "password is required"});
    }
    const isPresent = await User.findOne({email: data.email});
    if(isPresent){
        return res.status(200).send({
            success: true,
            message: "Already Register please login",
        })
    }
    const user = await new User({
        name: data.name,
        email: data.email,
        password: data.password
    }).save()
    res.json({
        status: true,
        result: user
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in Registration',
            error
        })
    }
    
})

app.listen(8000, ()=>{
    console.log("server is running at port 8000");
})