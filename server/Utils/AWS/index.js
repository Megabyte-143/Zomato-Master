import AWS from "aws-sdk";


//AWS S3 config
const s3Buket = new AWS.S3({
    accessKeyId: "AKIA6FFOC2W6R5XWR372",
    secretAccessKey: "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",
    region: "ap-south-1"
})

export const s3Upload = (options) => {
    return new Promise((resolve, reject) =>
        s3Buket.upload(options, (error, data) => {
            if (error) return reject(error);
            return resolve(data);
        })
    );
}