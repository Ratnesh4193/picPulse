import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export default generateToken;
