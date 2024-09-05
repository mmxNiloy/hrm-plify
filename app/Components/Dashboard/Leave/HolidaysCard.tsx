"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useCallback, useEffect, useState } from "react";
import { EventContentArg } from "@fullcalendar/core/index.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Event {
  title: string;
  start: Date;
  end?: Date;
}

interface IEventResponse {
  date: Date;
  localName: string;
  name: string;
}

export default function HolidaysCard() {
  const [events, setEvets] = useState<Event[]>([]);
  const getEvents = useCallback(async () => {
    const apiRes = await fetch("/api/leave/1");
    if (apiRes.ok) {
      // Set event(s)
      const data = (await apiRes.json()) as IEventResponse[];
      const mEvents: Event[] = data.map((item) => ({
        title: item.name,
        start: item.date,
        end: item.date,
      }));
      setEvets(mEvents.filter((item, index) => mEvents.indexOf(item) == index)); // Get unique event(s)
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-lg font-semibold">Holidays</CardTitle>
        <CardDescription className="sr-only">
          View all leaves in an organized fashion.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* TODO: Get leaves and show them here */}
        <FullCalendar
          headerToolbar={{
            start: "today prev,next",
            center: "",
            end: "title",
          }}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={events}
          eventContent={renderEventContent}
        />
      </CardContent>
    </Card>
  );
}

// a custom render function
function renderEventContent(eventInfo: EventContentArg) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger className="text-xs">
          {eventInfo.event.title}
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          <p>{eventInfo.event.start?.toLocaleDateString("en-GB")}</p>
          <p className="font-bold">{eventInfo.event.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
