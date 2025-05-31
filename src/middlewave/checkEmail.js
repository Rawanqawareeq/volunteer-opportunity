import UserModel from "../../DB/model/user.model.js";
export const checkEmail = async(req,res,next)=>{
    const {email} = req.body;
  const user = await UserModel.findOne({email});
  if(user){
    return   res.status(409).json({errors:"Email aleady exists"});
  }
next();
}