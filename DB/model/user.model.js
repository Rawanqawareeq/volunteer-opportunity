import { model, Schema } from "mongoose";
const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
    },
    lastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    dateofBirth:{
        type:Date,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object,
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','Block'],
    },
    role:{
        type:String,
        default:'User',
        enum:['User','Admin','Volunteer']

    },
    sendcode:{
        type:String,
        default:null,
    }

},{
    timestamps:true,
});
const UserModel = model('User',UserSchema);
export default UserModel;