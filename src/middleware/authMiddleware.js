import jwt from "jsonwebtoken";
import User from "../models//userSchema";

const protect = async (req, res, next) => {
  let token;

  // Checking only the Authorization header for the token
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    try {
      token = authorizationHeader.split(" ")[1];

      if (!token) {
        res.status(401).json({ error: "Not authorized, token is empty" });
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

export default protect;
