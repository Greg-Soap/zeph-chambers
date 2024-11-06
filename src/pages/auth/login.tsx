import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/customs/custom-form";
import { CustomInput } from "@/components/customs/custom-input";
import { toast } from "sonner";
import { useAppStore } from "@/store/use-app-store";
import zephService from "@/services/zeph.service";
import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAppStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: zephService.login,
    onSuccess: (data) => {
      toast.success("Login successful!");
      localStorage.setItem("zephToken", data?.data?.token);
      setUser(data?.data?.user);
      navigate("/");
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  function handleSubmit(data: LoginFormData) {
    login(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <FormBase form={form} onSubmit={handleSubmit} className="space-y-4">
          <FormField form={form} name="email" label="Email" showMessage>
            <CustomInput
              variant="input"
              placeholder="Enter your email"
              disabled={isPending}
            />
          </FormField>

          <FormField form={form} name="password" label="Password" showMessage>
            <CustomInput
              variant="password"
              placeholder="Enter your password"
              disabled={isPending}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </FormBase>
      </div>
    </div>
  );
}
