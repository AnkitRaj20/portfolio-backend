import About from "../models/about.model.js";

export const getUserAbout = async (userId) => {
  if (!userId) {
    throw {
      status: false,
      message: "User ID is required.",
      httpStatus: httpStatus.BAD_REQUEST,
    };
  }

  const existAboutSection = await About.findOne({ where: { userId } });

  return existAboutSection;
};
export const createUserAbout = async (data,userId) => {
  await About.create({
    content: data,
    userId
  });

  return true;
};
export const updateUserAbout = async (userId, data) => {
  if (!userId) {
    throw {
      status: false,
      message: "User ID is required.",
      httpStatus: httpStatus.BAD_REQUEST,
    };
  }

  console.log("data",data)

  await About.update(
    {
     content: data.content,
     updatedBy: data.updatedBy,
    },
    
    {
      where: {
        userId,
      },
    }
  );

  return true;
};

export const deleteUserAbout = async (userId) => {
  if (!userId) {
    throw {
      status: false,
      message: "User ID is required.",
      httpStatus: httpStatus.BAD_REQUEST,
    };
  }

  await About.destroy({
    where: {
      userId,
    },
  });

  return true;
};
