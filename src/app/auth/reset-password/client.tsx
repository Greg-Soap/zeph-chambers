"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/customs/custom-form";
import { CustomInput } from "@/components/customs/custom-input";
import { toast } from "sonner";
import zephService from "@/services/zeph.service";

const resetPasswordSchema = z.object({
  otp: z.string().min(4, "OTP must be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      toast.error("Email is required for password reset");
      router.push("/auth/forgot-password");
    }
  }, [email, router]);

  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: (data: ResetPasswordFormData) =>
      zephService.changePassword({
        email: email || "",
        otp: data.otp,
        newPassword: data.password,
      }),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Password reset successfully!");
      router.push("/auth/login");
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Failed to reset password");
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: () => email ? zephService.forgotPassword(email) : Promise.reject(),
    onSuccess: () => {
      toast.success("New reset code has been sent to your email");
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Failed to resend reset code");
    },
  });

  function handleResetSubmit(data: ResetPasswordFormData) {
    if (!email) {
      toast.error("Email is required for password reset");
      return;
    }
    resetPassword(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter the reset code sent to<br />
            <span className="font-medium">{email}</span>
          </p>
        </div>

        <FormBase form={resetForm} onSubmit={handleResetSubmit} className="space-y-4">
          <FormField form={resetForm} name="otp" label="Reset Code" showMessage>
            <CustomInput
              variant="input"
              placeholder="Enter reset code"
              disabled={isResetting}
            />
          </FormField>

          <FormField form={resetForm} name="password" label="New Password" showMessage>
            <CustomInput
              variant="password"
              placeholder="Enter new password"
              disabled={isResetting}
            />
          </FormField>

          <FormField
            form={resetForm}
            name="confirmPassword"
            label="Confirm Password"
            showMessage
          >
            <CustomInput
              variant="password"
              placeholder="Confirm new password"
              disabled={isResetting}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isResetting}>
            {isResetting ? "Resetting Password..." : "Reset Password"}
          </Button>

          <div className="text-center text-sm space-y-2">
            <div>
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

            <div>
              <Link
                href="/auth/login"
                className="text-muted-foreground hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </FormBase>
      </div>
    </div>
  );
}