import prisma from "../../utilities/prisma.js";
import { createDataResponse, createErrorResponse, } from "../../utilities/createResponse.js";
import validatePassword from "../../utilities/validatePassword.js";
import createJwt from "../../utilities/createJwt.js";
import { validateSingin } from "../../middleware/validation.js";
const signin = async (req, res) => {
    try {
        validateSingin(req.body);
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                password: true,
                salt: true,
            },
        });
        if (!user)
            return createErrorResponse(res, "User not found", 404);
        if (!validatePassword(password, user.password, user.salt))
            return createErrorResponse(res, "Invalid password", 403);
        const token = createJwt(user.email, user.id);
        return createDataResponse(res, {
            ...user,
            password: undefined,
            salt: undefined,
        }, { access_token: token });
    }
    catch (err) {
        const error = err;
        return createErrorResponse(res, error.message);
    }
};
export default signin;
//# sourceMappingURL=signin.js.map