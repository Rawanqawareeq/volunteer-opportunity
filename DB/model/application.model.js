
import { model, Schema, Types } from "mongoose";

const applicationSchema = new Schema({
 userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true,
 },
 activityId:{
    type:Types.ObjectId,
    ref:'activity',
    required:true,      
},
 address:{
    type:String,
    required:true,
 },
 PhoneNumber:{
    type:String,
    required:true,
 },
 status:{
    type:String,
    enum:['pending','accepted','rejected'],
    default:'pending',
 },
 notes:{
    type:String,
 },
 rejectedReason:{
    type:String,
 },
 UpdatedBy:{
    type:Types.ObjectId,
    ref:'User',
    required:true,
}
},{timestamps:true});

const applicationModel = model('application',applicationSchema);
export default applicationModel;