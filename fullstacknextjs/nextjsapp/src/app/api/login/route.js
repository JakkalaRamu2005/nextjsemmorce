import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return Response.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return Response.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Don't send password back
        const { password: pwd, ...userWithoutPassword } = user.toObject();

        return Response.json(
            { message: "Login successful", user: userWithoutPassword },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { message: "Login failed", error: error.message },
            { status: 500 }
        );
    }
}
