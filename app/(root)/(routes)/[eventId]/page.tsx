import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import EventDetail from "./_components/event-detail";

const EventPage = async ({ params }: { params: { eventId: string } }) => {
  const event = await prismadb.event.findFirst({
    where: {
      id: params.eventId,
    },
    include: {
      user: true,
    },
  });

  if (!event) {
    redirect("/not-found");
  }

  return (
    <div className="flex flex-col justify-center items-center py-6 px-3">
      <EventDetail event={event} />
    </div>
  )
};

export default EventPage;
