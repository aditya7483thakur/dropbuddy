"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  FolderOpen,
  Image,
  LoaderCircle,
  Star,
  Upload,
  Video,
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
import { toast } from "sonner";

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
        toast.success("Signed In successfully");
        router.push("/dashboard");
      } else {
        console.error("Unexpected sign-in flow:", result.status);
      }
    } catch (err) {
      toast.error("Some error occurred !");
      console.log(err);
    }
  }

  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCaptcha(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - DropBuddy Showcase */}
      <div className="flex-1 bg-gradient-to-br lg:block hidden from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden p-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>

        {/* Logo */}
        <div className="relative z-10 my-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DropBuddy
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Your Ultimate
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              File Management
            </span>
            Solution
          </h1>

          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Upload, organize, star, and manage your files with ease. DropBuddy
            provides a seamless experience for all your file management needs
            with powerful features and intuitive design.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
              <Upload className="w-5 h-5 mr-2" />
              Start Managing Files
            </button>
            <button className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* File Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Documents</h3>
              <p className="text-sm text-slate-600">45 files</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Images</h3>
              <p className="text-sm text-slate-600">128 files</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Videos</h3>
              <p className="text-sm text-slate-600">23 files</p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-8 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>
      </div>
      {/* <div> */}

      {/* Right Section - Signup Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Join DropBuddy
            </h2>
            <p className="text-slate-600">
              Create your account and start organizing your files today
            </p>
          </div>

          <div className="flex-1 bg-white flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {typeof window !== "undefined" && showCaptcha && (
                <div id="clerk-captcha" />
              )}

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
                    disabled={isSubmitting}
                    className={`hover:cursor-pointer  bg-gradient-to-r from-blue-600 to-purple-600 `}
                  >
                    {isSubmitting && <LoaderCircle className=" animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
