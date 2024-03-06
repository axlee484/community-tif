import { createDataResponse, createErrorResponse, } from "../../utilities/createResponse.js";
import prisma from "../../utilities/prisma.js";
const getAllMembersByCommunityId = async (req, res) => {
    try {
        let currentPage = 1; //these two fields must come from frontend
        let pageSize = 3;
        const { id: communityId } = req.params;
        const total = await prisma.member.count({
            where: {
                community: communityId,
            },
        });
        const members = await prisma.member.findMany({
            where: {
                community: communityId,
            },
            select: {
                id: true,
                community: true,
                memberUser: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                memberRole: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                created_at: true,
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
        return createDataResponse(res, members.map((m) => {
            return {
                ...m,
                user: m.memberUser,
                role: m.memberRole,
                memberRole: undefined,
                memberUser: undefined,
            };
        }), meta);
    }
    catch (err) {
        const error = err;
        return createErrorResponse(res, error.message);
    }
};
export default getAllMembersByCommunityId;
//# sourceMappingURL=getAllMembersByCommunityId.js.map