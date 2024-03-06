declare const validatePassword: (password: string, hashedPassword: string, salt: string) => boolean;
export default validatePassword;
