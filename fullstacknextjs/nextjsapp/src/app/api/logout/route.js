import { cookies } from "next/headers";

export async function POST() {
    try {
        (await cookies()).delete('token');

        return Response.json({ message: "logged out successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Logout failed", error: error.message },
            { status: 500 }
        );
    }
}