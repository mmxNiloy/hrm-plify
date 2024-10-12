import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Icons from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";
import React from "react";

export default function NavMenu() {
  return (
    <div className="flex gap-1">
      <NavigationMenu viewportClassName="rounded-2xl">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-muted/50 rounded-2xl">
              {/* <div className="flex gap-4 px-8 py-6">
                <ul className="*:cursor-pointer grid grid-cols-1 w-64">
                  <ListItem
                    title="Employee & HR Management"
                    items={[
                      "Employee Management",
                      "Recruitment",
                      "Leave Management",
                      "Attendance Tracking",
                      "Payroll",
                    ]}
                  />

                  <ListItem
                    title="Administrative Tools"
                    items={[
                      "Settings",
                      "User Access",
                      "Document Management",
                      "Billing",
                    ]}
                  />

                  <ListItem
                    title="Planning & Compliance"
                    items={[
                      "Organogram Chart",
                      "Rota Scheduling",
                      "Sponsor Compliance",
                      "Task Management",
                    ]}
                  />
                </ul>
              </div> */}
              <div className="grid grid-cols-3 min-w-[900px] gap-4 p-2">
                <ListCard
                  title="Employee & HR Management"
                  description="We provide a wide range of Employee and HR management
                      solutions tailored to your needs. Our solutions include:"
                  items={[
                    { icon: Icons.users, title: "Employee Management" },
                    { icon: Icons.userSearch, title: "Recruitment" },
                    { icon: Icons.logout, title: "Leave Management" },
                    { icon: Icons.todo, title: "Attendance Tracking" },
                    { icon: Icons.receipt, title: "Receipt" },
                  ]}
                />

                <ListCard
                  title="Administrative Tools"
                  description="Administering and controlling your organization is a breeze with HRMplfy."
                  items={[
                    { title: "Settings", icon: Icons.settings },
                    { title: "User Access", icon: Icons.userCog },
                    { title: "Document Management", icon: Icons.files },
                    { title: "Billing", icon: Icons.money },
                  ]}
                />

                <ListCard
                  title="Planning & Compliance"
                  description="Plan ahead and stay up-to-code with the law."
                  items={[
                    { title: "Organogram Chart", icon: Icons.chart },
                    { title: "Rota Scheduling", icon: Icons.list },
                    { title: "Sponsor Compliance", icon: Icons.file },
                    { title: "Task Management", icon: Icons.calendar },
                  ]}
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button variant={"link"} className="hover:bg-muted/60">
                Plans
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            {/* <span className="w-32" /> */}
            <NavigationMenuContent>
              <div className="grid grid-cols-2 gap-2 px-8 py-6 w-96">
                <NavigationMenuLink asChild>
                  <Button
                    variant={"link"}
                    className="justify-start hover:bg-muted/60"
                  >
                    About Us
                  </Button>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Button
                    variant={"link"}
                    className="justify-start hover:bg-muted/60"
                  >
                    Executive Profiles
                  </Button>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Button
                    variant={"link"}
                    className="justify-start hover:bg-muted/60"
                  >
                    Press Releases
                  </Button>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Button
                    variant={"link"}
                    className="justify-start hover:bg-muted/60"
                  >
                    News Articles
                  </Button>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Button
                    variant={"link"}
                    className="justify-start hover:bg-muted/60"
                  >
                    Careers
                  </Button>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button variant={"link"} className="hover:bg-muted/60">
                Resources
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({ title, items }: { title: string; items: string[] }) {
  return (
    <li>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Button
            variant="link"
            className="w-full items-center justify-between hover:bg-muted/60"
          >
            {title} <Icons.chevronRight className="size-4" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent
          side="right"
          sideOffset={32}
          align="start"
          className="px-8 py-6"
        >
          <ol className="grid grid-cols-1 gap-2">
            {items.map((item) => (
              <li key={`${title}-${item}`}>
                <Button variant={"link"}>{item}</Button>
              </li>
            ))}
          </ol>
        </HoverCardContent>
      </HoverCard>
    </li>
  );
}

function ListCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: { title: string; icon: LucideIcon }[];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-background p-4">
      <div className="text-pretty">
        {/* Card title */}
        <p className="text-muted-foreground font-bold">{title}</p>
        <p className="text-xs">{description}</p>
      </div>

      {/* Card content */}
      <div className="grid grid-cols-2 text-xs font-bold gap-2 *:flex *:gap-1">
        {items.map((item) => (
          <p
            className="hover:text-blue-500 hover:underline cursor-pointer"
            key={`${title}-${item.title}`}
          >
            <item.icon className="size-4" /> {item.title}
          </p>
        ))}
      </div>
    </div>
  );
}
