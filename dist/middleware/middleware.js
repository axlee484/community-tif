import { createErrorResponse } from "../utilities/createResponse.js";
import getUserFromToken from "../utilities/getUserFromToken.js";
export const authorizeByUserId = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return createErrorResponse(res, "Invalid token", 403);
        const { id, email } = getUserFromToken(token);
        req.user = { id, email };
        next();
    }
    catch (err) {
        const error = err;
        return createErrorResponse(res, error.message);
    }
};
//# sourceMappingURL=middleware.js.map