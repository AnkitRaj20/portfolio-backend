import { Router } from "express";
import validateModel from "../middlewares/validator.middleware.js";
import {  tokenVerify } from "../utils/token.util.js";
import sendResponse from "../utils/response.util.js";
import httpStatus from "http-status";
import { createUserAbout, deleteUserAbout, getUserAbout, updateUserAbout } from "../controllers/about.controller.js";
import About from "../models/about.model.js";

const AboutRouter = Router();


AboutRouter
  .route("/:id?")
  .post(validateModel(About), createUserAboutData)
  .get(tokenVerify, getUserAboutData)
  .put(tokenVerify, updateUserAboutData)
  .delete(tokenVerify, deleteUserAboutData);

async function createUserAboutData(req,res,next){
  try {
    let {content,userId} = req.body;
    const result = await createUserAbout(content,userId);
    
   
    return sendResponse(
        res,
        httpStatus.OK,
        result,
        "About added Successfully"
      );
  } catch (error) {
    next(error)
  }
}


async function updateUserAboutData(req, res, next) {
  try {
    const { id: userId } = req.params;
    console.log("---->",userId)
    const updatedUser = await updateUserAbout(userId, req.body);
    sendResponse(res, httpStatus.OK, updatedUser, "User updated successfully");
  } catch (error) {
    next(error);
  }
}
async function getUserAboutData(req, res, next) {
  try {
    const { id: userId } = req.params;
    const userData = await getUserAbout(userId);
    sendResponse(res, httpStatus.OK, userData, "User found successfully");
  } catch (error) {
    next(error);
  }
}

async function deleteUserAboutData(req, res, next) {
  try {
    const { id: userId } = req.params;
    const userData = await deleteUserAbout(userId);
    sendResponse(res, httpStatus.OK, userData, "User found successfully");
  } catch (error) {
    next(error);
  }
}



export default AboutRouter;