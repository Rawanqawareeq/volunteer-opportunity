import { model, Schema, Types } from "mongoose";

const organizationSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    volunteer:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
    ,
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    UpdatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true,
    toJSON:{virtual:true},
    toObject:{virtual:true}
});
const organizationModel = model('organization',organizationSchema);
export default organizationModel;