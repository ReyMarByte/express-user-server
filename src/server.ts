import express, {Response, Request, NextFunction} from 'express';
import {apiRouter} from "./routers/apiRouter.js";
import {myLogger} from "./utils/logger.js";
import {HttpError} from "./errorHandler/HttpError.js";

export const launchServer = () => {
    const app = express();
    app.listen(3055, () => {
        console.log("Server runs at http://localhost:3055")
    })
//http://localhost:3000/api/users/56/Tom
    //  app.use('/api/users/:id/:userName', apiRouter)
    //const {id, userName} = req.params

//http://localhost:3000/api/users?id=56&userName=Tom
  //  app.use('/api/users', apiRouter);
    //const {id, userName} = req.query

 //================Middlware==================

    app.use(express.json());

    // =================Routers=================
    app.use('/api', apiRouter);

    app.use((req, res) => {
        myLogger.log("Wrong request. Page not found")
        res.status(404).send("Page not found")
    })

    app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
        if(err instanceof HttpError)
            res.status(err.status).send(err.message)
        else if(err instanceof Error)
        res.status(400).send('Uncorrected request ' + err.message);
        else res.status(500).send('Unknown Server Error ' + err);
    })

}