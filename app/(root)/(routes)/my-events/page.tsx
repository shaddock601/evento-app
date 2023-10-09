import { auth } from "@clerk/nextjs";
import MyEventsList from "./_components/my-events-list";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

const MyEventsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const events = await prismadb.event.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "asc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="flex items-center justify-center py-6 px-3">
      <MyEventsList events={events} userId={userId} />
    </div>
  );
};

export default MyEventsPage;
