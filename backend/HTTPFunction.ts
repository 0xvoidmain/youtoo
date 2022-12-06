export interface HTTPRequest<B = any,Q = any,P = any> {
    _auth: () => IAuth
    _isAdmin: () => boolean

    headers: {
        authorization: string
    }
    body: B
    query: Q
    params: P
}

export interface IAuth {
    userId: string
    role: number
    name: string
}
export type HTTPFunction<B = any,Q = any,P = any> = (req: HTTPRequest<B,Q,P>) => any