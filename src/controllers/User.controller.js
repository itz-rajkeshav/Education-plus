import prisma from "../db/prismaDB.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcryptjs"
import  Jwt from "jsonwebtoken"
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
 const generateTokens = async (userId) => {
    try {
      const accessToken = Jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '7d' }
      );
  
      const refreshToken = Jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '30d' }
      );
  
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken }
      });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.error('Token generation error:', error);
      throw new Error('Failed to generate tokens');
    }
  };
 const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = 
      req.cookies.refreshToken || req.body.refreshToken;
  
    if (!incomingRefreshToken) {
      throw new ApiError(401, 'Refresh token is required');
    }
  
    try {
      const decodedToken = Jwt.verify(
        incomingRefreshToken, 
        process.env.REFRESH_TOKEN_SECRET
      );
  
      const user = await prisma.user.findFirst({
        where: { 
          id: decodedToken.id,
          refreshToken: incomingRefreshToken 
        }
      });
  
      if (!user) {
        throw new ApiError(401, 'Invalid refresh token');
      }
  
      const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user.id);
  
      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      };
  
      return res
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', newRefreshToken, options)
        .json(
          new ApiResponse(
            200, 
            { accessToken, refreshToken: newRefreshToken },
            'Access token refreshed successfully'
          )
        );
    } catch (error) {
      throw new ApiError(401, error?.message || 'Invalid refresh token');
    }
  };
  const login=asyncHandler(async(req,res)=>{
    const {email,password}= req.body;
    const existedUser = await prisma.user.findUnique({
      where:{
        email:email
      },select:{
        id:true,
        username:true,
        email:true,
        avatar:true,
        provider:true,
        providerId:true,
        phoneNo:true,
        createdAt:true,
        updatedAt:true,
      }
    })
    const options = {
      httpOnly: true,
      secure: true,
    };
    if(!existedUser){
      throw new ApiError(409,"User is not found with this email. Please Sign In first")
    }
    const { accessToken, refreshToken } = await generateTokens(existedUser.id);
    await prisma.user.update({
      where: { id: existedUser.id },
      data: { refreshToken: refreshToken  }
  });
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,existedUser,"user log in successfully"));
  })
  
export  {createUser,generateTokens,refreshAccessToken,login};