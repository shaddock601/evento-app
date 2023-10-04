"use client";

import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event, User } from "@prisma/client";
import {
  HoverCardTrigger,
  HoverCard,
  HoverCardContent,
} from "@/components/ui/hover-card";

type EventWithUser = Event & {
  user: User;
};

interface EventListProps {
  events: EventWithUser[];
  userId: string | null;
}

const EventList = ({ events, userId }: EventListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const AttendEvent = async () => {
    if (!userId) {
      toast.error("You have to sign-in to attend this event.");
      router.push("/sign-in");
      return;
    }
    console.log("Attended");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-3 w-full sm:w-[640px]">
      {events.map((event) => (
        <Card className="hover:shadow-xl hover:border-primary">
          <CardHeader>
            <CardTitle className="items-center space-y-3">
              <div className="flex items-center text-xs text-muted-foreground space-x-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <p>{event.date.toDateString()}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <p>{event.date.toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="cursor-pointer hover:text-primary">
                  {event.name}
                </div>
                <div>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Image
                        src={event.user.imageUrl}
                        width={6}
                        height={6}
                        alt="user logo"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer hover:ring-primary"
                        unoptimized
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto">
                      <div className="flex items-center text-xs">
                        <p className="text-muted-foreground font-light">
                          Created by&nbsp;
                        </p>
                        <p className="text-primary font-bold">
                          {event.user.name}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            </CardTitle>
            <CardDescription className="flex items-center py-2">
              <MapPin />
              <div>{event.location}</div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div>User icon</div>
            <Button size="sm" onClick={() => AttendEvent()}>
              Attend
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
