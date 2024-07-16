import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateJWT } from '../middleware/authenticate';
import { ImageUpload } from './imagesControllers/postImage';

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
router.post('/upload/image',
    authenticateJWT, 
    upload.single('image'), ImageUpload);

export default router;