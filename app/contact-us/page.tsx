"use client";

import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ButtonBlue } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/custom/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUsPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate subheader
      gsap.fromTo(
        ".subheader",
        { opacity: 0, y: 20 }, // Initial state
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5, // Slight delay after title
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".subheader",
            start: "top 90%",
          },
        }
      );

      // Animate form inputs
      const inputs = gsap.utils.toArray(".form-input");
      gsap.fromTo(
        inputs,
        { y: 50, opacity: 0 }, // Initial state
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".form-section",
            start: "top 80%",
          },
        }
      );

      // Animate button
      gsap.fromTo(
        ".submit-button",
        { opacity: 0, scale: 0.9 }, // Initial state
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.8, // Appears after inputs
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".form-section",
            start: "top 80%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <main
      ref={container}
      className="flex flex-col gap-4 md:gap-8 min-h-screen items-center py-6 md:py-8 lg:-mt-[8rem]"
    >
      <section className="w-11/12 flex items-center justify-center min-h-[60vh] overflow-clip rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative lg:pt-40">
        <div className="absolute -left-[6.25%] -top-1/2 lg:-top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="absolute -right-[6.25%] top-1/2 lg:top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="flex flex-col gap-4 items-center justify-center self-center lg:pb-8 px-16">
          <p className="text-2xl md:text-4xl lg:text-7xl font-bold heading">
            <AnimatedText>Any queries? Just contact us.</AnimatedText>
          </p>
          <p className="text-center font-semibold text-sm md:text-base lg:text-xl subheader opacity-0 translate-y-5">
            Want to drop us a line, ask a question or need help? We’d love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Contact us form */}
      <section className="form-section w-10/12 px-6 4xl:container z-10 -mt-[7.5%] flex items-center bg-slate-50 justify-center min-h-full overflow-clip rounded-[3.25rem] py-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full xl:*:*:text-lg">
          <div className="form-input flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label className={RequiredAsterisk}>First Name</Label>
            <Input
              required
              placeholder="John"
              name="first_name"
              className="h-14 xl:h-16 px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          <div className="form-input flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label className={RequiredAsterisk}>Last Name</Label>
            <Input
              required
              placeholder="Doe"
              name="last_name"
              className="h-14 xl:h-16 px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          <div className="form-input flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label className={RequiredAsterisk}>Email</Label>
            <Input
              required
              type="email"
              placeholder="example@example.com"
              name="email"
              className="h-14 xl:h-16 px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          <div className="form-input flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+4400 0000 0000"
              name="phone"
              className="h-14 xl:h-16 px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          <div className="form-input col-span-full flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label className={RequiredAsterisk}>Your Message</Label>
            <Textarea
              required
              placeholder="What's on your mind?"
              name="message"
              rows={8}
              className="resize-none px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          <div className="submit-button col-span-full flex items-start opacity-0 scale-90">
            <Button className={ButtonBlue} disabled type="button">
              <Icons.send /> Submit
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
