import {
  Button,
  DatePicker,
  Form,
  GetProp,
  Input,
  InputNumber,
  message,
  Upload,
  UploadProps,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => string) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    callback(reader.result as string);
  });
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function ImageUpload({
  onImageChange,
}: {
  onImageChange?: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
        return url;
      });
    }
  };

  useEffect(() => {
    if (imageUrl) {
      if (imageUrl) {
        navigator.clipboard.writeText(imageUrl);
      }
      onImageChange?.(imageUrl);
    }
  }, [imageUrl, onImageChange]);

  return (
    <Form.Item
      name="banner_img"
      label="Event Image:"
      rules={[{ required: true }]}
      getValueFromEvent={() => imageUrl}
    >
      <Upload
        action={(file) => {
          return new Promise((res) => {
            getBase64(file as FileType, (url) => {
              setLoading(false);
              setImageUrl(url);
              res(url);
              return url;
            });
          });
        }}
        name="banner_img"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        )}
      </Upload>
    </Form.Item>
  );
}

export default function Booking() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <section className="container mx-auto flex justify-center h-96 my-10">
      <Form
        onFinish={(data) => {
          setLoading(true);
          axios
            .post(
              "http://localhost:3000/upcomming-events",
              {
                ...data,
                date: dayjs(data.date).toISOString(),
              },
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
                },
              }
            )
            .then(() => {
              toast.success("Successfully requested for booking.");
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
        <ImageUpload />

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
