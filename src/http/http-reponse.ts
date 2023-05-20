class APIResponse {
    public readonly version: string;
    public readonly status: number;
}

export const res = {
    json:  () => new APIResponse()
}

export interface IResponseBase {
    version: string,
    status: number,
    message?: string,
    error?: string,
    data?: any
}