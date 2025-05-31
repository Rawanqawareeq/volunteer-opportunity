import { roles } from "../../middlewave/auth.js";

export const endPoint ={
    Create:[roles.User],
    getAll:[roles.Volunteer],
    getuser:[roles.User],
   changeStatus:[roles.Volunteer],
    
  
}