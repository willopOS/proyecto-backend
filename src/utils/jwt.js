import jwt from 'jsonwebtoken';

export const generateSign = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

export const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
