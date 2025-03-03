import EventsPage, { Gallery4Props } from "@/components/blocks/gallery4";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const [eventsData, setEventsData] = useState<Gallery4Props["items"]>([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/upcomming-events",
    }).then((res) =>
      setEventsData(res.data.filter((item) => item.status.includes("active")))
    );
  }, []);

  return (
    <EventsPage
      title={"Events"}
      description={
        "Explore a diverse range of events designed to inspire, educate, and entertain. From conferences and workshops to live performances and networking gatherings, this page brings together a variety of happenings across industries. Discover upcoming events, read detailed descriptions, and easily book your spot to be part of these exciting experiences!"
      }
      items={eventsData}
    />
  );
}
