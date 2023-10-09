import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { eventId: string } }
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

export async function PUT(
    req: Request,
    { params }: { params: { eventId: string } }
) {
    try {
        const body = await req.json();
        const { userId } = auth();
        const { name, description, location, is_limit, max_people, date } = body;

        const res = await prismadb.event.update({
            where: {
                id: params.eventId
            },
            data: {
                name,
                description,
                location,
                is_limit,
                max_people,
                date
            }
        });

        return NextResponse.json(res)

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!params.eventId) {
            return new NextResponse("Event ID is required", { status: 400 })
        }
    } catch (error: any) {
        console.log("[EVENT_PUT]", error);
        return new NextResponse("Internal error", error)
    }
}