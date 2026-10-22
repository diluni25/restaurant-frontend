import {Router} from 'express';
import {requireAdmin} from '../middleware/admin.middleware.js';
import {asyncRoute,validId} from '../utils/http.js';
import {uploadImage,uploadedPath,updateImage} from '../services/image.service.js';
const r=Router();
r.post('/upload',requireAdmin,uploadImage,asyncRoute(async(req,res)=>res.status(201).json({success:true,data:{image:uploadedPath(req.file)}})));
r.patch('/menu/:id',requireAdmin,asyncRoute(async(req,res)=>res.json({success:true,data:await updateImage(validId(req.params.id),req.body.imageUrl??req.body.image)})));
r.delete('/menu/:id',requireAdmin,asyncRoute(async(req,res)=>res.json({success:true,data:await updateImage(validId(req.params.id),null)})));
export default r;
