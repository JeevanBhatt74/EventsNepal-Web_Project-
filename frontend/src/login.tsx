import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { toast } from "sonner";
import Cookie from "js-cookie";

export default function Login() {
  const id = useId();

  const navigate = useNavigate();

  const formMethods = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    ),
  });

  return (
    <Form {...formMethods}>
      <main className="py-40">
        <Card className="w-[35rem] mx-auto">
        <CardHeader className="text-center py-6">
  <CardTitle className="text-4xl font-extrabold text- to-black mb-2">
    Login
  </CardTitle>
  <CardDescription className="text-xl text-gray-600">
    Login to book your event and explore exciting opportunities!
  </CardDescription>
</CardHeader>
          <CardContent>
            <form
              onSubmit={formMethods.handleSubmit(async (data) => {
                try {
                  const response = await axios({
                    method: "POST",
                    url: "http://localhost:3000/auth/login",
                    data,
                  });

                  Cookie.set("token", response.data.token);
                  toast.success("Successfully logged in", { richColors: true });
                  navigate("/");
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

              <div className="flex justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox id={`${id}-remember`} />
                  <Label
                    htmlFor={`${id}-remember`}
                    className="font-normal text-muted-foreground"
                  >
                    Remember me
                  </Label>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
            <div className="flex py-4 items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              <span className="text-xs text-muted-foreground">Or</span>
            </div>
            <Button
              onClick={() => navigate("/sign-up")}
              className="w-full"
              variant="outline"
            >
              Register New Account
            </Button>
          </CardContent>
        </Card>
      </main>
    </Form>
  );
}
