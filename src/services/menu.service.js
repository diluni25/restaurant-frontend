import { randomUUID } from 'node:crypto';
import { menuModel } from '../models/menu.model.js';
import { HttpError,cash,stringField,slugify } from '../utils/http.js';
const has=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const format=item=>({...item,price:cash(item.price),categoryName:item.category?.name});
export async function listMenu(query={},admin=false){
 const where={...(!admin?{isAvailable:true}:{})};
 if(query.category) where.category={name:String(query.category)};
 if(query.search) where.name={contains:String(query.search)};
 return (await menuModel.list(where)).map(format);
}
export async function getMenu(id,admin=false){const item=await menuModel.get(id);if(!item||(!admin&&!item.isAvailable))throw new HttpError(404,'Menu item not found');return format(item);}
async function categoryIdFor(body){
 if(body.categoryId){const c=await menuModel.categoryById(body.categoryId);if(!c)throw new HttpError(400,'Category not found');return c.id;}
 const name=stringField(body.category,'category',100);
 let category=await menuModel.categoryByName(name);
 if(!category){const slug=slugify(name)+'-'+randomUUID().slice(0,6);category=await menuModel.createCategory({name,slug});}
 return category.id;
}
async function input(body,partial=false){
 if(!body||typeof body!=='object'||Array.isArray(body))throw new HttpError(400,'JSON object required');
 const data={};
 for(const [key,max] of [['name',160],['description',10000]]) if(!partial||has(body,key))data[key]=stringField(body[key],key,max);
 if(!partial||has(body,'price')){const n=Number(body.price);if(!Number.isFinite(n)||n<=0||n>99999999)throw new HttpError(400,'Invalid price');data.price=n.toFixed(2);}
 if(!partial||has(body,'category')||has(body,'categoryId'))data.categoryId=await categoryIdFor(body);
 if(!partial||has(body,'image')||has(body,'imageUrl')){
  const val=body.imageUrl??body.image; if(val!==null&&val!==undefined&&val!==''&& (typeof val!=='string'||val.length>2048||!(/^https?:\/\//i.test(val)||val.startsWith('/uploads/'))))throw new HttpError(400,'Invalid image URL');
  data.imageUrl=val||null;
 }
 for(const key of ['isAvailable','isFeatured'])if(has(body,key)){if(typeof body[key]!=='boolean')throw new HttpError(400,`${key} must be boolean`);data[key]=body[key];}
 if(has(body,'published')){if(typeof body.published!=='boolean')throw new HttpError(400,'published must be boolean');data.isAvailable=body.published;}
 if(has(body,'sortOrder')){if(!Number.isInteger(body.sortOrder))throw new HttpError(400,'sortOrder must be integer');data.sortOrder=body.sortOrder;}
 if(!partial||has(body,'name'))data.slug=slugify(data.name)+'-'+randomUUID().slice(0,8);
 if(partial&&!Object.keys(data).length)throw new HttpError(400,'No fields to update');
 return data;
}
export async function createMenu(body){return format(await menuModel.create(await input(body)));}
export async function updateMenu(id,body){await getMenu(id,true);return format(await menuModel.update(id,await input(body,true)));}
export async function deleteMenu(id){await getMenu(id,true);await menuModel.remove(id);}
export async function setImage(id,image){return updateMenu(id,{imageUrl:image});}
export async function categories(){return menuModel.categories();}
