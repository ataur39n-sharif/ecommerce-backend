/* 
    express application root file
*/

import express, {Application} from 'express'
import cors from 'cors'
import globalErrorHandler from "@/Middlewares/Errors/globalErrorHandler";
import notFoundHandler from "@/Middlewares/Errors/notFoundHandler";
import configRoutes from './Routes/config';
import mailTransporter from "@/Config/mailer";

const app: Application = express()
app.use(express.json())
app.use(cors())
app.use('/', configRoutes)
app.use(globalErrorHandler)
app.use(notFoundHandler)


mailTransporter.verify(function (error, success) {
    if (error) {
        console.log(error.message);
    } else {
        console.log("Mail server - ok!");
    }
});


export default app
