import { createDataResponse, createErrorResponse, } from "../../utilities/createResponse.js";
import getUserFromToken from "../../utilities/getUserFromToken.js";
import prisma from "../../utilities/prisma.js";
const getOwnedCommunitiesByUserId = async (req, res) => {
    try {
        let currentPage = 1; //these two fields must come from frontend
        let pageSize = 3;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return createErrorResponse(res, "Invalid token", 403);
        const { id } = getUserFromToken(token);
        const total = await prisma.community.count({
            where: {
                owner: id,
            },
        });
        const communities = await prisma.community.findMany({
            where: {
                owner: id,
            },
            select: {
                id: true,
                name: true,
                slug: true,
                owner: true,
                created_at: true,
                updated_at: true,
            },
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
        });
        const pages = Math.ceil(total / pageSize);
        const page = Math.min(Math.max(currentPage, 1), pages); // Ensure page is within valid range
        const meta = {
            total,
            pages,
            page,
        };
        return createDataResponse(res, communities, meta);
    }
    catch (err) {
        const error = err;
        return createErrorResponse(res, error.message);
    }
};
export default getOwnedCommunitiesByUserId;
//# sourceMappingURL=getOwnedCommunitiesByUserId.js.map