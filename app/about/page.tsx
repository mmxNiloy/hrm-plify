import React from "react";

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-4 md:gap-8 min-h-screen items-center py-6 md:py-8 lg:-mt-[8rem]">
      <section className="w-11/12 flex items-center justify-center min-h-screen overflow-clip rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative lg:pt-40">
        {/* Background circle decors */}
        <div className="absolute -left-[6.25%] -top-1/2 lg:-top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="absolute -right-[6.25%] top-1/2 lg:top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />

        {/* Section content */}
        <div className="flex flex-col gap-4 items-center justify-center self-center lg:pb-8 px-16">
          <div className="flex flex-col gap-0.5">
            <p className="text-2xl md:text-4xl lg:text-7xl font-extrabold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br">
              About Us
            </p>
            <span className="h-1 rounded-full w-full from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
          </div>
          <p className="font-semibold text-sm md:text-base lg:text-xl lg:w-1/2 text-justify">
            At RevoloHR, we make HR compliance simple and efficient for
            businesses of all sizes. Our software is designed to streamline HR
            operations, reduce compliance risks, and ensure that companies meet
            UK Home Office regulations with ease. From managing employee records
            to tracking sponsorships, we provide businesses with the tools they
            need to stay compliant—without the administrative hassle.
          </p>
        </div>
      </section>
    </main>
  );
}
