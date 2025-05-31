import { roles } from "../../middlewave/auth.js";

export const endPoint ={
    Create:[roles.Admin],
    getAll:[roles.Admin],
    getDetails:[roles.Admin],
    update:[roles.Admin],
    delete:[roles.Admin],
}