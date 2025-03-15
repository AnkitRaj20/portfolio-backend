import { Router } from "express";
import validateModel from "../middlewares/validator.middleware.js";
import { createUser, getUser, loginUser, updateUser } from "../controllers/user.controller.js";
import { createToken, tokenVerify } from "../utils/token.util.js";
import sendResponse from "../utils/response.util.js";
import Users from "../models/user.model.js";
import httpStatus from "http-status";

const userRouter = Router();

userRouter.route("/register").post(validateModel(Users), register);
userRouter.route("/login").post(login);

userRouter
  .route("/:id?")
  // .post(validateModel(User), create)
  .get(tokenVerify, getUserData)
  .put(tokenVerify, validateModel(Users), updateUserData)
  // .delete(tokenVerify, checkAdmin, deleteRecord);

async function register(req,res,next){
  try {
    console.log("register called");
    let userData = req.body;
    const result = await createUser(userData);
    
    const token = await createToken(result.email);
    return sendResponse(
        res,
        httpStatus.OK,
        result,
        "Registered Successfully",
        token
      );
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  try {
    let { field, password } = req.body;


    const { user, token } = await loginUser(field, password);
    delete user.password;
    return sendResponse(res, httpStatus.OK, user, "Login successfully", token);
  } catch (error) {
    next(error);
  }
}

async function updateUserData(req, res, next) {
  try {
    const { id: userId } = req.params;
    const updatedUser = await updateUser(userId, req.body);
    sendResponse(res, httpStatus.OK, updatedUser, "User updated successfully");
  } catch (error) {
    next(error);
  }
}
async function getUserData(req, res, next) {
  try {
    const { id: userId } = req.params;
    const userData = await getUser(userId);
    sendResponse(res, httpStatus.OK, userData, "User found successfully");
  } catch (error) {
    next(error);
  }
}



export default userRouter;