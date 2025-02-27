import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/upcomming-events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <div className="bg-white font-[sans-serif] my-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
          {events.map((event, index) => (
            <div
              className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300"
              key={index}
            >
              <img
                src={
                  event.banner_img ?? "https://readymadeui.com/hacks-watch.webp"
                }
                alt="Blog Post 2"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <p className="flex justify-between items-center">
                  <span className="text-sm block text-gray-400 mb-2">
                    {dayjs(event.date).format("MMM DD YYYY")}
                  </span>
                  <span className="text-sm block text-gray-400 mb-2">
                    {dayjs(event.date).format("hh:ss A")} -{" "}
                    {dayjs(event.date).add(3, "hours").format("hh:ss A")}
                  </span>
                </p>
                <h3 className="text-xl font-bold text-gray-800">
                  {event.title}
                </h3>
                <hr className="my-4" />
                <p className="text-gray-400 text-sm">{event.description}</p>
                <footer className="flex items-center justify-between">
                  <p className="text-gray-400 font-semibold text-sm">
                    Location: {event.location}
                  </p>
                  <p className="text-end mt-4 font-bold">Rs. {event.price}</p>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
