const JWT_key="nishan123"
import jwt from "jsonwebtoken"



export default async function authmiddleware(req,res,next){

    try{

         const auth = req.headers.authorization;
        
        if(!auth){
            return res.status(401).json({
                message: "Auth header is missing"
            })
        }

           const token = auth.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "Token is missing"
            })
        }


        const decoded = jwt.verify(token, JWT_key)

        if(!decoded){
            return res.json({
                message: " Please provide valid token, you are not authorized"
            })
        }

        req.userId= decoded.userId;
        

        next();
    
    }catch(err){
        console.log(`Auth error: ${err}`)
        return res.status(401).json({
            message: "Invalid token"
        });
    }

}