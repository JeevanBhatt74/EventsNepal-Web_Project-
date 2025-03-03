import { Gallery4Props } from "@/components/blocks/gallery4";
import ShinyButton from "@/components/shiny-button";
import { Button } from "@/components/ui/button";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminDashbaord() {
  const [eventsData, setEventsData] = useState<Gallery4Props["items"]>([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/upcomming-events",
    }).then((res) => {
      setEventsData(res.data.filter((item) => item.status.includes("pending")));
    });
  }, []);

  return (
    <main className="flex flex-wrap gap-8">
      {eventsData?.map((item) => (
        <div key={item.id} className="max-w-[320px] group lg:max-w-[360px]">
          <a href={item.href} className="group rounded-xl">
            <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
              <ShinyButton className="absolute top-4 right-4 z-10 bg-white px-4 py-1.5 text-green-400">
                Rs. {item.price}
              </ShinyButton>
              <img
                src={item.banner_img}
                alt={item.title}
                className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute h-full w-full bg-black/10 group-hover:bg-black/0 transition-all bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8 md:pb-4">
                <div className="mb-2 pt-4 font-semibold md:mb-3 md:pt-4 lg:pt-4">
                  {item.title}
                </div>
                <div className="line-clamp-2 text-sm mb-4">
                  {item.description}
                </div>
                <p className="line-clamp-2 text-sm mb-4">
                  {item.location} ({dayjs(item.date).format("MMM DD, YYYY")})
                </p>
                <footer className="flex items-center w-full gap-4">
                  <Button
                    variant="destructive"
                    className="text-white flex-1"
                    onClick={() => {
                      axios({
                        method: "DELETE",
                        url: `http://localhost:3000/upcomming-events/${item.id}`,
                        headers: {
                          Authorization: `Bearer ${Cookies.get("adminToken")}`,
                        },
                      })
                        .then(() => {
                          axios({
                            method: "GET",
                            url: "http://localhost:3000/upcomming-events",
                          }).then((res) => {
                            setEventsData(
                              res.data.filter((item) =>
                                item.status.includes("pending")
                              )
                            );
                          });
                          toast.success(
                            "You've successfully removed the event"
                          );
                        })
                        .catch(() => {
                          toast.success("Error while removing the event");
                        });
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      axios({
                        method: "PUT",
                        url: `http://localhost:3000/upcomming-events/${item.id}`,
                        headers: {
                          Authorization: `Bearer ${Cookies.get("adminToken")}`,
                        },
                        data: {
                          status: "active",
                        },
                      })
                        .then(() => {
                          axios({
                            method: "GET",
                            url: "http://localhost:3000/upcomming-events",
                          }).then((res) => {
                            setEventsData(
                              res.data.filter((item) =>
                                item.status.includes("pending")
                              )
                            );
                          });
                          toast.success(
                            "You've successfully added the event"
                          );
                        })
                        .catch(() => {
                          toast.success("Error while removing the event");
                        });
                    }}
                  >
                    Accept
                  </Button>
                </footer>
              </div>
            </div>
          </a>
        </div>
      ))}
    </main>
  );
}
