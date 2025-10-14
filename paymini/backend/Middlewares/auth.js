const JWT_key="nishan123"
import jwt from "jsonwebtoken"



export default async function authmiddleware(req,res,next){

    try{

        const auth = req.headers.authorization;
        const token = auth.split(" ")[1];

        if(!auth ||!token){
            return res.json({
                message: "Auth header or token is missing"
            })
        }

        const decoded = jwt.verify(token, JWT_key)

        if(!decoded){
            return res.json({
                message: " Please provide valid token, you are not authorized"
            })
        }

        req.userId= decoded.userId;
        console.log(req.userdata);

        next();
    
    }catch(err){
        console.log(`this is the error ${err}`)
    }

}