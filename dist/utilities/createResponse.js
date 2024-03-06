export const createErrorResponse = (res, error, status = 500) => {
    res.status(status).json({
        status: false,
        content: {
            error,
        },
    });
};
export const createDataResponse = (res, data, meta = undefined, status = 200) => {
    res.status(status).json({
        status: true,
        content: data === undefined
            ? undefined
            : {
                data,
                meta,
            },
    });
};
//# sourceMappingURL=createResponse.js.map