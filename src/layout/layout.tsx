"use client";

import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/ui/box-reveal";
import colors from "@/lib/custom-colors";
import Footer from "./footer";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10">
          <div className="relative w-full h-full">
            <img
              src="/assets/heroImage.png"
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
        </div>
        <div className="container mx-auto flex flex-col justify-center items-center gap-10 min-h-screen">
          <BoxReveal boxColor={colors.primary.DEFAULT} duration={0.9}>
            <img
              src="/assets/logo.svg"
              alt="logohere"
              className="w-[120px] h-[120px]"
            />
          </BoxReveal>

          <div className="flex flex-col items-center justify-center gap-4">
            <BoxReveal boxColor={colors.primary.DEFAULT} duration={1.2}>
              <h1 className="text-4xl sm:text-6xl font-bold text-white font-heading tracking-widest text-center">
                A.N ZEPH & ASSOCIATES
              </h1>
            </BoxReveal>

            <BoxReveal boxColor={colors.primary.DEFAULT} duration={1.5}>
              <p className="text-xl sm:text-2xl text-center text-accent">
                Real Estate Consultants, Solicitors and Advocates
              </p>
            </BoxReveal>
          </div>
          <BoxReveal boxColor={colors.primary.DEFAULT} duration={1.8}>
            <Button size="lg">
              <Link href="/auth/login">Get Started</Link>
            </Button>
          </BoxReveal>
        </div>
      </div>
      <main className="flex-grow container px-4 mx-auto relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
