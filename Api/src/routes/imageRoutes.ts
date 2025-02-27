import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateJWT } from '../middleware/authenticate';
import { ImageUpload } from './imagesControllers/postImage';
import { getBannerImages } from './imagesControllers/getBannerImages';
import { ImageUpdate } from './imagesControllers/putImage';
import { deleteImages } from './imagesControllers/deleteImage';

const router = express.Router()

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });
const uploadMiddleware = upload.single("image");

router.use('/image', express.static('upload/images'));
router.post('/image/upload',
    authenticateJWT,
    uploadMiddleware,
    ImageUpload);
router.get('/images/all',
    authenticateJWT,
    getBannerImages);
router.put('/image/:id',
    authenticateJWT,
    (req, res, next) => {
        uploadMiddleware(req, res, function (err: any) {
            next();
        });
    },
    ImageUpdate);
router.delete('/image/:id',
    authenticateJWT,
    deleteImages);

export default router;