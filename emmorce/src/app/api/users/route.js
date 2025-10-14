import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        name: "ramu",
        age: 21
    }, { status: 200 })

}

export async function POST(request) {
    const data = await request.json();
    console.log("data", data);
    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
}