import {myLogger} from "../utils/logger.js";
import {responseJson} from "../utils/tools.js";
import {IncomingMessage, ServerResponse} from "node:http";

class LoggerController{
    getAllLogs(req:IncomingMessage, res:ServerResponse){
        const allLogs = myLogger.getLogArray();
        responseJson(res, 200, allLogs);
}
}

export const loggerController = new LoggerController();