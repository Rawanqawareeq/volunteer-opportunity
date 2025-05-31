import { roles } from "../../middlewave/auth.js";

export const endPoint ={
    Create:[roles.Volunteer],
    changeStatus:[roles.Admin],
    getAll:[roles.Admin],
     getVolunteer:[roles.Volunteer],
    update:[roles.Volunteer],
    getDetails:[roles.Admin],
    delete:[roles.Volunteer],
}