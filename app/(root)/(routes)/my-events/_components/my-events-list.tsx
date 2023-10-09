"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TooltipButton from "@/components/tooltip-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Event } from "@prisma/client";
import { ArrowRight, Calendar, Clock, MapPin, Pencil, Trash } from "lucide-react";
import AlertModal from "@/components/modals/alert-modal";
import { useAuth } from "@clerk/nextjs";
import { useEventModal } from "@/hooks/use-event-modal";

type EventWithUser = Event & {
  user: User;
};

interface EventListProps {
  events: EventWithUser[];
  userId: string;
}

const MyEventsList = ({ events, userId }: EventListProps) => {
  const router = useRouter();
  const eventModal = useEventModal();

  const { isSignedIn } = useAuth();

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [eventId, setEventId] = useState<string>();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/events/${eventId}`);
      toast.success("Event deleted");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      router.refresh();
      setAlertOpen(false);
    }
  };

  const handleEdit = (event: EventWithUser) => {
    if (isSignedIn) {
      eventModal.onOpen();
      eventModal.setModeAndEvent("update", event);
    } else {
      router.push("/sign-in");
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="w-full md:w-[768px] grid grid-cols-1 sm:grid-cols-2 gap-4 cursor-pointer">
        {events.map((event) => (
          <Card className="h-[250px] duration-300 hover:-translate-y-1 hover:shadow-lg group flex flex-col" onClick={() => router.push(`/${event.id}`)} key={event.id}>
            <CardHeader className="flex-grow">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center text-xl line-clamp-1 group-hover:text-primary duration-200 delay-75">
                  {event.name}
                  <ArrowRight className="ml-2 transition-transform ease-in-out duration-300 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </span>
              </CardTitle>
              <CardDescription className="text-xs flex space-x-2">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {event.date.toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
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
              <div className="flex ml-auto space-x-2">
                <TooltipButton
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleEdit(event);
                  }}
                  tooltipText="Edit this event"
                  icon={<Pencil className="h-4 w-4" />}
                  variant="outline"
                  disabled={loading}
                  hoverColor="hover:bg-[#1de1b6]"
                />
                <TooltipButton
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setEventId(event.id)
                    setAlertOpen(true);
                  }}
                  tooltipText="Delete this event"
                  icon={<Trash className="h-4 w-4" />}
                  variant="outline"
                  disabled={loading}
                  hoverColor="hover:bg-primary"
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MyEventsList;
