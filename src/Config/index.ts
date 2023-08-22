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
    jwt: {
        accessToken: {
            secret: process.env.JWT_ACCESSTOKEN_SECRET,
            exp: process.env.JWT_ACCESSTOKEN_EXP
        },
        refreshToken: {
            secret: process.env.JWT_REFRESHTOKEN_SECRET,
            exp: process.env.JWT_REFRESHTOKEN_EXP
        }
    }
}