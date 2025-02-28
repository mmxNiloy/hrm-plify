"use client";
import React, { useRef } from "react";
import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";
// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const pathname = usePathname();

  const navbarContainer = useRef(null);

  const loginButtonRef: React.Ref<HTMLButtonElement> = useRef(null); // Add ref for login button

  useGSAP(
    () => {
      const button = loginButtonRef.current;
      if (button == null) return;

      // Initial state
      gsap.set(button, {
        background: "linear-gradient(to top, #3b82f6 0%, transparent 0%)",
        color: "inherit",
      });

      // Animation timeline
      const tl = gsap
        .timeline({ paused: true })
        .to(button, {
          background: "linear-gradient(to top, #3b82f6 100%, #3b82f6 100%)",
          duration: 0.25,
          ease: "power2.inOut",
        })
        .to(
          button,
          {
            color: "#ffffff",
            duration: 0.2,
            ease: "power2.inOut",
          },
          0
        ); // Start text color change at the same time

      // Event listeners
      button.addEventListener("mouseenter", () => tl.play());
      button.addEventListener("mouseleave", () => tl.reverse());

      // Cleanup
      return () => {
        button.removeEventListener("mouseenter", () => tl.play());
        button.removeEventListener("mouseleave", () => tl.reverse());
      };
    },
    { scope: navbarContainer }
  );

  // Scroll animation for navbar
  useGSAP(() => {
    const navbar = navbarContainer.current;
    if (!navbar) return;

    // Set initial state explicitly
    gsap.set(navbar, {
      width: "83.333333%", // Matches w-10/12 (10/12 = 83.333333%)
      borderBottomLeftRadius: "2rem",
      borderBottomRightRadius: "2rem",
      backgroundColor: "rgba(255, 255, 255, 0.6)", // Matches your bg-background/95 with backdrop-blur
    });

    gsap.to(navbar, {
      width: "100%",
      borderBottomLeftRadius: "0rem",
      borderBottomRightRadius: "0rem",
      backgroundColor: "#ffffff", // Solid white when scrolled (adjust color as needed)
      duration: 0.25,
      ease: "",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "200px top",
        scrub: 0.5, // Slightly faster scrub for smoother feel
        immediateRender: true,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className="sticky top-0 z-40 w-full flex items-center justify-center">
      <div
        ref={navbarContainer}
        className="hidden lg:flex h-28 w-10/12 py-8 items-end justify-center gap-4 lg:gap-8 px-6 md:px-8 lg:px-16 sm:space-x-0 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 drop-shadow-xl shadow-xl rounded-b-[2rem]"
      >
        <NavLogo logoSize="lg" />

        <NavMenu />

        {/* Empty gap */}
        <span className="flex-grow" />

        {/* Book a demo link */}
        <div className="flex gap-2">
          <Link href={"/book-demo"} passHref>
            <Button className="rounded-lg w-32 from-[#bd1cc2] to-[#f5561c] transition-colors hover:from-[#e528ec] hover:to-[#f36936] bg-gradient-to-r px-6 font-semibold">
              Book a Demo
            </Button>
          </Link>

          {/* Login Link */}
          <Link href={"/login"} passHref>
            <Button
              ref={loginButtonRef}
              variant={"ghost"}
              className="rounded-lg w-32 font-semibold"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex lg:hidden w-full h-14 items-center justify-between gap-2 md:gap-4 lg:gap-8 px-6 md:px-8 lg:px-16 sm:space-x-0 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 drop-shadow-xl shadow-xl">
        <NavLogo />

        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Icons.menu />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="top-0 right-0 md:left-auto h-screen mt-0 rounded-none max-w-screen-sm">
            <DrawerClose className="absolute top-2 right-2" asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="[&_svg]:size-4 size-6"
              >
                <Icons.cross className="size-4" />
              </Button>
            </DrawerClose>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription className="sr-only">
                Revolo HR | Navigation Menu
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col flex-grow gap-2 px-8 py-2">
              <NavMenu />
              <span className="flex-grow" />
              <div className="flex flex-col gap-2">
                <Link href={"/book-demo"} passHref>
                  <Button className="rounded-lg w-full from-[#bd1cc2] to-[#f5561c] transition-colors hover:from-[#e528ec] hover:to-[#f36936] bg-gradient-to-r px-6 font-semibold">
                    Book a Demo
                  </Button>
                </Link>

                {/* Login Link */}
                <Link href={"/login"} passHref>
                  <Button
                    variant={"outline"}
                    className="rounded-lg w-full font-semibold"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
