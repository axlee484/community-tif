import { createDataResponse, createErrorResponse, } from "../../utilities/createResponse.js";
import getUserFromToken from "../../utilities/getUserFromToken.js";
import prisma from "../../utilities/prisma.js";
const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return createErrorResponse(res, "Invalid token", 403);
        const { id } = getUserFromToken(token);
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
        return createDataResponse(res, user);
    }
    catch (err) {
        const error = err;
        return createErrorResponse(res, error.message);
    }
};
export default getUser;
//# sourceMappingURL=getUser.js.map