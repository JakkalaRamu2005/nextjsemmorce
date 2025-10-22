import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home({request}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
  <h1>Hello world</h1>
  );
}
