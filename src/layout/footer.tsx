"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-4 gap-8 py-10 sm:py-20 items-center">
          <div>
            <img
              className="bg-primary rounded-lg p-5 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] object-contain"
              src="/assets/logo.svg"
              alt="Company logo"
            />
          </div>

          <FooterSection title="Office hours">
            <p className="sm:text-lg text-sm  mt-2">Monday - Friday</p>
            <p className="sm:text-lg text-sm ">8am - 4pm</p>
          </FooterSection>

          <FooterSection title="Contact Us">
            <p className="sm:text-lg text-sm  mt-2">
              Phone Number: 123-456-7890
            </p>
            <p className="sm:text-lg text-sm ">Email: anzeph@gmail.com</p>
          </FooterSection>

          <FooterSection title="Social">
            <p className="sm:text-lg text-sm  mt-2">
              Phone Number: 123-456-7890
            </p>
          </FooterSection>
        </div>
        <div className="border-t mx-auto" />
        <p className="sm:text-lg text-sm  text-center py-8">
          © {currentYear} | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h2 className="text-primary-foreground text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
