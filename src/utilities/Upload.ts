import multer from 'multer';
import path from 'path';

// Directorio donde se guardarán las imágenes de perfil
const uploadDirectory = path.join(__dirname, 'uploads');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: (arg0: null, arg1: string) => void) => {
    cb(null, uploadDirectory);
  },
  filename: (_req: any, file: { fieldname: string; originalname: string; }, cb: (arg0: null, arg1: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Middleware de multer para procesar la carga de archivos
const upload = multer({ storage });

export default upload;
