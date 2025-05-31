import 'dotenv/config'
import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";
import activityModel from "../../../DB/model/activity.model.js";
import { pagination } from '../../utils/pagination.js';
import applicationModel from '../../../DB/model/application.model.js';
export const create =async(req,res)=>{
    const{organizationName,name,startDate,endDate,city,address,description} = req.body;
    req.body.Slug= slugify(req.body.name); 
    req.body.startDate = new Date(req.body.startDate);
    req.body.endDate  = new Date(req.body.endDate);
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder: `${process.env.APPNAME}/activity`});
    req.body.image = {secure_url,public_id};
    req.body.volunteer = req.user._id;
    req.body.createdBy = req.user._id;
    const activity = await activityModel.create(req.body);
    res.status(200).json({message:'success', activity});
};
export const changeRequestStatus =async(req,res)=>{
    const id = req.params.id;
    const activity = await activityModel.findById( id );
    if(!activity){
        return res.status(404).json({message:"activity not found"});
    }
    activity.requestStatus = req.body.requestStatus;
    activity.note = req.body.note;
    activity.status =  req.body.status;
    activity.save();
    return res.status(200).json({message:'success',activity});
    
};
export const get = async(req,res)=>{
    const {skip,limit} = pagination(req.query.page,req.query.limit);
    const execQuery = ['limit','page','sort','search','fields'];
   let queryObj = {...req.query};
    execQuery.map((ele)=>{
       delete queryObj[ele];
    })
    queryObj = JSON.stringify(queryObj);
    queryObj = queryObj.replace(/gt|gte|lt|lte|eq|in|nin/g,match => `$${match}`);
    queryObj = JSON.parse(queryObj);
    const mongoseQuery =await  activityModel.find(queryObj).skip(skip).limit(limit);
    const count = await activityModel.estimatedDocumentCount();
    let activitys  = await mongoseQuery.sort(req.query.sort);
    activitys = activitys.map(activity =>{
     return {
       ...activity.toObject(),
       image:activity.image.secure_url,
     }
   })
 
    return res.status(200).json({message:'success',count,activitys});
 }
export const getActive = async (req, res) => {
        const { skip, limit } = pagination(req.query.page, req.query.limit);
      
        const execQuery = ['limit', 'page', 'sort', 'search', 'fields'];
        let queryObj = { ...req.query };
      
        execQuery.map((ele) => {
          delete queryObj[ele];
        });
      
        queryObj = JSON.stringify(queryObj);
        queryObj = queryObj.replace(/gt|gte|lt|lte|eq|in|nin/g, (match) => `$${match}`);
        queryObj = JSON.parse(queryObj);
      
        const finalQuery = { ...queryObj, status: 'Active',requestStatus:'accepted' };
        const mongoseQuery = await activityModel.find(finalQuery).skip(skip).limit(limit);
         const count = await activityModel.countDocuments(finalQuery); 
        let activitys = await mongoseQuery.sort(req.query.sort);
      
        activitys = activitys.map((activity) => {
          return {
            ...activity.toObject(),
            image: activity.image.secure_url,
          };
        });
          return res.status(200).json({ message: 'success', count, activitys });
};
export const getVolunteer = async (req, res) => {
        const { skip, limit } = pagination(req.query.page, req.query.limit);
      
        const execQuery = ['limit', 'page', 'sort', 'search', 'fields'];
        let queryObj = { ...req.query };
      
        execQuery.map((ele) => {
          delete queryObj[ele];
        });
      
        queryObj = JSON.stringify(queryObj);
        queryObj = queryObj.replace(/gt|gte|lt|lte|eq|in|nin/g, (match) => `$${match}`);
        queryObj = JSON.parse(queryObj);
      
        const finalQuery = { ...queryObj, status: 'Active',createdBy:req.user._id};
        const mongoseQuery = await activityModel.find(finalQuery).skip(skip).limit(limit);
         const count = await activityModel.countDocuments(finalQuery); 
        let activitys = await mongoseQuery.sort(req.query.sort);
      
        activitys = activitys.map((activity) => {
          return {
            ...activity.toObject(),
            image: activity.image.secure_url,
          };
        });
          return res.status(200).json({ message: 'success', count, activitys });
};
export const update = async (req, res) => {
    const activity = await activityModel.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    if(activity.volunteer.toString() !== req.user._id.toString()){
        return res.status(404).json({ message:'You are not authorized to update this activity' });
    }
      if (req.body.name) {
      activity.name = req.body.name;
      activity.Slug = slugify(req.body.name);
    }
    if(req.body.organizationName){
        activity.organizationName = req.body.organizationName;
    }
    if (req.body.startDate) {
      activity.startDate = new Date(req.body.startDate);  
    }
  
    if (req.body.endDate) {
      activity.endDate = new Date(req.body.endDate);  
    }
  
    if (req.body.city) {
      activity.city = req.body.city; 
    }
  
    if (req.body.address) {
      activity.address = req.body.address; 
    }
  
    if (req.body.description) {
      activity.description = req.body.description; 
    }
  
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APPNAME}/activity`,
      });
      if (activity.image.public_id) {
        cloudinary.uploader.destroy(activity.image.public_id);
      }
      activity.image = { secure_url, public_id };
    
    }
    if(req.body.numberOfPeople){
        activity.numberOfPeople =req.body.numberOfPeople;
    }
      activity.updatedBy = req.user._id;
  
    await activity.save();
  
    return res.status(200).json({ message: 'success', activity });
};
export const deleteActivity = async(req,res)=>{ 
    const id = req.params.id;
    const activity = await activityModel.findByIdAndDelete({_id:id});
    if(!activity){
        return res.status(404).json({message:"activity not found"});
    }
    if(activity.volunteer.toString() !== req.user._id.toString()){
        return res.status(404).json({ message:'You are not authorized to delete this activity' });
    }
    await cloudinary.uploader.destroy(activity.image.public_id);
     return res.status(200).json({message:"success",activity}); 
}
/*
export const getDetails =async(req,res)=>{
    const id = req.params.id;
    const activity = await activityModel.findById(id);
    if(!activity){
        return res.status(404).json({message:"activity not found"});
    }
    return res.status(200).json({message:"success",activity})
}
    */

export const getDetails = async (req, res) => {
  const id = req.params.id;
  const activity = await activityModel.findById(id);
  if (!activity) {
    return res.status(404).json({ message: "activity not found" });
  }
  const acceptedApplications = await applicationModel.find({
    activityId: id,
    status: 'accepted'
  }).populate({
    path: 'userId',
    select: 'firstName lastName email phone city'
  });
  const acceptedUsers = acceptedApplications.map(app => app.userId);

  return res.status(200).json({
    message: "success",
    activity,
    acceptedUsers
  });
};

  

      
