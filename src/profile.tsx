import { Button, DatePicker, Form, Input, InputNumber } from "antd";

export default function Profile() {
  return (
    <main className="container mx-auto flex justify-center items-end mt-20 flex-col">
      <div className="">
        <Button type="primary">Edit</Button>
      </div>
      <section className="container mx-auto flex justify-center h-96 my-10">
        <Form
          disabled
          // onFinish={(data) => {
          //   setLoading(true);
          //   axios
          //     .post(
          //       "http://localhost:3000/upcomming-events",
          //       {
          //         ...data,
          //         date: dayjs(data.date).toISOString(),
          //       },
          //       {
          //         headers: {
          //           Authorization: `Bearer ${Cookies.get("token")}`,
          //         },
          //       }
          //     )
          //     .then(() => {
          //       toast.success("Successfully requested for booking.");
          //       navigate("/");
          //     })
          //     .catch(() => {
          //       toast.error("Something went wrong. Please try again later.");
          //     })
          //     .finally(() => {
          //       setLoading(false);
          //     });
          // }}
          layout="vertical"
          size="large"
          className="max-w-3xl flex-1"
        >
          {/* <ImageUpload /> */}

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
              // loading={loading}
              htmlType="submit"
              size="large"
              type="primary"
            >
              <span className="px-10">Submit</span>
            </Button>
          </div>
        </Form>
      </section>
    </main>
  );
}
