import { verifyToken } from "../lib/jwt";
import { cookies } from "next/headers";


export async function auth(){
    try{
        const token = (await cookies()).get('token');

        if(!token){
            return null;
        }
        const decoded = verifyToken(token.value);
        return decoded;
    }catch(error){
        return null;
    }
}