import { Request,Response } from "express"
import { DiskService } from "./diskService"
export const createDisk= async(req:Request,res:Response)=>{
    try {
        const disk = await DiskService.createDisk(req.body);
        res.status(201).send({ message: 'Disk Created Successfully', disk });
      } catch (error) {
        console.error('Error creating disk:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
}