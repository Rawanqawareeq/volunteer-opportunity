import 'dotenv/config'
import organizationModel from "../../../DB/model/organization.model.js";
import UserModel from "../../../DB/model/user.model.js";
import slugify from 'slugify';
import cloudinary from '../../utils/cloudinary.js';
export const createOrganization =async(req,res)=>{
    req.body.name = req.body.name.toLowerCase();
   if(await organizationModel.findOne({name:req.body.name})){
       return res.status(409).json({message:"organization already exists"});
   }
   const volunteer = await UserModel.findOne({email:req.body.email,role:'Volunteer',confirmEmail:true});
   if(!volunteer){
    return res.status(404).json({message:"volunteer not found"});
   }
   req.body.slug = slugify(req.body.name);
   req.body.volunteer = volunteer._id;
   const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
       {folder:`${process.env.APP_NAME}/organization/${req.body.name}`});
   req.body.image = {secure_url,public_id};
   req.body.createdBy = req.user._id;
   req.body.UpdatedBy = req.user._id;
   const organization = await organizationModel.create(req.body);
   return res.status(200).json({message:"success",organization});
}
export const getActive = async(req,res)=>{           
    const organization = await organizationModel.find({status:'Active'}).select("name image");
    return res.status(200).json({message:"success",organization})
}
export const getAll =async(req,res)=>{
    const organization = await organizationModel.find({});
    return res.status(200).json({message:"success",organization});
}
export const getDetails =async(req,res)=>{
    const id = req.params.id;
    const organization = await organizationModel.findById(id);
    if(!organization){
        return res.status(404).json({message:"organization not found"});
    }
    return res.status(200).json({message:"success",organization})
}
export const update = async(req,res) =>{
    const organization = await organizationModel.findById(req.params.id);
    if(!organization){
        return res.status(404).json({message:"organization not found"});
    }
    if(req.body.name){
        organization.name = req.body.name.toLowerCase();
        if(await organizationModel.findOne({name:req.body.name,_id:{$ne:req.params.id}}))
        {
            return res.status(409).json({message:"organization name already exists"});
        }
        organization.slug = slugify(req.body.name);
    }
    if(req.body.email){
        const volunteer = await UserModel.findOne({email:req.body.email,role:'Volunteer',confirmEmail:true});
        if(!volunteer){
        return res.status(404).json({message:"volunteer not found"});
        }
        req.body.volunteer = volunteer._id;
    }
    if(req.file){
        const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
            {folder:'volunteer/organization'});
            organization.image = {secure_url,public_id};
        cloudinary.uploader.destroy(organization.image.public_id);
    }
    if(req.body.status){
        organization.status = req.body.status;
    }
    req.body.UpdatedBy = req.user._id;
    organization.save();
    return res.status(200).json({message:"success",organization});
}
export const deleteOrganization = async(req,res)=>{ 
    const id = req.params.id;
    const organization = await organizationModel.findByIdAndDelete({_id:id});
    if(!organization){
        return res.status(404).json({message:"organization not found"});
    }
    await cloudinary.uploader.destroy(organization.image.public_id);
     return res.status(200).json({message:"success",organization}); 
}