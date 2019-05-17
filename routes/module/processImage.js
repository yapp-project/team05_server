module.exports = function(){
    //aws s3 세팅
    let aws = require("aws-sdk");
    aws.config.loadFromPath(__dirname + "/../../config/awsconfig.json");
    let s3 = new aws.S3();
    var multer = require('multer');
    var multerS3 = require('multer-s3'); 
    let upload = multer({
            storage : multerS3({
                s3: s3,
                bucket: "yappsimmo",
                key:
                function (req, file, cb) {
                     cb(null, Date.now().toString()+".png")
                },
                acl: 'public-read-write',
                location : "/meeting",
                ContentType:'image/png'
                })
            });
    return upload;
}