"use client";
import { Label } from "@/components/ui/label";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IRightToWork } from "@/schema/RightToWork";
import { IFormFragmentProps } from "@/utils/Types";
import {
  RTWListAOptions,
  RTWListBGroup1Options,
  RTWListBGroup2Options,
} from "@/utils/Misc";

export default function RTWPhysicalCheckTab({
  data,
  readOnly,
}: IFormFragmentProps<IRightToWork>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 col-span-full">
        <p className="text-xs">
          You may conduct a physical document check or perform an online check
          to establish a right to work. Where a right to work check has been
          conducted using the online service, the information is provided in
          real-time, directly from Home Office systems and there is no
          requirement to see the documents listed below.
        </p>
        <p className="text-blue-500">Step 1 for Physical Check</p>
        <p className="text-xs">
          You must <b>obtain original</b> documents from either <b>List A</b> or{" "}
          <b>List B</b> of acceptable documents for a manual right to work
          check.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="list-a"
        className="flex flex-col gap-2"
      >
        <AccordionItem value="list-a">
          <AccordionTrigger className="bg-sky-400 text-white px-4 py-2 rounded-md">
            List A
          </AccordionTrigger>
          <AccordionContent className="p-2">
            {RTWListAOptions.map((item, index) => (
              <div
                key={`list-a-option-${index}`}
                className="flex gap-4 *:text-xs items-center"
              >
                <Checkbox
                  disabled={readOnly}
                  id={`list-a-option-checkbox-${index}`}
                  name={`list_a_options_${index}`}
                  defaultChecked={
                    (data?.list_a_options.at(index) === "on" ? true : false) ||
                    (data?.list_a_options.at(0) !== "off" && index == 0)
                  }
                />
                <Label htmlFor={`list-a-option-checkbox-${index}`}>
                  {item}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="list-b">
          <AccordionTrigger className="bg-sky-400 text-white px-4 py-2 rounded-md">
            List B
          </AccordionTrigger>

          <AccordionContent className="p-2">
            <p className="text-base mb-2">Group 1</p>
            {RTWListBGroup1Options.map((item, index) => (
              <div
                key={`list-b_group_1-option-${index}`}
                className="flex gap-4 *:text-xs items-center"
              >
                <Checkbox
                  disabled={readOnly}
                  id={`list-b_group_1-option-checkbox-${index}`}
                  name={`list_b_group_1_options_${index}`}
                  defaultChecked={
                    (data?.list_b_group_1_options.at(index) === "on"
                      ? true
                      : false) ||
                    (data?.list_b_group_1_options.at(0) !== "off" && index == 0)
                  }
                />
                <Label htmlFor={`list-b_group_1-option-checkbox-${index}`}>
                  {item}
                </Label>
              </div>
            ))}

            <p className="text-base my-2">Group 2</p>
            {RTWListBGroup2Options.map((item, index) => (
              <div
                key={`list-b_group_2-option-${index}`}
                className="flex gap-4 *:text-xs items-center"
              >
                <Checkbox
                  disabled={readOnly}
                  id={`list-b_group_2-option-checkbox-${index}`}
                  name={`list_b_group_2_options_${index}`}
                  defaultChecked={
                    (data?.list_b_group_2_options.at(index) === "on"
                      ? true
                      : false) ||
                    (data?.list_b_group_2_options.at(0) !== "off" && index == 0)
                  }
                />
                <Label htmlFor={`list-b_group_2-option-checkbox-${index}`}>
                  {item}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
