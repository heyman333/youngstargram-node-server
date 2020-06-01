import multer from 'multer';
import multerS3 from 'multer-s3';
// import fs from 'fs';
import path from 'path';
import aws from 'aws-sdk';
import config from './config';

const s3 = new aws.S3();

aws.config.update({
    accessKeyId: config.aws.AccessKeyId,
    secretAccessKey: config.aws.SecretKey,
    region: 'ap-northeast-2',
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'youngstargram-test', // 버킷 이름
        contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
        acl: 'public-read',
        key: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            const basename = path.basename(file.originalname, extension);
            cb(null, `images/${encodeURI(basename)}-${Date.now()}${extension}`);
        },
    }),
    limits: { fileSize: 6 * 1024 * 1024 }, // 용량 제한
});

export const profileImageupload = multer({
    storage: multerS3({
        s3,
        bucket: 'youngstargram-test', // 버킷 이름
        contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
        acl: 'public-read',
        key: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            const basename = path.basename(file.originalname, extension);
            cb(
                null,
                `profile-images/${encodeURI(
                    basename
                )}-${Date.now()}${extension}`
            );
        },
    }),
    limits: { fileSize: 6 * 1024 * 1024 }, // 용량 제한
});

export default upload;
