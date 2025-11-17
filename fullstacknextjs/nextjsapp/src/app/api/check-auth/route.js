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

export async function PATCH(req) {
    try {
        // 1. Check if the user is logged in (same as GET)
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return Response.json({ message: "Not authenticated" }, { status: 401 });
        }

        const decoded = verifyToken(token.value);
        if (!decoded) {
            return Response.json({ message: "Invalid token" }, { status: 401 });
        }

        // 2. Connect to the database
        await connectDB();

        // 3. Find the user in the database
        const user = await User.findById(decoded.userId);

        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        // 4. Get the new data (name and bio) from the request
        const { name, bio } = await req.json();

        // 5. Update the user's information
        user.name = name || user.name; // Keep old name if no new name is sent
        user.bio = bio !== undefined ? bio : user.bio; // Allow setting an empty bio

        // 6. Save the updated user to the database
        await user.save();

        // 7. Send back the updated user (without the password)
        const { password, ...userWithoutPassword } = user.toObject();
        
        return Response.json({ 
            message: "Profile updated successfully", 
            user: userWithoutPassword 
        }, { status: 200 });

    } catch (error) {
        console.error("Profile update error:", error);
        return Response.json({ message: "Profile update failed", error: error.message }, { status: 500 });
    }
}

