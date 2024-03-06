import { SignupRequest } from "../controllers/user/signup.js";
import { SignInBody } from "../controllers/user/signin.js";
import { CreateCommunityRequest } from "../controllers/community/createCommunity.js";
export declare const validateAddRole: (role: AddRoleRequest) => void;
export declare const validateSingup: (signupRequest: SignupRequest) => void;
export declare const validateSingin: (signinRequest: SignInBody) => void;
export declare const validateAddCommunity: (community: CreateCommunityRequest) => void;
export type AddRoleRequest = {
    name: string;
};
