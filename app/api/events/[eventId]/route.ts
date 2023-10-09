import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { eventId: string }}
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.eventId) {
            return new NextResponse("Event ID is required", { status: 400 });
        }

        const res = await prismadb.event.delete({
            where: {
                id: params.eventId
            }
        });

        return NextResponse.json(res);
    } catch (error: any) {
        console.log("[EVENT_DELETE]", error)
        return new NextResponse("Internal error", error);
    }
}