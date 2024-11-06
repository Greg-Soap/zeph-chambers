import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/customs/custom-form";
import { CustomInput } from "@/components/customs/custom-input";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAppStore } from "@/store/use-app-store";
import { useMutation } from "@tanstack/react-query";
import zephService from "@/services/zeph.service";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAppStore();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register, isPending } = useMutation({
    mutationFn: zephService.register,
    onSuccess: (data) => {
      toast.success("Registration successful!");
      localStorage.setItem("zephToken", data?.data?.token);
      setUser(data?.data?.user);
      navigate("/login");
    },
    onError: (error) => {
      //@ts-expect-error wrong type
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  function handleSubmit(data: RegisterFormData) {
    register(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>

        <FormBase form={form} onSubmit={handleSubmit} className="space-y-4">
          <FormField form={form} name="name" label="Full Name" showMessage>
            <CustomInput
              variant="input"
              placeholder="Enter your full name"
              disabled={isPending}
            />
          </FormField>

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
              placeholder="Create a password"
              disabled={isPending}
            />
          </FormField>

          <FormField
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            showMessage
          >
            <CustomInput
              variant="password"
              placeholder="Confirm your password"
              disabled={isPending}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </FormBase>
      </div>
    </div>
  );
}
