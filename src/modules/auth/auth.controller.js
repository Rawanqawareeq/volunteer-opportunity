import 'dotenv/config'
import bcrypt  from 'bcryptjs';
import UserModel from '../../../DB/model/user.model.js';
import jwt from 'jsonwebtoken';
import { sendCode, sendEmail} from '../../utils/email.js';
import { customAlphabet} from 'nanoid';
import cloudinary from '../../utils/cloudinary.js';

export const signup = async(req,res)=>{
      const {firstName,lastName,phone,dateofBirth,address,city,gender,email,password,role} = req.body;
      const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder: `${process.env.APPNAME}/users`
    });
    req.body.image = {secure_url,public_id};
    const hashpassword = await  bcrypt.hashSync(password,parseInt(process.env.SALTROUNDS));
    req.body.dateofBirth = new Date(req.body.dateofBirth);
    const createuser = await UserModel.create({firstName,lastName,phone,dateofBirth,address,city,role,gender,email,password:hashpassword});
    const token  = jwt.sign({email},process.env.CONFIRM_EMAIL_TOKEN);
    await sendEmail(email,`Welcome`,firstName,token);
    return res.status(201).json({message:"success",user:createuser});
    
  }
  export const comfirmEmail = async(req,res)=>{
    const token = req.params.email;
    const decoded = jwt.verify(token,process.env.CONFIRM_EMAIL_TOKEN);
    await UserModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
    return res.status(200).json({message:"success"});
 }
 export const sginin = async(req,res)=>{
  const{email,password} = req.body;
  const user = await UserModel.findOne({email});
  if(!user){
   return res.status(404).json({message:"Email Not exists"});
  }
  if(!user.confirmEmail){
   return res.status(400).json({message:"Plz confirm email"});
  }
  const match = await bcrypt.compare(password,user.password);
  if(user.status == "NotActive"){
   return res.status(400).json({message:"your account is blocked"});     }
  if(!match){
   return res.status(400).json({message:"password is wrong"});
  }
  const token = jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSIG);
  return res.status(200).json({message:"success",token});
}
export const SendCode = async(req,res)=>{
  const {email} = req.body;
  const code = customAlphabet('1234567890abcdef', 4)();
  const user = await UserModel.findOneAndUpdate({email},{sendcode:code},{new:true});
  if(!user){
     return res.status(404).json({message:"Email Not exists"});
  }
  await sendCode(email,`Volunteer Opportunity`,'Reset Password',code);
  return res.status(200).json({message:"success"});
}
export const forgetpassword = async(req,res) =>{
  const{email,code,password} = req.body;  
  const user = await UserModel.findOne({email});
  if(!user){
     return res.status(404).json({message:"Email Not exists"});
  }
  if(user.sendcode != code){
     return res.status(404).json({message:"invalid code"});
  }
  user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUNDS));   
  user.sendcode = null;
  user.save(); 
  return res.status(200).json({massege:"success"});
}