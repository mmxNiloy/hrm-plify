"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/custom/Navbar/Navbar";
import RegistrationForm from "@/components/custom/Form/Auth/RegistrationForm";
import Footer from "@/components/custom/Footer";

export default function RegisterPage() {
  return (
    <main className="bg-[url('/bg-white-yellow-shapes.jpg')] bg-no-repeat bg-center bg-cover min-h-screen">
      <Navbar />
      <div className="gap-4 grid grid-cols-2 px-16 py-8">
        <div>TODO: Panel 1: Screen shots and features goes here.</div>
        <Card className="bg-accent/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Icons.key className="rotate-90" /> Sign-up
            </CardTitle>
            <CardDescription>
              Sign-up to HRMplify and get started today!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegistrationForm />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p>Already have an account?</p>

            <Link href={"/"} passHref className="w-full">
              <Button
                type="button"
                size="sm"
                className="w-full rounded-full bg-blue-500 hover:bg-blue-400 gap-2"
              >
                <Icons.login /> Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Footer />
    </main>
  );
}
