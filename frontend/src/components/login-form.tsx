import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const adminToken = Cookies.get("adminToken");

  const formMethods = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    ),
  });

  const navigate = useNavigate();

  if (adminToken) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <Form {...formMethods}>
      <div
        className={cn("flex flex-col gap-6 w-[50rem] mx-auto py-40", className)}
        {...props}
      >
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form
              onSubmit={formMethods.handleSubmit(async (data) => {
                console.log(data);

                try {
                  const response = await axios({
                    method: "POST",
                    url: "http://localhost:3000/auth/login",
                    data,
                  });

                  if (response.data.user.role !== "admin") {
                    toast.error("You are not an admin", { richColors: true });
                    return;
                  }

                  Cookies.set("adminToken", response.data.token);
                  toast.success("Successful login", { richColors: true });
                  navigate("/admin/dashboard");
                } catch (error) {
                  toast.error(error.response.data.error, {
                    richColors: true,
                  });
                }
              })}
              className="p-6 md:p-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Admin Panel
                  </p>
                </div>
                <FormField
                  control={formMethods.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jeevan@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formMethods.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Log In
                </Button>
              </div>
            </form>
            <div className="bg-muted relative hidden md:block border-l">
              <img
                src="https://eventanything.com/storage/events/165980095062ee8d76831b2.webp"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
}
