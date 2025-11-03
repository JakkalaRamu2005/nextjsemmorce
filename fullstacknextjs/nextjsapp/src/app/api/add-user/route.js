import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";



export async function POST(req){

    await connectDB();
    const data = await req.json();
    const user = await User.create(data);
    return Response.json({message: "User added successfully", user});

}