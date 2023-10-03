"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useEventModal } from "@/hooks/use-event-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "../date-picker";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  is_limit: z.boolean(),
  max_people: z.number().nonnegative(),
});

const EventModal = () => {
  const eventModal = useEventModal();

  const [loading, setLoading] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      is_limit: false,
      max_people: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const data = {
        date: currentDate,
        ...values,
      };

      await axios.post(`/api/events`, data);
      toast.success("Event created");
    } catch (error: any) {
      toast.error("Something went wrong!", error);
    } finally {
      setLoading(false);
      form.reset();
      eventModal.onClose();
    }
  };

  //TODO: Still has a problem when select date after time. The time will reset
  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const hours = Number.parseInt(value.split(":")[0] || "00", 10);
    const minutes = Number.parseInt(value.split(":")[1] || "00", 10);
    const newDate = new Date(currentDate);
    newDate.setHours(hours, minutes);
    setCurrentDate(newDate);
  };

  return (
    <Modal
      title="Create Event"
      description="Add your event to share with others."
      isOpen={eventModal.isOpen}
      onClose={eventModal.onClose}
    >
      <div className="my-3 items-center sm:flex sm:space-x-2">
        <DatePicker currentDate={currentDate} onDateSelected={setCurrentDate} />
        <Input
          type="time"
          onChange={handleTimeChange}
          className="mt-2 sm:mt-0"
        />
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Event name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="Event description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Event location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <FormField
                  control={form.control}
                  name="is_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit people ?</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(newValue) => {
                            if (newValue === "true") {
                              form.setValue("is_limit", true);
                              setIsLimit(true);
                            }
                            if (newValue === "false") {
                              form.setValue("is_limit", false);
                              setIsLimit(false);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder="No"
                              defaultValue="false"
                              {...field}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isLimit && (
                  <FormField
                    control={form.control}
                    name="max_people"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How many?</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading}
                            placeholder="Max people for this event"
                            {...field}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-3 items-center mt-3 sm:flex sm:justify-end sm:space-x-3">
              <Button disabled={loading} type="submit">
                Create
              </Button>
              <Button
                disabled={loading}
                variant="outline"
                type="button"
                onClick={eventModal.onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default EventModal;
