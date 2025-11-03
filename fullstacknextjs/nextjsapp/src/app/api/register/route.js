import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return Response.json(
                { message: "User already exists" }, 
                { status: 400 }
            );
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const user = await User.create({
            ...data,
            password: hashedPassword
        });

        // Don't send password back
        const { password, ...userWithoutPassword } = user.toObject();

        return Response.json(
            { message: "User registered successfully", user: userWithoutPassword },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            { message: "Registration failed", error: error.message },
            { status: 500 }
        );
    }
}
