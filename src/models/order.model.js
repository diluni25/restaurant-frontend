import { prisma } from '../config/prisma.js';
const include={items:true};
export const orderModel={
 create(data){return prisma.order.create({data,include});},
 get(id){return prisma.order.findUnique({where:{id},include});},
 list(){return prisma.order.findMany({orderBy:{createdAt:'desc'},take:200,include});},
 status(id,status){return prisma.order.update({where:{id},data:{status},include});},
};
