import type { Request,  Response, NextFunction } from "express";
import jwt from "jsonwebtoken"



const JWT_SECRET = "12345"






export const userMiddleware = (req: Request, res: Response, next : NextFunction) =>{


    const header = req.headers.authorization;;
    if (!header) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing from header" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);


    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next()
    }else{

        res.status(403).json({
            message: "You are not logged in due to token error"
        })
    }
}