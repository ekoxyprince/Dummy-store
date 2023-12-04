import  nodemailer from 'nodemailer'
import config from '../config'
const transporter = nodemailer.createTransport({
    auth:{
        user:config.email,
        pass:config.email_pass
    },
    tls:{
       rejectUnauthorized:false,
    },
    secure:true,
    port:465,
    host:config.email_host
})

export = async function(to:string,msg:string,name:string,subject:string){
   await transporter.sendMail({
        from:`"Support"<${config.email}>`,
        to:to,
        subject:subject,
        text:'Attention!',
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

    },(err,info)=>{
    if(err) throw err
    console.log(`message has been sent`,info)
    })
}