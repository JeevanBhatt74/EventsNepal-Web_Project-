import { Button, Dropdown, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/upcomming-events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <main className="p-8">
      <Table
        bordered
        columns={[
          {
            title: "S.N.",
            render: (_, __, index) => index + 1,
            width: 20,
          },
          {
            title: "Title",
            dataIndex: "title",
            width: 300,
          },
          {
            title: "Description",
            dataIndex: "description",
            width: 750,
          },
          {
            title: "Date",
            dataIndex: "date",
            render: (_) => {
              return dayjs(_ ?? "").format("DD/MM/YYYY");
            },
          },
          {
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Action",
            render: (_) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: "Edit",
                        onClick: () => navigate(`/admin/edit/${_.id}`),
                      },
                      {
                        key: "2",
                        label: "Delete",
                        danger: true,
                        onClick: () => {
                          axios
                            .delete(
                              `http://localhost:3000/upcomming-events/${_.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
                              }
                            )
                            .then(() => {
                              toast.success("Successfully Removed Event");
                              axios
                                .get("http://localhost:3000/upcomming-events")
                                .then((res) => {
                                  setEvents(res.data);
                                });
                            })
                            .catch(() => {
                              toast.error("Failed to delete event");
                            });
                        },
                      },
                    ],
                  }}
                >
                  <Button>
                    <EllipsisVertical />
                  </Button>
                </Dropdown>
              );
            },
          },
        ]}
        dataSource={events}
      />
    </main>
  );
}
