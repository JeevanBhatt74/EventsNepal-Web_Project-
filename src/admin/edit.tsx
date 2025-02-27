import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function EditEvent() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { eventId } = useParams();

  const [value, setValue] = useState(undefined);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/upcomming-events/${eventId}`)
      .then((res) => setValue(res.data));
  }, [eventId]);

  return (
    <section className="container mx-auto flex justify-center h-96 my-10">
      <Form
        key={value?.id}
        initialValues={{ ...value, date: dayjs(value?.date) }}
        onFinish={(data) => {
          setLoading(true);
          axios
            .put(`http://localhost:3000/upcomming-events/${eventId}`, {
              ...data,
              date: dayjs(data.date).toISOString(),
            })
            .then(() => {
              toast.success("Successfully Updated Event Details.");
              navigate("/");
            })
            .catch(() => {
              toast.error("Something went wrong. Please try again later.");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        layout="vertical"
        size="large"
        className="max-w-3xl flex-1"
      >
        <Form.Item name="title" label="Title:" rules={[{ required: true }]}>
          <Input placeholder="Enter title" />
        </Form.Item>
        <div className="flex gap-8">
          <Form.Item
            name="date"
            label="Date & Time:"
            className="w-full"
            rules={[{ required: true }]}
          >
            <DatePicker
              placeholder="Select date and time"
              className="w-full"
              showTime
            />
          </Form.Item>
          <Form.Item
            name="price"
            className="w-full"
            label="Price:"
            rules={[{ required: true }]}
          >
            <InputNumber placeholder="Enter price" className="w-full" />
          </Form.Item>
        </div>
        <Form.Item
          name="location"
          label="Location:"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Location" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description:"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={6} placeholder="Enter description" />
        </Form.Item>

        <div className="justify-end flex">
          <Button
            loading={loading}
            htmlType="submit"
            size="large"
            type="primary"
          >
            <span className="px-10">Submit</span>
          </Button>
        </div>
      </Form>
    </section>
  );
}
