"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs";
import { Event } from "@prisma/client";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface EventListProps {
  events: Event[];
  userId: string | null;
}

const EventList = ({ events, userId }: EventListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const AttendEvent = async () => {
    if (!userId) {
      toast.error("You have to sign-in to attend this event.");
      router.push("/sign-in");
      return;
    }
    console.log("Attended");
  };

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
              <div className="cursor-pointer hover:text-primary">
                {event.name}
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
