"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonBlue, ButtonWarn } from "@/styles/button.tailwind";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SiteConfig from "@/utils/SiteConfig";
import { useToast } from "@/components/ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import requestOTP from "@/app/(server)/actions/requestOTP";
import resetPassword from "@/app/(server)/actions/resetPassword";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";

type TabType = "email-tab" | "otp-tab";

const emailSchema = z.object({
  email: z.string().email(),
});

const otpFormSchema = z.object({
  token: z.string().length(8),
  password: z.string().min(8),
});

export default function AccountRecoveryCard() {
  const [currentTab, setCurrentTab] = useState<TabType>("email-tab");
  const [cooldown, setCooldown] = useState<number>(0); // In Seconds
  const [loading, startAPICall] = useTransition();

  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      token: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const sendOTP = useCallback(() => {
    if (emailForm.getFieldState("email").error) {
      toast({
        title: "Invalid Email",
        variant: "destructive",
      });

      return;
    }

    if (cooldown > 0) {
      // Change the tab and don't call the API
      setCurrentTab("otp-tab");
      return;
    }

    startAPICall(async () => {
      const result = await requestOTP({ email: emailForm.getValues("email") });

      if (result.error) {
        toast({
          title: result.error.message,
          variant: "destructive",
        });

        return;
      }

      setCurrentTab("otp-tab");
      setCooldown(300); // Five minutes cooldown timer
    });
  }, [cooldown, emailForm, toast]);

  const handleBack = useCallback(() => {
    setCurrentTab("email-tab");
  }, []);

  const handleNext = useCallback(() => {
    sendOTP();
  }, [sendOTP]);

  const handleSubmit = useCallback(() => {
    if (otpForm.formState.errors.token) {
      toast({
        title: "Invalid OTP",
        description: otpForm.formState.errors.token.message,
        variant: "destructive",
      });
      return;
    }

    if (otpForm.formState.errors.password) {
      toast({
        title: "Invalid Password",
        description: otpForm.formState.errors.password.message,
        variant: "destructive",
      });
      return;
    }

    startAPICall(async () => {
      const result = await resetPassword({
        token: otpForm.getValues("token"),
        password: otpForm.getValues("password"),
      });

      if (result.error) {
        toast({
          title: "Update failed",
          description: result.error.message,
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Password changed!",
        description: "Please login again.",
        className: ToastSuccess,
      });

      router.replace("/login");
    });
  }, [otpForm, router, toast]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (cooldown > 0) {
      intervalRef.current = setInterval(() => {
        setCooldown((oldVal) => {
          if (oldVal <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }

          return oldVal - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cooldown]);

  return (
    <Card className="backdrop-blur-sm border-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl md:text-4xl font-bold">
          Account Recovery
        </CardTitle>
      </CardHeader>
      <CardContent className="w-72 sm:w-96 md:w-[32rem]">
        <Tabs value={currentTab} className="py-2">
          <TabsList className="hidden">
            <TabsTrigger value="email-tab">Email</TabsTrigger>
            <TabsTrigger value="otp-tab">OTP</TabsTrigger>
          </TabsList>

          <TabsContent value="email-tab">
            <Form {...emailForm}>
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        className="border-muted-foreground ring-1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please enter the email associated with your{" "}
                      {SiteConfig.appName} account
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </TabsContent>

          <TabsContent value="otp-tab">
            <Form {...otpForm}>
              <FormField
                control={otpForm.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter OTP</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between gap-2">
                        <InputOTP maxLength={8} {...field}>
                          <InputOTPGroup>
                            {Array.from({ length: 4 }, (_, index) => index).map(
                              (idx) => (
                                <InputOTPSlot
                                  className="border-muted-foreground ring-1"
                                  key={`otp-slot-${idx}`}
                                  index={idx}
                                />
                              )
                            )}
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            {Array.from(
                              { length: 4 },
                              (_, index) => 4 + index
                            ).map((idx) => (
                              <InputOTPSlot
                                className="border-muted-foreground ring-1"
                                key={`otp-slot-${idx}`}
                                index={idx}
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>

                        <Button
                          type="button"
                          disabled={cooldown > 0 || loading}
                          className={ButtonWarn}
                        >
                          <Icons.resend />
                          {cooldown > 0 ? `${cooldown} seconds` : "Resend"}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      We&apos;ve sent an OTP to your email (
                      {emailForm.getValues("email")}).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={otpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter a new password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New Password"
                        className="border-muted-foreground ring-1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a strong password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between">
          <Button
            disabled={currentTab === "email-tab" || loading}
            className="gap-1 rounded-full"
            variant={"outline"}
            size={"sm"}
            onClick={handleBack}
          >
            <Icons.chevronLeft />
            Back
          </Button>
          {currentTab === "email-tab" && (
            <Button
              disabled={loading}
              className={cn(ButtonBlue, "gap-1")}
              size="sm"
              onClick={handleNext}
            >
              Next
              <Icons.chevronRight />
            </Button>
          )}
          {currentTab === "otp-tab" && (
            <Button
              disabled={loading}
              className={cn(ButtonBlue, "gap-1")}
              size="sm"
              onClick={handleSubmit}
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : (
                <Icons.check />
              )}
              Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
