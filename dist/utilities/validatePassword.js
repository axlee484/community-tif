import crypto from "crypto";
const validatePassword = (password, hashedPassword, salt) => {
    const rehashed = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex");
    return rehashed == hashedPassword;
};
export default validatePassword;
//# sourceMappingURL=validatePassword.js.map