import { Request, Response } from 'express'
import { hashPassword, isEqualPassword } from "./usecase"
import { UserService } from "./user.service"

export const login= async (req:Request,res:Response)=>{
    try {
        const {email,password}=req.body
        const user=await UserService.findOne(email)
        if(!user){
            return res.status(404).send({ message: "Invalid credentials" })
        }
        const isEqual=await isEqualPassword(password,user.password)
        if (!isEqual) {
            return res.status(401).send({ message: "Invalid credentials" });
          }
          return res.status(200).send({message:'Login Successfuly',user})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})        
    }
}

export const signup= async(req:Request,res:Response)=>{
    try {
        const { username, email, password } = req.body
        const hashedPW =await  hashPassword(password)
        const data={ username, email, password:hashedPW }
        await UserService.createUser(data)
        return res.status(201).send({message:'User created successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}