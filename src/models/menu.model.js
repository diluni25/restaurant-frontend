import { prisma } from '../config/prisma.js';
export const menuModel={
 list(where){return prisma.menuItem.findMany({where,include:{category:true},orderBy:[{sortOrder:'asc'},{createdAt:'desc'}]});},
 get(id){return prisma.menuItem.findUnique({where:{id},include:{category:true}});},
 create(data){return prisma.menuItem.create({data,include:{category:true}});},
 update(id,data){return prisma.menuItem.update({where:{id},data,include:{category:true}});},
 remove(id){return prisma.menuItem.delete({where:{id}});},
 categoryById(id){return prisma.menuCategory.findUnique({where:{id}});},
 categoryByName(name){return prisma.menuCategory.findUnique({where:{name}});},
 createCategory(data){return prisma.menuCategory.create({data});},
 categories(){return prisma.menuCategory.findMany({orderBy:{sortOrder:'asc'}});},
 available(ids){return prisma.menuItem.findMany({where:{id:{in:ids},isAvailable:true},include:{category:true}});},
};
