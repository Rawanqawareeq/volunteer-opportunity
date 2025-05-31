import UserModel from "../../../DB/model/user.model.js";
import cloudinary from "../../utils/cloudinary.js";
import "dotenv/config";
import bcrypt from "bcryptjs";
export const getAll = async (req, res) => {
  const users = await UserModel.find({});
  return res.status(200).json({ message: "success", users });
};
/*export const getusers = async (req, res) =>{
    const users = await UserModel.find({role:"User"});
    return res.status(200).json({message:"success",users});
}*/
export const getDetails = async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({ message: "success", user });
};
export const update = async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.APPNAME}/users`,
      }
    );
    if (user.image && user.image.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }
    user.image = { secure_url, public_id };
  }
  if (req.body.firstName) {
    user.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    user.lastName = req.body.lastName;
  }
  if (req.body.email) {
    user.email = req.body.email;
    if (
      await UserModel.findOne({ email: user.email, _id: { $ne: req.user._id } })
    ) {
      return res.status(409).json({ message: "user already exists" });
    }
  }
  if (req.body.password) {
    const hashpassword = await bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.SALTROUNDS)
    );
    user.password = hashpassword;
  }
  if (req.body.phone) {
    user.phone = req.body.phone;
  }
  if (req.body.address) {
    user.address = req.body.address;
  }
  if (req.body.city) {
    user.city = req.body.city;
  }
  if (req.body.gender) {
    user.gender = req.body.gender;
  }
  if (req.body.dateofBirth) {
    user.dateofBirth = new Date(req.body.dateofBirth);
  }

  await user.save();
  return res.status(200).json({ message: "success", user });
};
export const updateUserbyAdmin = async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  if (req.body.status) {
    user.status = req.body.status;
  }
  if (req.body.role) {
    user.role = req.body.role;
  }

  user.save();
  return res.status(200).json({ message: "success", user });
};
