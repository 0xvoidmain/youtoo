import jwt from 'jsonwebtoken'

var privateKey = process.env.AUTH_JWT_SECRET_KEY || 'th1s_iiiiiis_jw7@priv4t3kkkkk3y'

export function issueToken(userId, role) {
    return jwt.sign({ 
        userId,
        role
    }, privateKey, { expiresIn: process.env.NODE_ENV == 'production' ? '24h' : '365d' });
}

export function verifyToken(token) {
    return jwt.verify(token, privateKey);
}