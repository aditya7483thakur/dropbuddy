"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 8 characters" }),
});

export default function FileManagementSignup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
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
      console.log("Clerk is not loaded yet");
      return;
    }

    setIsSubmitting(true);

    const { email, password } = values;

    try {
      console.log("Attempting to create sign up...");
      const result = await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.info(
        "Verification code sent successfully. Please check your email."
      );
      setIsSubmitting(false);
      setIsVerifying(true); // show verification input

      console.log("Signup result:", result);
    } catch (err: any) {
      toast.error("Internal Server Error");
    }
  }

  const handleVerification = async () => {
    if (!isLoaded || !signUp || !setActive) {
      console.error("Clerk is not fully loaded");
      return;
    }
    setIsSubmitting(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setIsSubmitting(false);
        router.push("/dashboard");
        toast.success("Signed Up successfully");
      }
    } catch (error) {
      toast.error("Verification failed");
    }
  };

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
              Create a DropBuddy account
            </h2>
          </div>

          {typeof window !== "undefined" && showCaptcha && (
            <div id="clerk-captcha" />
          )}

          {isVerifying ? (
            <div className="flex flex-col items-center justify-center ">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="button"
                className={`hover:cursor-pointer mt-4 ${
                  isSubmitting ? "bg-black/75" : "bg-black"
                }`}
                onClick={handleVerification}
              >
                {isSubmitting && <LoaderCircle className=" animate-spin" />}
                {isSubmitting ? "Verifying" : "Verify"}
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                  className={`hover:cursor-pointer ${
                    isSubmitting ? "bg-black/75" : "bg-black"
                  }`}
                >
                  {isSubmitting && <LoaderCircle className=" animate-spin" />}
                  Submit
                </Button>
              </form>
            </Form>
          )}

          {/* Signup Form */}

          <div className="text-center mt-6">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <a
                href="/signin"
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
                Services Agreement
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
