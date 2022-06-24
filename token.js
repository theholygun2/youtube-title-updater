const { google } = require('googleapis');

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()  
}


const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const URI='localhost'

(async () => {
    const client = new google.auth.OAuth2(
        CLIENT_ID, //client id
        CLIENT_SECRET, //secret
        URI
    );

    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/youtube'
        ]
    });

    console.log(url) // click url in console -> get access code 

    const { tokens } = await client.getToken('<your access code>'); //access code from localhost.

    console.log(tokens)
})();
