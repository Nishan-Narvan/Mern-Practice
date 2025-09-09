import jwt from 'jsonwebtoken'

const authware = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "Authorization header missing" });

    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const payload = jwt.verify(token, JWT_SECRET); // throws if invalid
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authware;
