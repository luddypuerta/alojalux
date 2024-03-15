export interface ApiResponse<T = any> {
    data: T;
    errors: object | null;
    status: boolean;
}