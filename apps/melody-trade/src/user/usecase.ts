import bcrypt from 'bcryptjs'

export const isEqualPassword=async (passwordIn:string,passwordDB:string):Promise<boolean>=>{
    return await bcrypt.compare(passwordIn,passwordDB)
}

export const hashPassword= async(password:string)=>{
    return await bcrypt.hash(password,12)
}