import express from "express";
import multer from "multer";
import {
  loginUser,
  signUp,
  authenticateUser,
} from "../controllers/User-controller.js";
import User from "../models/user.js";

const userRouter = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

userRouter.post(
  "/auth/signup",
  multer({ storage: fileStorage, fileFilter }).single("avatar"),
  signUp
);

userRouter.post("/user/login", loginUser);

userRouter.get("/user", authenticateUser, async (req, res) => {
  console.log(req.user._id);
  const foundUser = await User.findById(req.user._id).select("-password");
  console.log(foundUser);
  res.send(foundUser);
});

export default userRouter;
