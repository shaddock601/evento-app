"use client";

import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <Card
          className="p-0 md:px-3 flex flex-col duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer"
          key={event.id}
          onClick={() => router.push(`/${event.id}`)}
        >
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
                <div className="flex items-center font-bold font-sans group-hover:text-primary duration-200 delay-75">
                  {event.name}
                  <ArrowRight className="ml-2 transition-transform ease-in-out duration-300 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
                <div>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary">
                        <AvatarImage
                          src={event.user.imageUrl}
                          alt="avartar image"
                        />
                        <AvatarFallback>{event.user.name}</AvatarFallback>
                      </Avatar>
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
            <Button
              className="before:ease relative overflow-hidden border border-primary bg-primary text-white shadow-sm transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-primary hover:before:-translate-x-40"
              onClick={(e) => {
                e.stopPropagation();
                AttendEvent();
              }}
            >
              <span className="relative z-10">Attend</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
