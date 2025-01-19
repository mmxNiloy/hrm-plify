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
import { IHoliday } from "@/schema/HolidaySchema";

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

export default function HolidaysCard({ holidays }: { holidays?: IHoliday[] }) {
  const getEvents = useCallback((): Event[] => {
    if (holidays) {
      return holidays.map((item) => ({
        title: item.holiday_name,
        start: new Date(item.start_time),
        end: new Date(item.end_time),
      }));
    }
    return [];
  }, [holidays]);

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(getEvents());
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
