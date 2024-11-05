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

const listAOptions: string[] = [
  "A passport (current or expired) showing the holder, or a person named in the passport as the child of the holder, is a British citizen or a citizen of the UK and Colonies having the right of abode in the UK.",
  "A passport or passport card (current or expired) showing that the holder is a national of the Republic of Ireland.",
  "A current document issued by the Home Office to a family member of an EEA or Swiss citizen, and which indicates that the holder is permitted to stay in the United Kingdom indefinitely.",
  "A document issued by the Bailiwick of Jersey, the Bailiwick of Guernsey or the Isle of Man, which has been verified as valid by the Home Office Employer Checking Service, showing that the holder has been granted unlimited leave to enter or remain under Appendix EU to the Jersey Immigration Rules, Appendix EU to the Immigration (Bailiwick of Guernsey) Rules 2008 or Appendix EU to the Isle of Man Immigration Rules.",
  "A current Biometric Immigration Document (biometric residence permit) issued by the Home Office to the holder indicating that the person named is allowed to stay indefinitely in the UK, or has no time limit on their stay in the UK.",
  "A current passport endorsed to show that the holder is exempt from immigration control, is allowed to stay indefinitely in the UK, has the right of abode in the UK, or has no time limit on their stay in the UK.",
  "A current Immigration Status Document issued by the Home Office to the holder with an endorsement indicating that the named person is allowed to stay indefinitely in the UK or has no time limit on their stay in the UK, together with an official document giving the person's permanent National Insurance number and their name issued by a government agency or a previous employer.",
  "A birth or adoption certificate issued in the UK, together with an official document giving the person's permanent National Insurance number and their name issued by a government agency or a previous employer.",
  "A birth or adoption certificate issued in the Channel Islands, the Isle of Man or Ireland, together with an official document giving the person's permanent National Insurance number and their name issued by a government agency or a previous employer.",
  "A certificate of registration or naturalisation as a British citizen, together with an official document giving the person's permanent National Insurance number and their name issued by a government agency or a previous employer.",
];

const listBGroup1Options: string[] = [
  "A current passport endorsed to show that the holder is allowed to stay in the UK and is currently allowed to do the type of work in question.",
  "A current Biometric Immigration Document (biometric residence permit) issued by the Home Office to the holder which indicates that the named person can currently stay in the UK and is allowed to do the work in question.",
  "A current document issued by the Home Office to a family member of an EEA or Swiss citizen, and which indicates that the holder is permitted to stay in the United Kingdom for a time-limited period and to do the type of work in question.",
  "A document issued by the Bailiwick of Jersey, the Bailiwick of Guernsey or the Isle of Man, which has been verified as valid by the Home Office Employer Checking Service, showing that the holder has been granted limited leave to enter or remain under Appendix EU to the Jersey Immigration Rules, Appendix EU to the Immigration (Bailiwick of Guernsey) Rules 2008 or Appendix EU to the Isle of Man Immigration Rules.",
  "A document issued by the Bailiwick of Jersey or the Bailiwick of Guernsey, which has been verified as valid by the Home Office Employer Checking Service, showing that the holder has made an application for leave to enter or remain under Appendix EU to the Jersey Immigration Rules or Appendix EU to the Immigration (Bailiwick of Guernsey) Rules 2008, on or before 30 June 2021.",
  "A frontier worker permit issued under regulation 8 of the Citizens' Rights (Frontier Workers) (EU Exit) Regulations 2020.",
  "A current immigration status document containing a photograph issued by the Home Office to the holder with a valid endorsement indicating that the named person may stay in the UK, and is allowed to do the type of work in question, together with an official document giving the person’s permanent National Insurance number and their name issued by a government agency or a previous employer.",
];

const listBGroup2Options: string[] = [
  "A document issued by the Home Office showing that the holder has made an application for leave to enter or remain under Appendix EU to the immigration rules on or before 30 June 2021 together with a Positive Verification Notice from the Home Office Employer Checking Service.",
  "A document issued by the Bailiwick of Jersey or the Bailiwick of Guernsey, showing that the holder has made an application for leave to enter or remain under Appendix EU to the Jersey Immigration Rules or Appendix EU to the Immigration (Bailiwick of Guernsey) Rules 2008 on or before 30 June 2021 together with a Positive Verification Notice from the Home Office Employer Checking Service.",
  "An application registration card issued by the Home Office stating that the holder is permitted to take the employment in question, together with a Positive Verification Notice from the Home Office Employer Checking Service.",
  "A Positive Verification Notice issued by the Home Office Employer Checking Service to the employer or prospective employer, which indicates that the named person may stay in the UK and is permitted to do the work in question.",
];

export default function RTWPhysicalCheckTab() {
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
            {listAOptions.map((item, index) => (
              <div
                key={`list-a-option-${index}`}
                className="flex gap-4 *:text-xs items-center"
              >
                <Checkbox
                  id={`list-a-option-checkbox-${index}`}
                  name="list_a_options"
                  defaultChecked={index == 0}
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
            {listBGroup1Options.map((item, index) => (
              <div
                key={`list-b_group_1-option-${index}`}
                className="flex gap-4 *:text-xs items-center"
              >
                <Checkbox
                  id={`list-b_group_1-option-checkbox-${index}`}
                  name="list_b_group_1_options"
                  defaultChecked={index == 0}
                />
                <Label htmlFor={`list-b_group_1-option-checkbox-${index}`}>
                  {item}
                </Label>
              </div>
            ))}

            <p className="text-base my-2">Group 2</p>
            {listBGroup2Options.map((item, index) => (
              <div
                key={`list-b_group_2-option-${index}`}
                className="flex gap-4 *:text-xs items-center"
              >
                <Checkbox
                  id={`list-b_group_2-option-checkbox-${index}`}
                  name="list_b_group_2_options"
                  defaultChecked={index == 0}
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
