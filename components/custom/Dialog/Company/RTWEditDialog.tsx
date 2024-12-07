"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ButtonBlue,
  ButtonSuccess,
  ButtonWarn,
} from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import {
  IEmployeeWithSalaryStructure,
  IPayroll,
  ISalaryStructure,
} from "@/schema/Payroll";
import SalaryStructureFormFragment from "../../Form/Fragment/Payroll/SalaryStructureFormFragment";
import PayrollFormFragment from "../../Form/Fragment/Payroll/PayrollFormFragment";
import { getEmployeeSalaryStructure } from "@/app/(server)/actions/getEmployeeSalaryStructure";
import { IDutyRoster } from "@/schema/RotaSchema";
import RTWEditTabs from "../../Tabs/RTWEditTabs";
import { ICompanyUser } from "@/schema/UserSchema";
import RTWFormContextProvider from "@/providers/RTWFormContextProvider";
import {
  RTWListAOptions,
  RTWListBGroup1Options,
  RTWListBGroup2Options,
  toYYYYMMDD,
  WIPToastOptions,
} from "@/utils/Misc";
import { IRightToWork, IRightToWorkBase } from "@/schema/RightToWork";
import { IUploadResult, upload } from "@/app/(server)/actions/upload";
import SiteConfig from "@/utils/SiteConfig";

interface Props {
  company_id: number;
  data?: IRightToWork;
  asIcon?: boolean;
  asEditable?: boolean;
  readOnly?: boolean;
  employees?: IEmployeeWithUserMetadata[];
}

type CheckType = "initial-check" | "follow-up-check";
type CheckMedium = "in-person-check" | "online-check";
type Evidence = "proof_of_address" | "passport";

