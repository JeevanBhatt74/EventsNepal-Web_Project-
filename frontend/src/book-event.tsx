"use client";

import { useImageUpload } from "@/components/hooks/use-image-upload";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "./components/date-picker";
import { Button } from "./components/ui/button";
import Cookie from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "./lib/utils";
import { toast } from "sonner";
import axios from "axios";

export default function BookEvent() {
  const token = Cookie.get("token");

  const maxLength = 180;

  const formMethods = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string(),
        banner: z.string(),
        date: z.string(),
        price: z.string(),
        location: z.string(),
        description: z.string(),
      })
    ),
  });

  const navigate = useNavigate();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Form {...formMethods}>
      <main className="py-32">
        <form
          onSubmit={formMethods.handleSubmit(async (data) => {
            console.log(data);
            try {
              const response = await axios({
                method: "POST",
                url: `http://localhost:3000/upcomming-events`,
                data: {
                  date: data.date,
                  title: data.name,
                  description: data.description,
                  price: data.price,
                  banner_img: data.banner,
                  location: data.location,
                  status: "pending",
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              toast.success("Successfully Booked Event.", {
                richColors: true,
                duration: 5000,
              });
              navigate("/events");
            } catch (error) {
              toast.error(error.response.data.error, {
                richColors: true,
              });
            }
          })}
        >
          <Card className="w-[35rem] mx-auto">
            <CardHeader>
              <CardTitle>Book Event</CardTitle>
              <CardDescription>Create a new Event here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <FormField
                control={formMethods.control}
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Banner</FormLabel>
                    <FormControl>
                      <ProfileBg
                        onImageUpload={(file) => {
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === "string") {
                                field.onChange(reader.result); // Resolving with the base64 encoded string
                              }
                            };

                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Event Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4">
                <FormField
                  control={formMethods.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onDateChange={(date) =>
                            field.onChange(date?.toISOString())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Event Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Rs. 4999"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={formMethods.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Maitidevi-30, Ktm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a few sentences about your event"
                        maxLength={maxLength}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button onClick={() => navigate("/")} variant={"outline"}>
                Discard
              </Button>
              <Button>Book Now</Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </Form>
  );
}

function ProfileBg({
  defaultImage,
  onImageUpload,
}: {
  defaultImage?: string;
  onImageUpload?: (file: File | null) => void;
}) {
  const [hideDefault, setHideDefault] = useState(false);
  const {
    file,
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  useEffect(() => {
    onImageUpload?.(file);
  }, [file]);

  return (
    <div className="size-96 mx-auto group">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <img
            className="h-full w-full object-contain"
            src={currentImage}
            alt={
              previewUrl
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={96}
          />
        )}
        <div
          className={cn(
            "absolute flex inset-0 items-center justify-center gap-2",
            {
              "group-hover:flex hidden": currentImage,
            }
          )}
        >
          <button
            type="button"
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
              onClick={handleImageRemove}
              aria-label="Remove image"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload image file"
      />
    </div>
  );
}

function Avatar({ defaultImage }: { defaultImage?: string }) {
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange } =
    useImageUpload();

  const currentImage = previewUrl || defaultImage;

  return (
    <div className="-mt-10 px-6">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        <button
          type="button"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          onClick={handleThumbnailClick}
          aria-label="Change profile picture"
        >
          <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}
