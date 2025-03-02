"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/custom/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

interface IValues {
  title: string;
  text: string;
}

export default function AboutPage() {
  const ourValues: IValues[] = [
    {
      title: "We SUPPORT",
      text: "We believe in standing by businesses. Our commitment is to empower companies by simplifying HR compliance, ensuring they focus on growth instead of stress.",
    },
    {
      title: "We ACT",
      text: "Regulations evolve, and so do we. Agile, proactive, and results-driven, we take decisive steps to help businesses stay ahead of compliance challenges efficiently.",
    },
    {
      title: "We INNOVATE",
      text: "Listening to our clients fuels our innovation. We continuously develop smarter, more intuitive HR solutions, making compliance easier, faster, and stress-free.",
    },
    {
      title: "We GUIDE",
      text: "We provide clear, actionable guidance, helping businesses navigate complex regulations with confidence and clarity.",
    },
    {
      title: "We LEAD WITH INTEGRITY",
      text: "Trust is at our core. We uphold transparency, accountability, and ethical responsibility, ensuring our clients receive the best possible support while adhering to the highest compliance standards.",
    },
  ];

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate value cards
      const cards = gsap.utils.toArray(".value-card");
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 }, // Initial state
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-section",
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
      className="flex flex-col gap-8 md:gap-12 min-h-screen items-center py-6 md:py-8 lg:-mt-[8rem]"
    >
      {/* Our Story Section */}
      <section className="w-11/12 flex items-center justify-center min-h-[70vh] overflow-clip rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative lg:pt-20">
        <div className="absolute -left-[6.25%] -top-1/2 lg:-top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="absolute -right-[6.25%] top-1/2 lg:top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="flex flex-col gap-4 items-center justify-center self-center lg:pb-8 px-8 md:px-16">
          <div className="flex flex-col gap-0.5">
            <p className="section-title text-2xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br">
              {/* <AnimatedText> */}
              Our Story
              {/* </AnimatedText> */}
            </p>
            <span className="h-1 rounded-full w-full from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
          </div>
          <p className="font-semibold text-sm md:text-base lg:text-lg lg:w-2/3 text-justify">
            {/* <AnimatedText> */}
            At RevoloHR, we saw a major problem—businesses struggling with
            compliance-related challenges, facing stress, fines, and even losing
            their ability to sponsor skilled workers due to complex Home Office
            regulations. We knew there had to be a better way. That&apos;s why
            we created RevoloHR a powerful, user-friendly HR software designed
            to take the hassle out of compliance. Our mission is simple: to help
            businesses navigate sponsorship and HR regulations effortlessly,
            reducing risks and ensuring they stay fully compliant. With
            RevoloHR, companies can manage their HR processes with confidence,
            knowing they have the right tools to protect their workforce and
            their business. Join us in making compliance simple, stress-free,
            and efficient.
            {/* </AnimatedText> */}
          </p>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="w-11/12 flex items-center justify-center min-h-[50vh] rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative">
        <div className="flex flex-col gap-4 items-center justify-center px-8 md:px-16">
          <div className="flex flex-col gap-0.5">
            <p className="section-title text-2xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br">
              {/* <AnimatedText> */}
              How We Help
              {/* </AnimatedText> */}
            </p>
            <span className="h-1 rounded-full w-full from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
          </div>
          <p className="font-semibold text-sm md:text-base lg:text-lg lg:w-2/3 text-justify">
            {/* <AnimatedText> */}
            At RevoloHR, we make HR compliance simple and efficient for
            businesses of all sizes. Our software is designed to streamline HR
            operations, reduce compliance risks, and ensure that companies meet
            UK Home Office regulations with ease. From managing employee records
            to tracking sponsorships, we provide businesses with the tools they
            need to stay compliant—without the administrative hassle.
            {/* </AnimatedText> */}
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values-section w-11/12 flex flex-col items-center justify-center min-h-[70vh] rounded-[3.25rem] relative py-8">
        <div className="flex flex-col gap-0.5 mb-8">
          <p className="section-title text-2xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br">
            <AnimatedText>Our Values</AnimatedText>
          </p>
          <span className="h-1 rounded-full w-full from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
        </div>
        <div className="grid grid-cols-12 gap-6 lg:[&>*:nth-child(4)]:col-start-3 lg:[&>*:nth-child(5)]:col-start-7">
          {ourValues.map((value, index) => (
            <div
              key={index}
              className="value-card col-span-full md:col-span-6 lg:col-span-4 bg-amber-200/30 h-full p-6 rounded-xl backdrop-blur-sm flex flex-col gap-2 hover:bg-amber-300/50 cursor-pointer opacity-0 translate-y-[100px]"
            >
              <h3 className="text-lg md:text-xl font-bold text-[#e51cd8]">
                <AnimatedText>{value.title}</AnimatedText>
              </h3>
              <p className="text-sm md:text-base">
                <AnimatedText>{value.text}</AnimatedText>
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
