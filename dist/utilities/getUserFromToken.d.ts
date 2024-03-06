import jwt from "jsonwebtoken";
declare const getUserFromToken: (token: string) => string | jwt.JwtPayload;
export default getUserFromToken;
