import connectToDB  from "@/utils/db";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {

    try {

        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return new NextResponse("Please enter all the fields", { status: 400 });
        }

        await connectToDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "user created successfully", user: newUser }, { status: 201 });




    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}