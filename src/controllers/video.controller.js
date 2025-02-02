import prisma from "../db/prismaDB.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const createVideo = asyncHandler(async(req,res)=>{
    const {title,description,thumbnail,Videotype,link,createdBy,duration,courseName}=req.body;
    console.log(req.body);
    if (!courseName) {
        throw new ApiError(400, "Course name is required for course videos");
    }
    const existingCourse = await prisma.course.findUnique({
        where: { name: courseName },
    });

    if (!existingCourse) {
        throw new ApiError(404, `Course with name '${courseName}' not found. Please create the course first.`);
    }
        const video = await prisma.video.create({
            data:{
                title:title,
                description:description,
                Videotype:Videotype,
                thumbnail:thumbnail,
                createdBy:createdBy,
                duration:duration,
                courseName:courseName,
                link:link,
            },
            include:{Course:true},
        })
        return res.json(new ApiResponse(200,video,"video created and uploaded successfully"));
    
});
export default createVideo;