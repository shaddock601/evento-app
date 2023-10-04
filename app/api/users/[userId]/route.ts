import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        if (!params.userId) {
            return new NextResponse("User ID is required", { status: 4000 });
        }
        const res = await prismadb.user.findFirst({
            where: {
                id: params.userId
            }
        })
        return NextResponse.json(res);
    } catch (error: any) {
        return new NextResponse("Internal error", error)
    }
}