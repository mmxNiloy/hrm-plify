import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-1 container mt-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">About Us</p>
          <span className="h-0.5 w-10 bg-[#ed1c24]" />

          {Array.from({ length: 5 }, (_, idx) => idx).map((item) => (
            <Button
              variant={"link"}
              key={`about-us-link-${item}`}
              className="w-min text-muted-foreground"
            >
              Example Link {item + 1}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">Learn More</p>
          <span className="h-0.5 w-10 bg-[#ed1c24]" />

          {Array.from({ length: 5 }, (_, idx) => idx).map((item) => (
            <Button
              variant={"link"}
              key={`learn-more-link-${item}`}
              className="w-min text-muted-foreground"
            >
              Example Link {item + 1}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">Policies</p>
          <span className="h-0.5 w-10 bg-[#ed1c24]" />

          {Array.from({ length: 5 }, (_, idx) => idx).map((item) => (
            <Button
              variant={"link"}
              key={`policies-link-${item}`}
              className="w-min text-muted-foreground"
            >
              Example Link {item + 1}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">Contact Us</p>
          <span className="h-0.5 w-10 bg-[#ed1c24]" />

          {Array.from({ length: 5 }, (_, idx) => idx).map((item) => (
            <Button
              variant={"link"}
              key={`contact-us-${item}`}
              className="w-min text-muted-foreground"
            >
              Example Link {item + 1}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 rounded-full bg-[#ed1c24] px-8 py-6 text-white">
        <p>Alrights reserved yada yada</p>

        <div className="flex flex-row gap-4">
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <Icons.twitter />
          </Button>
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <Icons.fb />
          </Button>
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <Icons.linkedin />
          </Button>
        </div>
      </div>

      <p className="my-8 text-center">
        Made with ❤ by
        <Link
          passHref
          href="https://www.linkedin.com/in/ashirbad-sarkar-niloy/"
          target="_blank"
        >
          <Button variant={"link"} size="sm">
            @mmxNiloy
          </Button>
        </Link>
      </p>
    </footer>
  );
}
