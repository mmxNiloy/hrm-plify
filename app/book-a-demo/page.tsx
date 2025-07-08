"use client";

import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ButtonGradient } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import React, { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/custom/AnimatedText";
import { useToast } from "@/components/ui/use-toast";
import { createContactRequest } from "../(server)/actions/createContactRequest";
import { ToastSuccess } from "@/styles/toast.tailwind";
import SiteConfig from "@/utils/SiteConfig";

gsap.registerPlugin(ScrollTrigger);

export default function BookADemoPage() {
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

  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      setLoading(true);

      const [first_name, last_name, email, contact_num] = [
        fd.get("first_name") as string,
        fd.get("last_name") as string,
        fd.get("email") as string,
        fd.get("contact_num") as string,
      ];

      const result = await createContactRequest({
        first_name,
        last_name,
        email,
        contact_num,
        is_demo_call: true,
      });

      if (result.error) {
        toast({
          title: "Request Failed.",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sent!",
          description:
            "We've received your request. We'll contact you with a demo.",
          className: ToastSuccess,
        });
      }

      setLoading(false);
    },
    [toast]
  );

  return (
    <main
      ref={container}
      className="flex flex-col gap-4 md:gap-8 min-h-screen items-center py-6 md:py-8 lg:-mt-[8rem]"
    >
      <section className="w-11/12 flex items-center justify-center min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] overflow-clip rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative lg:pt-20">
        <div className="absolute -left-[6.25%] -top-1/2 lg:-top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="absolute -right-[6.25%] top-1/2 lg:top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center self-center lg:pb-8 px-4 sm:px-8 md:px-16">
          <p className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold heading text-center">
            <AnimatedText>See It in Action - Book Your Demo Today</AnimatedText>
          </p>
          <p className="text-center font-semibold text-xs sm:text-sm md:text-base lg:text-xl subheader opacity-0 translate-y-5">
            Get a front-row seat to how {SiteConfig.appName} transforms your
            work.
          </p>
        </div>
      </section>

      {/* Contact us form */}
      <section className="form-section w-10/12 px-4 sm:px-6 4xl:container z-10 -mt-[15%] lg:-mt-[10%] flex items-center bg-slate-50 justify-center min-h-full overflow-clip rounded-[1.5rem] sm:rounded-[3.25rem] py-4 sm:py-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 w-full xl:*:*:text-lg"
        >
          <div className="form-input flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label className={RequiredAsterisk}>First Name</Label>
            <Input
              required
              placeholder="eg: Joy"
              name="first_name"
              className="h-12 sm:h-14 xl:h-16 px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          <div className="form-input flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label className={RequiredAsterisk}>Last Name</Label>
            <Input
              required
              placeholder="eg: Baroi"
              name="last_name"
              className="h-12 sm:h-14 xl:h-16 px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          <div className="form-input flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label className={RequiredAsterisk}>Email</Label>
            <Input
              required
              type="email"
              placeholder="example@example.com"
              name="email"
              className="h-12 sm:h-14 xl:h-16 px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          <div className="form-input flex flex-col gap-2 opacity-0 translate-y-[50px]">
            <Label>Contact Number</Label>
            <Input
              type="tel"
              placeholder="+88 01xxxx-yyyyy"
              name="contact_num"
              className="h-12 sm:h-14 xl:h-16 px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
            />
          </div>

          {/* <div className="form-input col-span-full flex flex-col gap-2 opacity-0 translate-y-[50px]">
                <Label className={RequiredAsterisk}>Your Message</Label>
                <Textarea
                  required
                  placeholder="What's on your mind?"
                  name="message"
                  rows={6}
                  className="resize-none px-4 rounded-xl drop-shadow-sm focus:drop-shadow-lg hover:drop-shadow-lg"
                />
              </div> */}

          <div className="submit-button col-span-full flex items-start opacity-0 scale-90">
            <Button className={ButtonGradient} disabled={loading}>
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : (
                <Icons.send />
              )}{" "}
              Submit
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
