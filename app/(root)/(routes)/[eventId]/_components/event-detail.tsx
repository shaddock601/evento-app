"use client";

import { Event, User } from "@prisma/client";

interface EventProps {
  event: Event & { user: User };
}

const EventDetail = ({ event }: EventProps) => {
  console.log(event);
  return <div>Event Detail</div>;
};

export default EventDetail;
