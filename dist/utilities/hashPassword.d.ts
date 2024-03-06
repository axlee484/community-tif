declare const hashPassword: (plainText: string) => {
    salt: string;
    hashedPassword: string;
};
export default hashPassword;
