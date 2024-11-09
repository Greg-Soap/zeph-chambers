"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/customs/custom-form";
import { CustomInput } from "@/components/customs/custom-input";
import { toast } from "sonner";
import { useAppStore } from "@/store/use-app-store";
import zephService from "@/services/zeph.service";
import Link from "next/link";

const otpSchema = z.object({
  otp: z.string().min(4, "OTP must be at least 4 characters"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { setUser } = useAppStore();

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: verifyOtp, isPending } = useMutation({
    mutationFn: (data: OtpFormData) => zephService.verifyOtp(email || "", data.otp),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "OTP verification successful!");
      localStorage.setItem("zephToken", data?.data?.token);
      setUser(data?.data?.user);
      router.push("/dashboard");
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "OTP verification failed");
    },
  });

  const { mutate: resendOtp, isPending: isResendingOtp } = useMutation({
    mutationFn: () => zephService.resendVerificationOtp(email || ""),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "OTP resent successfully!");
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    },
  });

  function handleSubmit(data: OtpFormData) {
    if (!email) {
      toast.error("Email is required for verification");
      return;
    }
    verifyOtp(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Verify OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the OTP sent to your email
          </p>
        </div>

        <FormBase form={form} onSubmit={handleSubmit} className="space-y-4">
          <FormField form={form} name="otp" label="OTP" showMessage>
            <CustomInput
              variant="input"
              placeholder="Enter OTP"
              disabled={isPending}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Didn't receive the code?{" "}
            </span>
            <Button
              type="button"
              variant="link"
              onClick={() => resendOtp()}
              disabled={isResendingOtp}
            >
              {isResendingOtp ? "Resending..." : "Resend OTP"}
            </Button>
          </div>
        </FormBase>
      </div>
    </div>
  );
}