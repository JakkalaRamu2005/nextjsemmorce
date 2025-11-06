import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

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
        const token = signToken({ userId: user._id });


        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: false,
           
            sameSite: 'strict',
            maxAge: 86400

        })



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
