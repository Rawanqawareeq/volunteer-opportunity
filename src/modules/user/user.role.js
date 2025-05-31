import { roles } from "../../middlewave/auth.js";

export const endPoints = {
    getAllUsers: [roles.Admin],
    getUsers: [roles.Admin,roles.Volunteer],
    getUserData: [roles.Admin, roles.User,roles.Volunteer],
    update: [roles.Admin,roles.Volunteer,roles.User],
    updateAdmin: [roles.Admin]
}
    