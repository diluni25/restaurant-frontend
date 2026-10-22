export class HttpError extends Error { constructor(status,message){super(message);this.status=status;} }
export const asyncRoute=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
export const validId=id=>{if(typeof id!=='string'||!id.trim())throw new HttpError(400,'Valid ID required');return id;};
export const cash=value=>Number(Number(value).toFixed(2));
export const stringField=(v,key,max=200,required=true)=>{
 if((v===undefined||v===null||v==='')&&!required)return null;
 if(typeof v!=='string'||!v.trim()||v.length>max)throw new HttpError(400,`${key} must be a valid string (max ${max})`);
 return v.trim();
};
export function slugify(value){return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90)||'item';}
