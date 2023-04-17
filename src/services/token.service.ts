import jwt from 'jsonwebtoken'

const generateJWTToken = (username: String) => {
    const accessToken = jwt.sign({ username }, String(process.env.JWT_SECRET), { expiresIn: '30d' })
    return accessToken;
}

export { generateJWTToken }