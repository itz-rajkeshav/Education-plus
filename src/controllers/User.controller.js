import prisma from "../db/prismaDB.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcryptjs"
const createUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    
    console.log(email , password);
    const existedUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(existedUser){
        throw new ApiError(409,"User is already created with this email id...Chose another email");
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await prisma.user.create({
        data:{
            email:email,
            password:hashPassword,
            provider:"manual",
        }
    })
    const { password: _, ...userResponse } = newUser;
    return res.json(new ApiResponse(200,userResponse,"User registered successfully"))
})
export default createUser