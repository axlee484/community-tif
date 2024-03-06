import crypto from "crypto";
const hashPassword = (plainText) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
        .createHash("sha256")
        .update(plainText + salt)
        .digest("hex");
    return {
        salt,
        hashedPassword,
    };
};
export default hashPassword;
//# sourceMappingURL=hashPassword.js.map