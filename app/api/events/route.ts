import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
    const { userId } = auth()
    const body= await req.json();

    const { name, description, location, is_limit, date } = body;
    let { max_people } = body;

    if (!userId) {
        return new NextResponse("Unauthorize", { status: 401 });
    }

    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
        return new NextResponse("Description is required", { status: 400 });
    }

    if (!location) {
        return new NextResponse("Location is required", { status: 400 });
    }

    if (typeof is_limit !== 'boolean') {
        return new NextResponse("Is this event limit is required", { status: 400 });
    }

    if (!date) {
        return new NextResponse("Date is required", { status: 400 });
    }

    if (is_limit === false) {
        max_people = null;
    }

    const event = await prismadb.event.create({
        data: {
            userId,
            name,
            description,
            location,
            is_limit,
            date,
            max_people
        }
    });

    return NextResponse.json(event);

    } catch (error) {
        console.log("[EVENT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}