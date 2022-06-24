const axios = require('axios');
const qs = require('qs');

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const VIDEO_ID = process.env.VIDEO_ID
const API_KEY = process.env.API_KEY;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN; //u get from token.js

(async () => {
    // step 1 - get access token
    let res1 = await axios
        .post(
            'https://oauth2.googleapis.com/token',
            qs.stringify({
                refresh_token: REFRESH_TOKEN,
                grant_type: 'refresh_token'
            }),
            {
                auth: {
                    username: CLIENT_ID,
                    password: CLIENT_SECRET
                }
            }
        );

    const token = res1.data.access_token;

    // step 2 - get video information`
    let res2 = await axios
        .get(
            'https://www.googleapis.com/youtube/v3/videos',
            {
                params: {
                    id: VIDEO_ID,
                    part: 'snippet,statistics',
                    key: API_KEY
                }
            },
        );

    let data = res2.data.items[0];

    let { categoryId, title, description, tags } = data.snippet;
    let { viewCount } = data.statistics;

    console.log(data)
    // step 3 - update video
    await axios
        .put(
            'https://www.googleapis.com/youtube/v3/videos?part=snippet',
            {
                id: VIDEO_ID,
                snippet: {
                    categoryId,
                    title: `THIS VIDEO HAS  ${viewCount} views`,
                    description,
                    tags,
                }
            },
            {
                headers: {
                    authorization: 'Bearer ' + token
                }
            }
        );
})();
