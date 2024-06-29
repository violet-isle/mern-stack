import jwt from 'jsonwebtoken'
import { SECRET } from "../config.js";
import { User } from "../models/userModel.js";

const requireAuth = async(req, res, next) => {

    //verify auth
    const { authorization } = req.headers

    if (!authorization){
        return res.status(401).send({message: 'Auth token required'})
    }
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()

    } catch (error){
        res.status(401).send({ message: 'Request is not authorized' });
    }
}

export default requireAuth