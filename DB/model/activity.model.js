import { model, Schema, Types } from "mongoose";

const activitySchema = new Schema({
organizationName:{
        type:String,
        required:true
},
name:{
    type:String,
    required:true
},
Slug:{
    type:String,
    required:true,
},
requestStatus:{
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
},
note:{
    type:String,
},
numberOfPeople:{
    type:Number,
    default:1
},
startDate:{
    type:Date,
    required:true,
},
endDate:{
    type:Date,
    required:true,
},
city:{
    type:String,
    required:true,
},
address:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true,
},
image:{
    type:Object,
    required:true,
},
status:{
    type:String,
    default:'Active',
    enum:['Active','NotActive']
},
/*organizationId:{
    type:Types.ObjectId,
    ref:'organization',
    required:true,
},*/
volunteer:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
},
createdBy:{
    type:Types.ObjectId,
    ref:'User',
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User',
}
},
{timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


const activityModel = model('activity',activitySchema);
export default activityModel;