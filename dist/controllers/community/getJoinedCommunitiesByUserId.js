import { createDataResponse, createErrorResponse, } from "../../utilities/createResponse.js";
import getUserFromToken from "../../utilities/getUserFromToken.js";
import prisma from "../../utilities/prisma.js";
const getJoinedCommunitiesByUserId = async (req, res) => {
    try {
        let currentPage = 1; //these two fields must come from frontend
        let pageSize = 3;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return createErrorResponse(res, "Invalid token", 403);
        const { id } = getUserFromToken(token);
        const communities = await prisma.community.findMany({
            where: {
                members: {
                    some: {
                        user: id,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                slug: true,
                communityUser: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                created_at: true,
                updated_at: true,
            },
        });
        const total = await prisma.community.count({
            where: {
                members: {
                    some: {
                        user: id,
                    },
                },
            },
        });
        const pages = Math.ceil(total / pageSize);
        const page = Math.min(Math.max(currentPage, 1), pages); // Ensure page is within valid range
        const meta = {
            total,
            pages,
            page,
        };
        return createDataResponse(res, communities.map((c) => {
            return {
                ...c,
                owner: c.communityUser,
                communityUser: undefined,
            };
        }), meta);
    }
    catch (err) {
        const error = err;
        return createErrorResponse(res, error.message);
    }
};
export default getJoinedCommunitiesByUserId;
//# sourceMappingURL=getJoinedCommunitiesByUserId.js.map