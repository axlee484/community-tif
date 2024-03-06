import { createDataResponse, createErrorResponse, } from "../../utilities/createResponse.js";
import prisma from "../../utilities/prisma.js";
import { validateAddRole, } from "../../middleware/validation.js";
export const Roles = {
    ADMIN: "Community Admin",
    MEMBER: "Community Member",
    MODERATOR: "Community Moderator",
};
const addRole = async (req, res) => {
    try {
        const v = validateAddRole(req.body);
        console.log(v);
        const { name } = req.body;
        const role = await prisma.role.create({
            data: {
                name,
            },
            select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
        });
        return createDataResponse(res, role);
    }
    catch (err) {
        const error = err;
        return createErrorResponse(res, error.message);
    }
};
export default addRole;
//# sourceMappingURL=addRole.js.map