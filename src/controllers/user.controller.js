import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { Op } from "sequelize";
import { createToken } from "../utils/token.util.js";

export const createUser = async (userData) => {
  console.log("userData", userData);
  if (!userData) {
    throw new Error("User data is required");
  }
  const salt = await bcrypt.genSalt(10);

  userData.password = await bcrypt.hash(userData.password, salt);
  console.log("userData.password", userData.password);
  let newUser = await Users.create(userData);
  return newUser;
};

export const loginUser = async (field, password) => {
  let user = await Users.findOne({
    where: { [Op.or]: [{ email: field }, { mobile: field }] },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "createdBy",
        "updatedBy",
        "deletedAt",
      ],
    }, // Example fields to exclude
  });

  if (!user) {
    throw {
      status: false,
      message: "User not found",
      httpStatus: httpStatus.UNAUTHORIZED,
    };
  }

  // user = JSON.parse(JSON.stringify(user.results[0]));
  //console.log(user);
  if (!user.password) {
    throw {
      status: false,
      httpStatus: httpStatus.NOT_FOUND,
      message: "User Not Found",
    };
  }
  const hashedPassword = user.password;
  const comparison = await bcrypt.compare(password, hashedPassword);

  if (!comparison) {
    throw {
      status: false,
      message: "Invalid password",
      httpStatus: httpStatus.UNAUTHORIZED,
    };
    //  sendResponse(res, 401, "Invalid password");
  }
  delete user.password;
  delete user.hashedEmail;
  delete user.hashedMobileNo;
  const token = await createToken(field);

  return {
    user: user,
    token,
  };
};

export const updateUser = async (userId, userData) => {
  if (!userData || !userId) {
    throw {
      status: false,
      message: "User data and user id is required",
      httpStatus: httpStatus.BAD_REQUEST,
    };
  }

  const existUser = await Users.findOne({ where: { id: userId } });
  if (!existUser) {
    throw {
      status: false,
      message: "User not found",
      httpStatus: httpStatus.NOT_FOUND,
    };
  }

  let updatedUser = await Users.update(userData, {
    where: { id: userId },
  });

  return updatedUser;
};

export const getUser = async (userId) => {
  if (!userId) {
    const users = await Users.findAndCountAll();
    return users;
  }

  const existUser = await Users.findOne({ where: { id: userId } });
  if (!existUser) {
    throw {
      status: false,
      message: "User not found",
      httpStatus: httpStatus.NOT_FOUND,
    };
  }
  return existUser;
};
