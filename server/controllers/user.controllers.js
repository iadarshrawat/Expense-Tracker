import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


export const register = async (req, res) => {
    try {
      const data = req.body;
      console.log(data)
      if (!data.email) {
        return res.send({ status: "email is required" });
      }
      if (!data.name) {
        return res.send({ status: "name is required" });
      }
      if (!data.password) {
        return res.send({ status: "password is required" });
      }
      const isPresent = await User.findOne({ email: data.email });
      if (isPresent) {
        return res.status(200).send({
          success: true,
          message: "Already Register please login",
        });
      }
      const user = await new User({
        name: data.name,
        email: data.email,
        password: data.password,
      }).save();
      return res.json({
        status: true,
        result: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "error in Registration",
        error,
      });
    }
};

export const login = async (req, res)=>{
    try {   
        const {email, password} = req.body;
        console.log(email, password);
        if(!email){
            return res.send({
                status: "email is required"
            })
        }
        if(!password){
            return res.send({
                status: "name is required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.send({status: "you have to register first"});
        }
        if(password!=user.password){
            return res.send({status: "ivalid id or password"});
        }

        const age = 1000 * 60 * 60 * 24 * 7

        const token = jwt.sign({ _id: user._id }, "gejsdhf", {
            expiresIn: age,
        })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age,
        }).status(200).json(user);
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in Registration",
            error,
        })
    }

}

export const logout = (req, res)=>{
    return res.clearCookie('token').status(200).send({status: "Logout Successfully"});
}

export const isAuth = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).send({
            status: "user not authorized"
        })
    }

    jwt.verify(token, "gejsdhf", async (err, payload)=>{
        if(err){
            return res.status(401).send({
                status: "token is not valid"
            })
        }
        req.userId = payload._id;
        next();
    })
}