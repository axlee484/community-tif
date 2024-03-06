declare const env: Readonly<{
    DATABASE_URL: string;
    PORT: number;
    SERVER_SECRET: string;
} & import("envalid").CleanedEnvAccessors>;
export default env;
