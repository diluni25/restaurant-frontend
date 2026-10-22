import multer from 'multer';
import {randomUUID} from 'node:crypto';
import {mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {HttpError} from '../utils/http.js';
import {setImage} from './menu.service.js';
const directory=resolve('uploads/menu');
const extensions={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp'};
function imageUploader(targetDirectory){
 return multer({
  storage:multer.diskStorage({
   destination:async(_req,_file,cb)=>{try{await mkdir(targetDirectory,{recursive:true});cb(null,targetDirectory);}catch(e){cb(e);}},
   filename:(_req,file,cb)=>cb(null,randomUUID()+extensions[file.mimetype]),
  }),
  fileFilter:(_req,file,cb)=>{if(!extensions[file.mimetype])return cb(new HttpError(400,'Only JPG PNG WebP supported'));cb(null,true);},
  limits:{fileSize:5*1024*1024,files:1},
 }).single('image');
}
export const uploadImage=imageUploader(directory);
export const uploadChefImage=imageUploader(resolve('uploads/chefs'));
export function uploadedPath(file){if(!file)throw new HttpError(400,'Image file required');return '/uploads/menu/'+file.filename;}
export function uploadedChefPath(file){if(!file)throw new HttpError(400,'Image file required');return '/uploads/chefs/'+file.filename;}
export const updateImage=setImage;
