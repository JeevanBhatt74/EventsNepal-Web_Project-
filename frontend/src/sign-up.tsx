import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";

import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { toast } from "sonner";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();

  const formMethods = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
      })
    ),
  });

  return (
    <Form {...formMethods}>
      <main className="py-40">
        <Card className="w-[35rem] mx-auto">
        <CardHeader className="text-center py-6">
  <CardTitle className="text-4xl font-extrabold text-black mb-2">
    Sign Up
  </CardTitle>
  <CardDescription className="text-xl text-gray-600">
    We just need a few details to get you started and book your event.
  </CardDescription>
</CardHeader>
          <CardContent>
            <form
              onSubmit={formMethods.handleSubmit(async (data) => {
                try {
                  const response = await axios({
                    method: "POST",
                    url: "http://localhost:3000/auth/register",
                    data,
                  });
                  navigate("/login");
                  console.log(response.data);
                  toast.success("Account Registered Successfully", {
                    richColors: true,
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jeevan Raj Kapadi Bhatt" {...field} />
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
                Register Account
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-4">
              By signing up you agree to our{" "}
              <a className="underline hover:no-underline" href="#">
                Terms and conditions
              </a>
              .
            </p>

            <div className="flex py-4 items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              <span className="text-xs text-muted-foreground">Or</span>
            </div>
            <Button
              onClick={() => navigate("/login")}
              className="w-full"
              variant="outline"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </main>
    </Form>
  );
}
