import dotenv from 'dotenv';
dotenv.config({path:'./.env'})

export default {
    port:process.env.PORT,
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    session_secret:process.env.SESSION_SECRET,
    email:process.env.EMAIL,
    email_pass:process.env.EMAIL_PASS,
    email_host:process.env.EMAIL_HOST
}