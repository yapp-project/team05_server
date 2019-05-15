module.exports = function(){
    /*fs.writeFile("encodedImage.png", encodedImage, function(err) {
            console.log(err);
          });
           //aws s3 세팅
        let aws = require("aws-sdk");
        aws.config.loadFromPath(__dirname + "/../../config/awsconfig.json");
        let s3 = new aws.S3();
        let param = {
                s3: s3,
                bucket: "yappsimmo",
                key:
                function (req, file, cb) {
                     cb(null, Date.now().toString()+".png")
                },
                acl: 'public-read-write',
                location : "/test",
                body : fs.createReadStream('encodedImage.png'),
                ContentType:'image/png'
            };
            s3.upload(param, function(err,data){
                if(err) console.log(err);
                else console.log(data);
            });*/
}