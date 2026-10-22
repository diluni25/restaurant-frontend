import {Router} from 'express';
import {asyncRoute} from '../utils/http.js';
import {quote} from '../services/order.service.js';
const r=Router();
r.post('/quote',asyncRoute(async(req,res)=>res.json({success:true,data:await quote(req.body?.items)})));
export default r;
