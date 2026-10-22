import { randomUUID } from 'node:crypto';
import {menuModel} from '../models/menu.model.js';
import {orderModel} from '../models/order.model.js';
import {HttpError,cash,stringField} from '../utils/http.js';
export async function quote(items){
 if(!Array.isArray(items)||items.length<1||items.length>50)throw new HttpError(400,'Cart items required (1-50)');
 const ids=items.map(i=>i.menuItemId||i.id);
 if(ids.some(id=>typeof id!=='string'||!id))throw new HttpError(400,'Menu item IDs must be strings');
 const found=await menuModel.available([...new Set(ids)]);const byId=new Map(found.map(i=>[i.id,i]));
 const rows=items.map(item=>{
 const menu=byId.get(item.menuItemId||item.id);
 if(!menu)throw new HttpError(400,'Menu item missing or unavailable');
 if(!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>100)throw new HttpError(400,'Quantity must be between 1 and 100');
 const unitPrice=cash(menu.price);return {menuItemId:menu.id,itemName:menu.name,quantity:item.quantity,unitPrice,lineTotal:cash(unitPrice*item.quantity),specialNotes:typeof item.specialNotes==='string'?item.specialNotes.slice(0,500):null};
 });
 const subtotal=cash(rows.reduce((sum,r)=>sum+r.lineTotal,0));
 return {items:rows,subtotal,tax:0,deliveryFee:0,total:subtotal,currency:'USD'};
}
const format=order=>({...order,subtotal:cash(order.subtotal),tax:cash(order.tax),deliveryFee:cash(order.deliveryFee),total:cash(order.total),items:order.items?.map(i=>({...i,unitPrice:cash(i.unitPrice),lineTotal:cash(i.lineTotal)}))});
export async function createOrder(body){
 const q=await quote(body.items);
 const customer=body.customer||body.details||{};
 const customerName=customer.name||[customer.firstName,customer.lastName].filter(Boolean).join(' ');
 const type=body.type||'DELIVERY';if(!['DINE_IN','TAKEAWAY','DELIVERY'].includes(type))throw new HttpError(400,'Invalid order type');
 const data={orderNumber:'TG-'+Date.now()+'-'+randomUUID().slice(0,6).toUpperCase(),customerName:stringField(customerName,'customerName',120),customerEmail:customer.email?stringField(customer.email,'email',254):null,customerPhone:customer.phone?stringField(customer.phone,'phone',32):null,type,tableName:body.tableName?stringField(body.tableName,'tableName',80):null,notes:body.notes?stringField(body.notes,'notes',10000):null,subtotal:q.subtotal.toFixed(2),tax:'0.00',deliveryFee:'0.00',total:q.total.toFixed(2),currency:q.currency,items:{create:q.items.map(i=>({...i,unitPrice:i.unitPrice.toFixed(2),lineTotal:i.lineTotal.toFixed(2)}))}};
 return format(await orderModel.create(data));
}
export async function getOrder(id){const o=await orderModel.get(id);if(!o)throw new HttpError(404,'Order not found');return format(o);}
export async function listOrders(){return (await orderModel.list()).map(format);}
export async function changeStatus(id,status){if(!['PENDING','CONFIRMED','PREPARING','READY','COMPLETED','CANCELLED'].includes(status))throw new HttpError(400,'Invalid status');await getOrder(id);return format(await orderModel.status(id,status));}
