import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../db/prismaDB.js";
const createCourse=asyncHandler(async(req,res)=>{
    const{name,description,thumbnail,tag}=req.body;
    const creatorId= req.user?.id;
    console.log(req.body);
    if(!name){
        throw new ApiError(400,"Course Name is must require");
    }
    const course = await prisma.course.create({
        data:{
            name:name,
            description:description,
            thumbnail:thumbnail||null,
            tag:tag,
            creatorId:creatorId
        },
    });
    return res.json(new ApiResponse(201,course,"Course created successfully"));
})
const getAllCourse = asyncHandler(async(req,res)=>{
    const courses = await prisma.course.findMany({
        include:{
            videos:true,
        }, 
    });
    res.json(new ApiResponse(201,courses,"successfully fetch all course"));
    
})
const delCourse=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    await prisma.$transaction([
        prisma.video.deleteMany({where:{courseName:name}}),   
        prisma.course.delete({where:{name:name}})
    ]);
})
export {createCourse,getAllCourse,delCourse}
