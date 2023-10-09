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

  return <EventDetail event={event} />;
};

export default EventPage;
