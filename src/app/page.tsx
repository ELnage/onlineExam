import Logout from "@/components/logout/logout";
import { nextAuthOptions } from "@/lib/nextAuth";
import { getServerSession,  } from "next-auth";

export default async function Home() {
  const user = await getServerSession(nextAuthOptions)
  console.log( "test",user);
  console.log("user",user.name);
  
  return <>
  
  <h1>Hello {user?.name}</h1>;
  <Logout/>
  </>
}
