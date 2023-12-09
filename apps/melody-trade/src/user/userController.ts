import { Request, Response } from 'express'
import { hashPassword } from "./usecase"
import { UserService } from "./userService"

export const login= async (req:Request,res:Response)=>{
    try {
        const {email}=req.body
        const user = await UserService.findOne(email);
        return res.status(200).send({message:'Login Successfuly',user})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:error.message})        
    }
}

export const signup= async(req:Request,res:Response)=>{
    try {
        const { username, email, password } = req.body
        const hashedPW = await hashPassword(password)
        const data={ username, email, password:hashedPW }
        const user = await UserService.createUser(data)
        return res.status(201).send({message:'User created successfully', user})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getUserDetails=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const userId = parseInt(id, 10);
        const user =await UserService.findById(userId)
        if(!user){
            return res.status(404).send({message:'User not found'})
        }
        return res.status(200).send({user})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:error.message})
        
    }
}