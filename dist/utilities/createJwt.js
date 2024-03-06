import jwt from "jsonwebtoken";
import env from "./env.js";
const createJwt = (email, id) => {
    return jwt.sign({
        id,
        email,
    }, env.SERVER_SECRET);
};
export default createJwt;
//# sourceMappingURL=createJwt.js.map