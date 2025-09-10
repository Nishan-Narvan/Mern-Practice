import jwt from 'jsonwebtoken'
const JWT_ADMIN_PASSWORD = "adam22"

const authware = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "Authorization header missing" });

    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const payload = jwt.verify(token,ADMIN_PASSWORD ); 
    req.userId = payload.id;
    
    // throws if invalid
    // jwt.verify return karta hai payload jo signin token creation ke time diya gaya tha db mein se-aur is time vo hum req mein daal dete hain, token creation p[payload]k[key secret]o[options-expiry], token-[header.payoload.signature(the hash from header and payload using JWT secret key)]
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authware;
