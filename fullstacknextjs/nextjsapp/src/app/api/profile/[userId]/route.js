import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";

export async function GET(req, { params }) {
    try {
        // Get userId from URL parameter
        const { userId } = params;

        // Connect to database
        await connectDB();

        // Find user by ID and exclude password
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return Response.json(
                { message: "User not found" }, 
                { status: 404 }
            );
        }

        // Return public profile data only
        return Response.json(
            { 
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    bio: user.bio,
                    profilePicture: user.profilePicture,
                    stats: user.stats,
                    createdAt: user.createdAt
                    // Note: We DON'T return email for other users (privacy)
                }
            }, 
            { status: 200 }
        );

    } catch (error) {
        console.error('Profile fetch error:', error);
        return Response.json(
            { message: "Failed to fetch profile" }, 
            { status: 500 }
        );
    }
}
