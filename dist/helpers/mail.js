"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const transporter = nodemailer_1.default.createTransport({
    auth: {
        user: config_1.default.email,
        pass: config_1.default.email_pass
    },
    tls: {
        rejectUnauthorized: false,
    },
    secure: true,
    port: 465,
    host: config_1.default.email_host
});
module.exports = function (to, msg, name, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        yield transporter.sendMail({
            from: `"Support"<${config_1.default.email}>`,
            to: to,
            subject: subject,
            text: 'Attention!',
            html: `<html>  
            <body style='color: #000; font-size: 16px; text-decoration: none; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; background-color: #efefef;'>
            <div id='logo' style='color:#E1B530;padding:10px;'>
            <center><h1 style='margin: 0px;'><img class='nav-logo' src="https://officialporkchopbmx.com/assets/images/logo.png"></h1></center>
            
        </div>
        
                <div id='wrapper' style='max-width: 600px; margin: auto auto; padding: 20px;'>

                    <div id='content' style='font-size: 16px; padding: 25px; background-color: #fff;
                        moz-border-radius: 10px; -webkit-border-radius: 10px; border-radius: 10px; -khtml-border-radius: 10px;
                        border-color: blue; border-width: 4px 1px; border-style: solid;position:relative;top:-180px;'>

                        <h1 style='font-size: 22px;'><center>${subject}</center></h1>

                        <p>From OfficialPorkchopBMX,</p>
                        <p>hello, ${name}</p>
                        ${msg}
                        <p> 
                        Best Regards!<br>
                        Management,<br>
                        Officialporkchopbmc.

                        </p>
                        <br />
                        <p><center><a href='https://www.officialporkchopbmx.com'></a></center></p>

                        <p style='display: flex; justify-content: center; margin-top: 10px;'><center>

                             </div>
                        </center></p>

                    </div>
                    <div id='footer1' style='margin-bottom: 20px; padding: 0px 8px; text-align: center;background-color: #e5e7e9; padding: 10px;position:relative;top:-180px;'>

                    Have a problem? contact us. We're active from Mondays to Fridays 8am - 5pm, then Saturdays 10am - 4pm
                    <p>
                     
                    </p>

               </div>
                    <div id='footer' style='margin-bottom: 20px; padding: 0px 8px; text-align: center;position:relative;top:-180px;'>

                         Copyright OfficialPorkchopBMX 2022.
                    </div>
                </div>
            </body>
        </html>`
        }, (err, info) => {
            if (err)
                throw err;
            console.log(`message has been sent`, info);
        });
    });
};
