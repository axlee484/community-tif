import hashPassword from "../../utilities/hashPassword.js";
import prisma from "../../utilities/prisma.js";
import { createDataResponse, createErrorResponse, } from "../../utilities/createResponse.js";
import createJwt from "../../utilities/createJwt.js";
import { validateSingup } from "../../middleware/validation.js";
const signup = async (req, res) => {
    try {
        validateSingup(req.body);
        const { name, email, password: plaintextPassword, } = req.body;
        const { salt, hashedPassword: password } = hashPassword(plaintextPassword);
        const createdUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                salt,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
        const token = createJwt(email, createdUser.id);
        createDataResponse(res, createdUser, { access_token: token });
    }
    catch (err) {
        const error = err;
        createErrorResponse(res, error.message);
    }
};
export default signup;
//# sourceMappingURL=signup.js.map