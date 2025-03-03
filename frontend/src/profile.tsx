"use client";

import { useImageUpload } from "@/components/hooks/use-image-upload";

import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Cookie from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import nameInitials from "name-initials";
import { toast } from "sonner";

export default function Profile() {
  const token = Cookie.get("token");
  const [profile, setProfile] = useState();

  const formMethods = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        name: z.string(),
        avatar: z.string(),
      })
    ),
  });

  useEffect(() => {
    axios({
      url: "http://localhost:3000/auth/user-profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setProfile(res.data.user);
      formMethods.setValue("name", res.data.user.name);
      formMethods.setValue("email", res.data.user.email);
      formMethods.setValue("avatar", res.data.user.avatar);
    });
  }, [token]);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Form {...formMethods}>
      <main className="py-32">
        <Card className="w-[35rem] mx-auto">
          <CardHeader>
            <CardTitle>Edit profile</CardTitle>
            <CardDescription>
              Make changes to your profile here. You can change your photo and
              set a username.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={formMethods.handleSubmit(async (data) => {
                try {
                  const response = await axios({
                    method: "PUT",
                    url: `http://localhost:3000/auth/users/${profile?.id}`,
                    data,
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  toast.success("Successful Changed User Details", {
                    richColors: true,
                  });

                  axios({
                    url: "http://localhost:3000/auth/user-profile",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }).then((res) => {
                    setProfile(res.data.user);
                    formMethods.setValue("name", res.data.user.name);
                    formMethods.setValue("email", res.data.user.email);
                  });
                } catch (error) {
                  toast.error(error.response.data.error, {
                    richColors: true,
                  });
                }
              })}
              className="space-y-5"
            >
              <FormField
                control={formMethods.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-4 justify-center items-center">
                        <Avatar
                          defaultImage={profile?.avatar}
                          name={profile?.name ?? ""}
                          onImageChange={(file) => {
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
                        <FormLabel>Change Avatar</FormLabel>
                      </div>
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type="email"
                        placeholder="jeevan@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={typeof profile === "undefined"}
                type="submit"
                className="w-full"
              >
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </Form>
  );
}

function Avatar({
  defaultImage,
  name,
  onImageChange,
}: {
  defaultImage?: string;
  name: string;
  onImageChange?: (file: File | null) => void;
}) {
  const {
    file,
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
  } = useImageUpload();

  console.log(file);

  const currentImage = previewUrl || defaultImage;

  useEffect(() => {
    onImageChange?.(file);
  }, [file]);

  return (
    <div className="px-6">
      <div className="relative group flex size-32 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="h-full w-full object-cover"
            width={128}
            height={128}
            alt="Profile image"
          />
        )}
        {!currentImage && <p className="text-3xl">{nameInitials(name)}</p>}
        <button
          type="button"
          className="absolute group-hover:flex hidden size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
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
