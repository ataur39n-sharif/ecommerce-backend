import {config} from "dotenv";
import path from "path";

config({
    path: path.join(process.cwd(), ".env")
})

export default {
    port: process.env.PORT || 9000,
    mongo_uri: process.env.MONGO_URI,
    node_env: process.env.NODE_ENV,
    bcrypt_saltRounds: process.env.BCRYPT_SALTROUND,
    login: process.env.LOGIN_LINK,
    jwt: {
        accessToken: {
            secret: process.env.JWT_ACCESSTOKEN_SECRET || 'JWT_ACCESSTOKEN_SECRET',
            exp: process.env.JWT_ACCESSTOKEN_EXP || '12h'
        },
        refreshToken: {
            secret: process.env.JWT_REFRESHTOKEN_SECRET || 'JWT_REFRESHTOKEN_SECRET',
            exp: process.env.JWT_REFRESHTOKEN_EXP || '48h'
        },
        common: process.env.JWT
    }
}