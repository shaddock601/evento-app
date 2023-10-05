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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-4 w-full sm:w-[640px]">
      {events.map((event) => (
        <Card className="p-0 md:px-3 flex flex-col hover:shadow-xl hover:transition hover:delay-150 hover:duration-300">
          <CardHeader>
            <CardTitle className="items-center space-y-3">
              <div className="flex items-center text-xs text-muted-foreground space-x-2">
                <Badge variant="outline" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <p>{event.date.toDateString()}</p>
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <p>{event.date.toLocaleTimeString()}</p>
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="cursor-pointer font-bold font-sans hover:text-primary">
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
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer hover:ring-primary ml-2"
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
              <Badge className="px-2 bg-primary cursor-pointer">
                <MapPin className="h-4 w-4" />
                <div>{event.location}</div>
              </Badge>

            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 font-light">{event.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div>Attendant icon</div>
            <Button className="before:ease relative overflow-hidden border border-primary bg-primary text-white shadow-sm transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-primary hover:before:-translate-x-40"
              onClick={() => AttendEvent()}>
              <span className="relative z-10">Attend</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
