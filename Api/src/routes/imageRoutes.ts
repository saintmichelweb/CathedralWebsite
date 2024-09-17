import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateJWT } from '../middleware/authenticate';
import { ImageUpload } from './imagesControllers/postImage';
import { getBannerImages } from './imagesControllers/getBannerImages';
import { ImageUpdate } from './imagesControllers/putImage';
import { deleteImages } from './imagesControllers/deleteImage';

const router = express.Router()

// interface MulterStorageOptions {
//     destination: string;
//     filename: (req: any, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => void;
// }

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

router.use('/image', express.static('upload/images'));
router.post('/image/upload', 
    authenticateJWT,
    upload.single('image'), ImageUpload);
router.get('/images/all',
    authenticateJWT,
    getBannerImages);
router.put('/image/:id',
    authenticateJWT,
    ImageUpdate);
router.delete('/image/:id',
    authenticateJWT,
    deleteImages);

export default router;