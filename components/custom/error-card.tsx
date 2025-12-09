import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { XCircle } from "lucide-react";
import RefreshButton from "./RefreshButton";

interface Props {
  title?: string;
  description?: string;
}

export default function ErrorCard({
  title = "Error",
  description = "Failed to load data.",
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="text-sm text-red-500 items-center gap-1">
            <XCircle className="size-4" />
            {title}
          </span>
        </CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <RefreshButton />
      </CardFooter>
    </Card>
  );
}
