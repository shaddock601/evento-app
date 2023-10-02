import prismadb from "@/lib/prismadb";
import EventList from "../_components/event-list";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const events = await prismadb.event.findMany();
  const { userId } = auth();

  return (
    <div className="flex flex-col justify-center items-center py-6 px-3">
      <EventList events={events} userId={userId} />
    </div>
  );
}
