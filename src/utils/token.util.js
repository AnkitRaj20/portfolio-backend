import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

export const createToken = async (email) => {
  try {
    let getUser = await User.findOne({
      where: {
        email
      }
    });
    if (!getUser) {
      throw {
        status: false,
        message: "User not found",
        httpStatus: httpStatus.FORBIDDEN,
      };
    }
  
    const token = jwt.sign(
      {
        id: getUser.id,
        name: getUser.name,
        email: getUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    throw {
      status: false,
      message: error.message,
    };
  }
};

export const verifyToken = (token) => {
  try {
    if (!token) {
      return null;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("decoded",decodedToken)

    return decodedToken;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw {
        status: false,
        httpStatus: httpStatus.FORBIDDEN,
        message: "Token has expired. Please log in again.",
      };
    }
    if (error.name === "JsonWebTokenError") {
      throw {
        status: false,
        httpStatus: httpStatus.UNAUTHORIZED,
        message: "Invalid token.",
      };
    }
    throw {
      status: false,
      httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while verifying the token.",
    };
  }
};
export const tokenVerify = async(req, res, next) => {
  try {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")[1]
      : null;

    if (!token) {
      throw {
        status: false,
        message: "Token is required.",
        httpStatus: httpStatus.FORBIDDEN,
      };
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      throw {
        status: false,
        message: "Invalid or expired token.",
        httpStatus: httpStatus.FORBIDDEN,
      };
    }

    // const userData = await User.findOne({
    //   where: { id: decoded?.id },
    //   attributes: ["id","isBan"]
    // });

    // if(!userData){
    //   throw{
    //     status: false,
    //     httpStatus: httpStatus.NOT_FOUND,
    //     message: "User not found"
    //   }
    // }


    // if(userData?.isBan){
    //   throw{
    //     status: false,
    //     httpStatus: httpStatus.FORBIDDEN,
    //     message: "Your account has been banned"
    //   }
    // }
    

    req.user = decoded;
    if (req.method === "POST") req.body.createdBy = decoded.id;
    if (req.method === "PUT") req.body.updatedBy = decoded.id;

    next();
  } catch (error) {
    next(error);
  }
};


// !Will be integrated in superAdmin
export const checkAdmin = async (req, res, next) => {
  try {
    // console.log("req",req.user)
    if (req.user.privilegeType !== "admin" && req.user.privilegeType !== "superadmin") {
      throw {
        status: false,
        message: "You are not an admin",
        httpStatus: httpStatus.FORBIDDEN,
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};