export default function RTWEditDialog({
  data,
  asIcon = false,
  employees = [],
  company_id,
  asEditable = false,
  readOnly = false,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(
    undefined
  );
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const formRef: React.Ref<HTMLFormElement> | undefined = useRef(null);

  const handleNextTab = useCallback(() => {
    if (readOnly) {
      setCurrentTabIndex((oldVal) => oldVal + 1);
      return;
    }

    if (formRef.current) {
      const fd = new FormData(formRef.current);
      const [
        employee_id,
        date_of_check,
        type_of_check,
        medium_of_check,
        evidence_presented,
        time_of_check,
        list_a_options,
        list_b_group_1_options,
        list_b_group_2_options,
      ] = [
        data?.employee_id ??
          Number.parseInt((fd.get("employee_id") as string | undefined) ?? "0"),
        fd.get("date_of_check") as string | undefined,
        fd.get("type_of_check") as CheckType | undefined,
        fd.get("medium_of_check") as CheckMedium | undefined,
        fd.get("evidence_presented") as Evidence | undefined,
        fd.get("time_of_check") as string | undefined,
        ...[
          RTWListAOptions.map(
            (_, index) =>
              (fd.get(`list_a_options_${index}`) as string | undefined) ?? "off"
          ),
        ],
        ...[
          RTWListBGroup1Options.map(
            (_, index) =>
              (fd.get(`list_b_group_1_options_${index}`) as
                | string
                | undefined) ?? "off"
          ),
        ],
        ...[
          RTWListBGroup2Options.map(
            (_, index) =>
              (fd.get(`list_b_group_2_options_${index}`) as
                | string
                | undefined) ?? "off"
          ),
        ],
      ];
      // console.log("Form Data", Object.fromEntries(fd.entries()));

      if (currentTabIndex == 0) {
        // Check if an employee is selected and a date is selected
        if (Number.isNaN(employee_id) || employee_id == 0 || !date_of_check) {
          toast({
            title: "Validation failed!",
            description:
              "Please select an employee and the date of check before proceeding.",
            variant: "destructive",
          });
          return;
        }
      }
      if (currentTabIndex == 1) {
        if (
          (type_of_check !== "initial-check" &&
            type_of_check !== "follow-up-check") ||
          (medium_of_check !== "in-person-check" &&
            medium_of_check !== "online-check") ||
          (evidence_presented !== "passport" &&
            evidence_presented !== "proof_of_address") ||
          !time_of_check
        ) {
          toast({
            title: "Validation failed!",
            description: "Please fill out the required fields.",
            variant: "destructive",
          });
          return;
        }
      }

      if (currentTabIndex == 2) {
        const n =
          (list_a_options?.length ?? 0) +
          (list_b_group_1_options?.length ?? 0) +
          (list_b_group_2_options?.length ?? 0);
        if (n < 1) {
          toast({
            title: "Validation failed!",
            description: "Please fill out the required fields.",
            variant: "destructive",
          });
          return;
        }
      }

      setCurrentTabIndex((oldVal) => oldVal + 1);
    }
  }, [currentTabIndex, data?.employee_id, readOnly, toast]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // toast(WIPToastOptions);

      const fd = new FormData(e.currentTarget);

      const [
        employee_id,
        date_of_check,
        type_of_check,
        medium_of_check,
        evidence_presented,
        time_of_check,
        list_a_options,
        list_b_group_1_options,
        list_b_group_2_options,
      ] = [
        Number.parseInt((fd.get("employee_id") as string | undefined) ?? "0"),
        (fd.get("date_of_check") as string | undefined) ??
          toYYYYMMDD(new Date()),
        (fd.get("type_of_check") as CheckType | undefined) ?? "",
        (fd.get("medium_of_check") as CheckMedium | undefined) ?? "",
        (fd.get("evidence_presented") as Evidence | undefined) ?? "",
        (fd.get("time_of_check") as string | undefined) ??
          new Date().toTimeString(),
        ...[
          RTWListAOptions.map(
            (_, index) =>
              (fd.get(`list_a_options_${index}`) as string | undefined) ?? "off"
          ),
        ],
        ...[
          RTWListBGroup1Options.map(
            (_, index) =>
              (fd.get(`list_b_group_1_options_${index}`) as
                | string
                | undefined) ?? "off"
          ),
        ],
        ...[
          RTWListBGroup2Options.map(
            (_, index) =>
              (fd.get(`list_b_group_2_options_${index}`) as
                | string
                | undefined) ?? "off"
          ),
        ],
      ];

      var rtw: IRightToWorkBase = {
        id: data?.id ?? 0,
        employee_id,
        date_of_check,
        type_of_check,
        medium_of_check,
        evidence_presented,
        time_of_check,
        list_a_options,
        list_b_group_1_options,
        list_b_group_2_options,
        is_photo_consistent: fd.get("is_photo_consistent") as string,
        is_dob_consistent: fd.get("is_dob_consistent") as string,
        is_not_expired: fd.get("is_not_expired") as string,
        is_not_restricted: fd.get("is_not_restricted") as string,
        is_doc_genuine: fd.get("is_doc_genuine") as string,
        is_name_consistent: fd.get("is_name_consistent") as string,
        has_passport_copy: fd.get("has_hard_copy") as string,
        has_all_other_docs: fd.get("has_all_other_docs") as string,
        list_b_group_1_follow_up_date:
          (fd.get("list_b_group_1_follow_up_date") as string | undefined) ?? "",
        list_b_group_2_follow_up_date:
          (fd.get("list_b_group_2_follow_up_date") as string | undefined) ?? "",
        euss_follow_up_date:
          (fd.get("euss_follow_up_date") as string | undefined) ?? "",
        rtw_evidence_scan_1:
          (fd.get("rtw_evidence_scan_1") as string | undefined) ?? "",
        rtw_evidence_scan_1_file: fd.get("rtw_evidence_scan_1_file") as
          | File
          | undefined,
        rtw_evidence_scan_1_file_url: data?.rtw_evidence_scan_1_file_url,
        rtw_evidence_scan_2:
          (fd.get("rtw_evidence_scan_2") as string | undefined) ?? "",
        rtw_evidence_scan_2_file: fd.get("rtw_evidence_scan_2_file") as
          | File
          | undefined,
        rtw_evidence_scan_2_file_url: data?.rtw_evidence_scan_2_file_url,
        rtw_report_doc: (fd.get("rtw_report_doc") as string | undefined) ?? "",
        rtw_report_doc_file: fd.get("rtw_report_doc_file") as File | undefined,
        rtw_report_doc_file_url: data?.rtw_report_doc_file_url,
        rtw_check_result: fd.get("rtw_check_result") as string,
        checker_name: fd.get("checker_name") as string,
        checker_designation: fd.get("checker_designation") as string,
        checker_contact: fd.get("checker_contact") as string,
        checker_email: fd.get("checker_email") as string,
        rtw_remarks: fd.get("rtw_remarks") as string,
        is_copied_from_list_a:
          ((fd.get("is_copied_from_list_a") as string | undefined) ??
            "false") === "on",
        is_copied_from_list_b_group_1:
          ((fd.get("is_copied_from_list_b_group_1") as string | undefined) ??
            "false") === "on",
        is_copied_from_list_b_group_2:
          ((fd.get("is_copied_from_list_b_group_2") as string | undefined) ??
            "false") === "on",
      };

      if (
        rtw.rtw_evidence_scan_1_file ||
        rtw.rtw_evidence_scan_2_file ||
        rtw.rtw_report_doc_file
      ) {
        // Upload the images and get their url
        const files = [
          rtw.rtw_evidence_scan_1_file,
          rtw.rtw_evidence_scan_2_file,
          rtw.rtw_report_doc_file,
        ];

        const [scan1Upload, scan2Upload, docUpload] = await Promise.all(
          files.map((file, index) => {
            if (file && file.size <= SiteConfig.maxFileSize)
              return upload(file);
            return new Promise<
              | {
                  error: Error;
                  data?: undefined;
                }
              | {
                  data: IUploadResult;
                  error?: undefined;
                }
            >((resolve, reject) => {
              resolve({
                data: {
                  fileUrl:
                    index == 0
                      ? data?.rtw_evidence_scan_1_file_url ?? ""
                      : index == 1
                      ? data?.rtw_evidence_scan_2_file_url ?? ""
                      : data?.rtw_report_doc_file_url ?? "",
                  message: "Default Value",
                },
              });
            });
          })
        );

        if (scan1Upload.data) {
          rtw.rtw_evidence_scan_1_file_url = scan1Upload.data.fileUrl;
        }

        if (scan2Upload.data) {
          rtw.rtw_evidence_scan_2_file_url = scan2Upload.data.fileUrl;
        }

        if (docUpload.data) {
          rtw.rtw_report_doc_file_url = docUpload.data.fileUrl;
        }
      }

      setLoading(true);

      try {
        console.log("RTW Request Body", rtw);

        const apiRes = await fetch(`/api/sponsor-compliance/rtw`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify({
            ...rtw,
            company_id,
          }),
        });

        if (apiRes.ok) {
          // Close dialog, show toast, refresh parent ssc
          toast({
            title: "Update Successful",
            className: ToastSuccess,
          });
          // if (onSuccess) onSuccess(data.data.department_id);

          router.refresh();
          setOpen(false);
        } else {
          // show a failure dialog
          const res = await apiRes.json();

          toast({
            title: "Update Failed",
            description: JSON.stringify(res.message),
            variant: "destructive",
          });
        }
      } catch (err) {
        // console.error("Failed to update employee personal information.", err);
        toast({
          title: "Update Failed",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [company_id, data, router, toast]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        if (!e) {
          setSelectedEmployee(undefined);
          setCurrentTabIndex(0);
          setOpen(false);
        } else setOpen(true);
      }}
    >
      <DialogTrigger asChild>
        {readOnly ? (
          <Button variant={"ghost"} size="icon">
            <Icons.visible />
          </Button>
        ) : asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonBlue}>
            <Icons.plus /> Add a RTW check
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Add a RTW check</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
          {/* <DialogDescription>
            Bonus and deduction options are available for one employee only.
          </DialogDescription> */}
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="p-4">
              <RTWFormContextProvider>
                <RTWEditTabs
                  readOnly={readOnly}
                  data={data}
                  employees={employees}
                  currentTabIndex={currentTabIndex}
                />
              </RTWFormContextProvider>
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                disabled={loading}
                className="rounded-full"
                variant={"destructive"}
                size="sm"
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>
            <span className="flex-grow" />
            <Button
              type="button"
              size={"sm"}
              disabled={loading || currentTabIndex < 1}
              onClick={() => setCurrentTabIndex((oldVal) => oldVal - 1)}
              className={ButtonWarn}
            >
              <Icons.chevronLeft />
              Back
            </Button>
            <Button
              onClick={handleNextTab}
              type="button"
              size={"sm"}
              disabled={loading || currentTabIndex > 3}
              className={ButtonBlue}
            >
              Next
              <Icons.chevronRight />
            </Button>
            <Button
              type="submit"
              disabled={loading || currentTabIndex < 4 || readOnly}
              className={ButtonSuccess}
              size="sm"
            >
              {loading ? (
                <Icons.spinner className="animate-spin ease-in-out" />
              ) : (
                <Icons.check />
              )}{" "}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
