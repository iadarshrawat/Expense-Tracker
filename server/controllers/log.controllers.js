import User from "../models/user.model.js";

export const getLogs = async (req, res)=>{
    try {
        const UserId = req.userId;
        console.log(UserId);
        const user = await User.findOne({_id:UserId});
        return res.send({
            user
        })
    } catch (error) {
        return res.status(500).send('Error while getting the logs');
    }
}