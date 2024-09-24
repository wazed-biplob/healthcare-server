import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_password_token: process.env.RESET_PASSWORD_TOKEN,
    reset_password_expires_in: process.env.RESET_PASSWORD_EXPIRES_IN,
  },
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  google_app_password: process.env.GOOGLE_APP_PASSWORD,
  google_app_user_mail: process.env.GOOGLE_APP_USER_MAIL,
  password_hash_key: process.env.PASSWORD_HASH_KEY,
};
