"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/customs/custom-form";
import { CustomInput } from "@/components/customs/custom-input";
import { toast } from "sonner";
import zephService from "@/services/zeph.service";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function ForgotPassword() {
  const router = useRouter();

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: sendOtp, isPending: isSendingOtp } = useMutation({
    mutationFn: (data: EmailFormData) => zephService.forgotPassword(data.email),
    onSuccess: (data, variables) => {
      toast.success(data?.data?.message || "Reset code sent to your email!");
      router.push(`/auth/reset-password?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Failed to send reset code");
    },
  });

  function handleEmailSubmit(data: EmailFormData) {
    sendOtp(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to receive a password reset code
          </p>
        </div>

        <FormBase form={emailForm} onSubmit={handleEmailSubmit} className="space-y-4">
          <FormField form={emailForm} name="email" label="Email" showMessage>
            <CustomInput
              variant="input"
              placeholder="Enter your email"
              disabled={isSendingOtp}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isSendingOtp}>
            {isSendingOtp ? "Sending Reset Code..." : "Send Reset Code"}
          </Button>

          <div className="text-center text-sm">
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Back to Login
            </Link>
          </div>
        </FormBase>
      </div>
    </div>
  );
}