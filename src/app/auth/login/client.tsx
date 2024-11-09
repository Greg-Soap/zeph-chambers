"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/customs/custom-form";
import { CustomInput } from "@/components/customs/custom-input";
import { toast } from "sonner";
import { useAppStore } from "@/store/use-app-store";
import zephService from "@/services/zeph.service";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = loginSchema.extend({
  otp: z.string().min(4, "OTP must be at least 4 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

export default function Login() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [isUnverified, setIsUnverified] = useState(false);
  const [loginData, setLoginData] = useState<LoginFormData | null>(null);


  const form = useForm<OtpFormData>({
    resolver: zodResolver(requiresOtp ? otpSchema : loginSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  });

  const { mutate: initiateLogin, isPending: isInitiating } = useMutation({
    mutationFn: zephService.login,
    onSuccess: (data) => {
      if (data.data.isEmailVerified === false) {
        setIsUnverified(true);
        toast.error(data?.data?.message || "Please verify your email before logging in");
        return;
      }
      
      if (data.data.requiresOtp) {
        setRequiresOtp(true);
        toast.success(data?.data?.message || "OTP sent to your email!");
      }
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const { mutate: verifyLogin, isPending: isVerifying } = useMutation({
    mutationFn: zephService.verifyLogin,
    onSuccess: (data) => {
      toast.success(data.data.message || "Login successful!");
      localStorage.setItem("zephToken", data.data.token);
      setUser(data.data.user);
      router.push("/dashboard");
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Verification failed");
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: () => loginData ? zephService.login(loginData) : Promise.reject(),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "New OTP has been sent to your email");
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    },
  });

  function handleSubmit(data: OtpFormData) {
    if (!requiresOtp) {
      const { email, password } = data;
      setLoginData({ email, password });
      initiateLogin({ email, password });
    } else {
      verifyLogin({
        email: data.email,
        password: data.password,
        otp: data.otp,
      });
    }
  }

  function handleResendVerification() {
    const email = form.getValues("email");
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    
    router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        {isUnverified ? (
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-destructive">
                Email Not Verified
              </h1>
              <p className="text-sm text-muted-foreground">
                Please verify your email before logging in
              </p>
            </div>
            <Button
              onClick={handleResendVerification}
              className="w-full"
              variant="outline"
            >
              Go to Verification Page
            </Button>
            <div className="text-center">
              <Button
                onClick={() => setIsUnverified(false)}
                variant="link"
                className="text-sm hover:underline"
              >
                Try different account
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                {requiresOtp
                  ? "Enter the verification code sent to your email"
                  : "Enter your credentials to access your account"}
              </p>
            </div>

            <FormBase form={form} onSubmit={handleSubmit} className="space-y-4">
              <FormField form={form} name="email" label="Email" showMessage>
                <CustomInput
                  variant="input"
                  placeholder="Enter your email"
                  disabled={isInitiating || isVerifying || requiresOtp}
                />
              </FormField>

              <FormField form={form} name="password" label="Password" showMessage>
                <CustomInput
                  variant="password"
                  placeholder="Enter your password"
                  disabled={isInitiating || isVerifying || requiresOtp}
                />
              </FormField>

              {requiresOtp && (
                <FormField form={form} name="otp" label="Verification Code" showMessage>
                  <CustomInput
                    variant="input"
                    placeholder="Enter verification code"
                    disabled={isVerifying}
                  />
                </FormField>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isInitiating || isVerifying}
              >
                {isInitiating || isVerifying
                  ? requiresOtp
                    ? "Verifying..."
                    : "Signing in..."
                  : requiresOtp
                  ? "Verify"
                  : "Sign in"}
              </Button>

              {requiresOtp && (
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Didn't receive the code?{" "}
                  </span>
                  <button
                    onClick={() => resendOtp()}
                    disabled={isResending}
                    className="text-primary hover:underline font-medium disabled:opacity-50"
                    type="button"
                  >
                    {isResending ? "Sending..." : "Resend Code"}
                  </button>
                </div>
              )}

              <div className="flex justify-between text-sm gap-4 flex-wrap">
               
                <Link
                  href="/auth/forgot-password"
                  className="text-primary hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
                <div>
                  <span className="text-muted-foreground">
                    Don't have an account?{" "}
                  </span>
                  <Link
                    href="/auth/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </FormBase>
          </>
        )}
      </div>
    </div>
  );
}
