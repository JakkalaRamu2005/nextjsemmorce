import {cookies} from "next/headers"
import { verifyToken } from "@/app/lib/jwt"
import { connectDB } from "@/app/lib/mongodb"
import { User } from "@/app/models/User"

export async function GET(){
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('token');


        if(!token){
            return Response.json({message: "Not authenticated"}, {status: 401});
        }

        const decoded = verifyToken(token.value);
        if(!decoded){

            return Response.json({messate: "Invalid token"},{status: 401});
        }

        await connectDB();

        const user = await User.findById(decoded.userId).select('-password');

        if(!user){
            return Response.json({message: "user not found"}, {status: 401});
        }

        return Response.json({user}, {status: 200});





    }catch(error){
        return Response.json({message:"Authentication check failed"}, {status: 500});
    }


}