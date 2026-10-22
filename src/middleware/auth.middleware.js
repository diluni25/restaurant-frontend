import jwt from 'jsonwebtoken';
export default function verifyToken(req,res,next) {
  const token = /^Bearer (.+)$/i.exec(req.headers.authorization || '')?.[1];
  if (!token) return res.status(401).json({success:false,message:'Authentication required'});
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) return res.status(503).json({success:false,message:'JWT_SECRET not configured'});
  try {
    req.admin = jwt.verify(token,process.env.JWT_SECRET,{algorithms:['HS256']});
    if (!['ADMIN','SUPERADMIN'].includes(req.admin.role)) return res.status(403).json({success:false,message:'Admin role required'});
    next();
  } catch { return res.status(401).json({success:false,message:'Invalid or expired token'}); }
}
