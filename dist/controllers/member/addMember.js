import { createDataResponse, createErrorResponse, } from "../../utilities/createResponse.js";
import prisma from "../../utilities/prisma.js";
import getUserFromToken from "../../utilities/getUserFromToken.js";
import { Roles } from "../role/addRole.js";
const addMember = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return createErrorResponse(res, "Invalid token", 403);
        const { id } = getUserFromToken(token);
        const { user: userId, community: communityId, role: roleId, } = req.body;
        console.log(userId, communityId, roleId);
        const creator = await prisma.member.findFirst({
            where: {
                user: id,
                community: communityId,
            },
            select: {
                memberRole: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!creator || creator.memberRole.name != Roles.ADMIN)
            return createErrorResponse(res, "Unauthorized", 403);
        const existingUser = await prisma.member.findFirst({
            where: {
                user: userId,
                community: communityId,
            },
        });
        console.log(existingUser);
        if (existingUser)
            return createErrorResponse(res, "User already exists", 403);
        const member = await prisma.member.create({
            data: {
                user: userId,
                community: communityId,
                role: roleId,
            },
            select: {
                id: true,
                community: true,
                user: true,
                role: true,
                created_at: true,
            },
        });
        return createDataResponse(res, member);
    }
    catch (err) {
        const error = err;
        return createErrorResponse(res, error.message);
    }
};
export default addMember;
//# sourceMappingURL=addMember.js.map