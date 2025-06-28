"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  FileText,
  LoaderCircle,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 8 characters" }),
});

export default function FileManagementSignup() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded) {
      console.log("Clerk not loaded");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setIsSubmitting(false);
        router.push("/dashboard");
      } else {
        console.error("Unexpected sign-in flow:", result.status);
      }
    } catch (err: any) {
      console.error("Sign-in error:", err);
    }
  }

  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCaptcha(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Dark Gradient */}
      <div className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>

        {/* Logo */}
        <div className="absolute top-8 left-8">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-slate-900" />
          </div>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Create a FileVault account
            </h2>
          </div>

          {typeof window !== "undefined" && showCaptcha && (
            <div id="clerk-captcha" />
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={isSubmitting ? "bg-black/75" : "bg-black"}
              >
                {isSubmitting && <LoaderCircle className=" animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>

          {/* Signup Form */}

          <div className="text-center mt-6">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Log in
              </a>
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-slate-500">
              By signing up, you agree to the{" "}
              <a href="#" className="text-purple-600 hover:underline">
                FileVault Services Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Data Processing Agreement
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
