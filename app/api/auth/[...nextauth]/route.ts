import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export async function GET(req: any, props: any) {
  const params = await props.params;
  return handler(req, { ...props, params });
}

export async function POST(req: any, props: any) {
  const params = await props.params;
  return handler(req, { ...props, params });
}
