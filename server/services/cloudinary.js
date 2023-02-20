//connect nodejs with cloud
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dnszdwzdn",
    api_key: "428785573245878",
    api_secret: "1Yx2yc_YICOv5MR1HmaU8yflcBU"
  });

module.exports=cloudinary 