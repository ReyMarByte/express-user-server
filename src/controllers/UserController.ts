import {userServiceEmbedded} from "../service/UserServiceEmbedded.js";
import {UserService} from "../service/UserService.js";
import {parsBody, responseJson, responseText} from "../utils/tools.js";
import {User} from "../model/user.js";
import e, {Request, Response} from "express";
import {userSchema} from "../joiSchemas/userSchema.js";
import {HttpError} from "../errorHandler/HttpError.js";



export class UserController {
    constructor(private userService: UserService) {
    }

    async addUser(req:e.Request, res:e.Response) {

        try {
          // const body = await parsBody(req);
            const body = req.body;
            const {error} = userSchema.validate(body)
            if(error) throw new HttpError(400, error.message);
            const result = this.userService.addUser(body as User);
            if(result){
                responseText(res, 201, "User was successfully added")
            } else {
               // responseText(res, 409, "User already exists")
                throw new Error("User already exists");
            }
        } catch (e) {
            const err = e as Error;
            // responseText(res, 400, err.message)
            throw new Error("Error" + err.message)
        }
    }

    getAllUsers(req: Request, res: Response) {
        const result = this.userService.getAllUsers();
       responseJson(res, 200, result);
    }

    removeUser(req: Request, res: Response) {
         // const urlObj = new URL(req.url!, `http://${req.headers.host}`);
         // const id = urlObj.searchParams.get('userId')
        const id = req.query.userId;

        if(id){
            const removed = this.userService.removeUser(+id);
            if(removed)  responseJson(res, 200, removed);
            else responseText(res, 404, `User with id ${id} not found`)
        } else responseText(res, 400, "No request params found")
    }

    getUserById(req: Request, res: Response) {
        // const urlObj = new URL(req.url!, `http://${req.headers.host}`);
        // const id = urlObj.searchParams.get('userId')
        const {userId} = req.query;
        const id = userId as string;
        if(id){
            const result = this.userService.getUserById(+id);
            if(result)  responseJson(res, 200, result);
            else responseText(res, 404, `User with id ${id} not found`)
        } else responseText(res, 400, "No request params found")
    }

    updateUser(req: Request, res: Response) {
        // const urlObj = new URL(req.url!, `http://${req.headers.host}`);
        // const userId = urlObj.searchParams.get('userId');
        // const newName = urlObj.searchParams.get('newName');

        const {userId, newName} = req.query;
        console.log(userId);

        if(!userId || !newName) responseText(res, 400, "No request params found");
        else{
            const result = this.userService.updateUser(+userId, newName as string);
            if(result) responseText(res, 200, "User successfully updated");
            else responseText(res, 404,`User with id ${userId} not found`);
        }

    }
}

export const userControllerEmbedded = new UserController(userServiceEmbedded)