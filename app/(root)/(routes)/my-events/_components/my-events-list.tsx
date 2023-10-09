"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Event } from "@prisma/client";
import { ArrowRight, ArrowRightCircle, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

type EventWithUser = Event & {
  user: User;
};

interface EventListProps {
  events: EventWithUser[];
  userId: string;
}

const MyEventsList = ({ events, userId }: EventListProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-full md:w-[768px] grid grid-cols-1 sm:grid-cols-2 gap-4 cursor-pointer">
      {events.map((event) => (
        <Card className="h-[250px] duration-300 hover:-translate-y-1 hover:shadow-lg group flex flex-col">
          <CardHeader className="flex-grow">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center text-xl line-clamp-1 group-hover:text-primary duration-200 delay-75">
                {event.name}
                <ArrowRight className="ml-2 transition-transform ease-in-out duration-300 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              {event.date.toDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-3 flex-grow">
            <p className="text-sm line-clamp-3">{event.description}</p>
          </CardContent>
          <CardFooter>
            <Badge>
              <MapPin className="h-4 w-4" />
              {event.location}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyEventsList;
