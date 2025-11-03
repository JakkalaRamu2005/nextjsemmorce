import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
    try {
        await connectDB();
        return Response.json({ message: "MongoDB connected successfully!" });
    } catch (error) {
        return Response.json({ message: " Connection failed", error: error.message });
    }

}