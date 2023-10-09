"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event, User } from "@prisma/client";

interface EventProps {
  event: Event & { user: User };
}

const EventDetail = ({ event }: EventProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-full sm:w-[640px]">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <span>{event.name}</span>
              <div className="flex items-center space-x-2">
                <span className="flex flex-col">
                  <p className="text-xs text-mute-foreground font-light ml-auto">created by</p>
                  <p className="text-sm font-bold text-primary ml-auto">{event.user.name}</p>
                </span>
                <Avatar>
                  <AvatarImage src={event.user.imageUrl} />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardTitle>
          <CardDescription className="space-x-1 pt-4">
            <Badge className="cursor-pointer">
              <MapPin className="h-4 w-4" />
              {event.location}
            </Badge>
            <Badge variant="outline">
              <Calendar className="h-4 w-4" />
              {event.date.toLocaleDateString()}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-4 w-4" />
              {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {event.description}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div>Attendant icons</div>
          <Button
            className="before:ease relative overflow-hidden border border-primary bg-primary text-white shadow-sm transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-primary hover:before:-translate-x-40"
          >
            <span className="relative z-10">Attend</span>
          </Button>
        </CardFooter>
      </Card>
    </div >
  );
};

export default EventDetail;
