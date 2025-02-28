"use server";
import Icons from "@/components/ui/icons";
import CompanyCarousel from "@/components/custom/CompanyCarousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IFeatureItem {
  title: string;
  description: string;
}

export default async function Home() {
  // For what makes us different section
  const ourSpecialties: IFeatureItem[] = [
    {
      title: "Avoid Costly Civil Penalties",
      description:
        "Our software ensures thorough right-to-work checks, safeguarding your company from illegal working penalties.",
    },
    {
      title: "Prevent Sponsorship License Revocation/Suspension",
      description:
        "Stay ahead of Home Office regulations with our automated compliance tools, minimizing the risk of license downgrades, suspensions, or revocations.",
    },
    {
      title: "Eliminate Business Sanctions",
      description:
        "Maintain a spotless compliance record and avoid being banned from sponsoring migrant workers with our proactive monitoring and reporting features.",
    },
    {
      title: "One Software, Complete UK Home Office Compliance",
      description:
        "Don't leave your business vulnerable. Our all-in-one HR software provides the tools and insights you need to confidently navigate the complexities of UK immigration and employment law.",
    },
  ];

  const ourFeatures: IFeatureItem[] = [
    { title: "Compliance & Document Management", description: "" },
    { title: "Absence & Leave Management", description: "" },
    { title: "Centralised Employee Database", description: "" },
    { title: "Employee Self-Service & HR Efficiency", description: "" },
    { title: "Effortless Onboarding & Offboarding", description: "" },
    { title: "Powerful Reporting & Analytics", description: "" },
    { title: "Sponsorship Tracking", description: "" },
    { title: "Rota and Holiday Managment", description: "" },
    { title: "Right to Work Checks", description: "" },
  ];
  return (
    //! New landing Page
    //#region New Landing P
    <main className="flex flex-col gap-4 md:gap-8 min-h-screen items-center py-6 md:py-8 lg:-mt-[8rem]">
      {/* Section 1: Control & Compliance */}
      <section className="w-11/12 flex justify-center min-h-screen overflow-clip rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative lg:pt-40">
        {/* Background circle decors */}
        <div className="absolute -left-[6.25%] -top-1/2 lg:-top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="absolute -right-[6.25%] top-1/2 lg:top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />

        {/* Section content */}
        <div className="flex flex-col gap-4 items-center justify-center self-center pb-8">
          <p className="text-2xl md:text-4xl lg:text-7xl font-extrabold">
            Control Compliance, Stress Less
          </p>
          <p className="text-center font-semibold text-sm md:text-base lg:text-xl">
            The HR software that helps you manage, develop, and retain
            <br />
            your most valuable asset: your people.
          </p>

          <Link href={"/book-demo"} passHref>
            <Button className="text-lg rounded-lg w-32 from-[#bd1cc2] to-[#f5561c] transition-colors hover:from-[#e528ec] hover:to-[#f36936] bg-gradient-to-r px-6 font-semibold">
              Join Us
            </Button>
          </Link>

          <Image
            unoptimized
            src={"/landing-page/img-1.png"}
            width={0}
            height={0}
            className="rounded-[2rem] bg-white border border-muted-foreground/60 w-3/5 lg:w-3/5 object-contain object-center px-4"
            alt={"System Showcase #1"}
          />
        </div>
      </section>

      {/* Section 2: Client Trust(count) and Client Showcase */}
      <section className="flex flex-col gap-4">
        <p className="mt-16 text-xl md:text-3xl lg:text-6xl font-semibold text-center">
          Trusted by <b className="font-extrabold">500+</b> Organizations
        </p>
        <div className="w-full lg:container py-2">
          <CompanyCarousel />
        </div>
      </section>

      {/* Section 3: Our Specialties */}
      <section className="w-full py-8 md:py-16 flex flex-col gap-8 items-center justify-center from-[#e51cd8]/[0.051] to-[#635be8]/[0.051] bg-gradient-to-br">
        <p className="text-xl md:text-3xl lg:text-6xl font-semibold bg-clip-text text-transparent from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br">
          What makes us different?
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-11/12 items-center justify-center">
          {/* Image preview */}
          <Image
            unoptimized
            src={"/landing-page/img-2.png"}
            width={0}
            height={0}
            className="rounded-[2rem] bg-white border border-muted-foreground/60 w-full object-contain object-center px-4"
            alt={"System Showcase #2"}
          />
          {/* <div className="rounded-[2rem] bg-[#f5f9ff] border border-muted-foreground/60 w-full aspect-video"></div> */}

          {/* List of specialties */}
          <ul className="flex flex-col gap-4">
            {ourSpecialties.map((spec, index) => (
              <li
                key={`our-spec-list-item-${index}`}
                className="from-[#bd1cc2]/[0.051] to-[#f5561c]/[0.15] bg-gradient-to-r rounded-xl px-8 py-2"
              >
                {/* Title */}
                <p className="flex gap-1 font-extrabold lg:text-lg items-center">
                  <Icons.siteSparkle /> {spec.title}
                </p>
                {/* Description */}
                <p className="text-sm md:text-base pl-6">{spec.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 4: Our Features */}
      <>
        {/* Section title */}
        <div className="flex flex-col gap-0.5">
          <p className="text-xl md:text-3xl lg:text-6xl font-semibold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br">
            Features
          </p>
          <span className="h-1 rounded-full w-full from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
        </div>
        <section className="w-11/12 rounded-[3.25rem] py-8 md:py-16 flex flex-col gap-8 items-center justify-center from-[#017bce]/[0.051] to-[#019e8f]/[0.051] bg-gradient-to-r">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-11/12 items-center justify-center">
            {/* Image preview */}
            <div className="rounded-[2rem] bg-[#f5f9ff] border border-muted-foreground/60 w-full aspect-video"></div>

            {/* Grid of features */}
            <div className="grid grid-cols-3 gap-4">
              {/* Feature Card */}
              {ourFeatures.map((feat, index) => (
                <div
                  key={`our-features-grid-item-${index}`}
                  className="flex flex-col items-center justify-center gap-2 min-h-16 text-balance text-center from-[#bd1cc2] to-[#f5561c] bg-gradient-to-r px-4 py-2 rounded-lg text-white"
                >
                  <p className="font-extrabold lg:text-lg">{feat.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    </main>
    //#endregion
  );
}
