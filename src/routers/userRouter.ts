import express, {Request, Response} from "express";
import {userControllerEmbedded as controller} from "../controllers/UserController.js";

export const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log("Got request " + req.url);
    next();
})

///api/users
userRouter.get('/', (req, res) => {
    controller.getAllUsers(req, res);
})
userRouter.post('/',  async (req, res) => {
    await controller.addUser(req, res);
})
userRouter.get('/byId',  (req, res) => {
    controller.getUserById(req, res);
})
userRouter.delete('/',  (req:Request, res:Response) => {
    controller.removeUser(req, res);
})
userRouter.patch('/',  (req, res) => {
    controller.updateUser(req, res);
})