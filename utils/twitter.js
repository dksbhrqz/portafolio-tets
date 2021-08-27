const config = require('../config')
const https = require('https');
module.exports = {
    getUserInfo: (cb) => {
        const options = {
            hostname: config.twitterURL,
            path: '/1.1/users/show.json?screen_name=dksbhrqz',
            headers: {
                Authorization: 'Bearer ' + config.twitterToken
            }
        }
        https.get(options, (resp) => {
            
            let data = '';
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {                
                
                data = JSON.parse(data)
                console.log('resul twitter',JSON.stringify(data))
                const info = {
                    name: data.name,
                    picture: data.profile_image_url
                }
                cb(info, null)
                          
                
                
            });

        }).on("error", (err) => {
            console.log('error twitter', err)
            cb(null, err)
        });
    }
}