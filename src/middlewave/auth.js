
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import UserModel from '../../DB/model/user.model.js';
export const roles = {
    Admin: 'Admin',
    User: 'User',
    Volunteer:'Volunteer',
}

export const auth = (accessRole = [])=>{
    return async(req,res,next)=>{
        const {authorization} = req.headers;
        if(!authorization?.startsWith(process.env.BEARERTOKEN)){
            return res.status(401).json({error:"Invalid bearer"});
        }

        const token = authorization.split(process.env.BEARERTOKEN)[1];
        const decoded = jwt.verify(token,process.env.LOGINSIG)

        if(!decoded){
            return res.status(401).json({error:"Invalid token"});

        }        
        const user = await UserModel.findOne({_id:decoded.id,status:'Active'}).select('userName role');
        if(!user){
            return res.status(401).json({error:"User not found"});
        }
        if(!accessRole.includes(user.role)){
            return res.status(403).json({error:"not auth user"});
        }
        req.user = user; 
        next(); 
    }
}