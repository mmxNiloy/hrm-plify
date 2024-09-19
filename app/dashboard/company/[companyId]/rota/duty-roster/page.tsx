"use server";
import OffDaysDataTable from "@/app/Components/Rota/OffDaysDataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ICompany } from "@/schema/CompanySchema";
import { redirect } from "next/navigation";
import OffDaysEditDialog from "@/app/Components/Rota/EditDialog/OffDaysEditDialog";
import DutyRosterDataTable from "@/app/Components/Rota/DutyRosterDataTable";
import DutyRosterEditDialog from "@/app/Components/Rota/EditDialog/DutyRosterEditDialog";
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
import { Button } from "@/components/ui/button";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import DutyRosterFormFragment from "@/app/Components/Rota/EditDialog/DutyRosterEditDialog/form-fragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { getCompanyData } from "@/app/actions/getCompanyData";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getDutyRosters } from "@/app/actions/getDutyRosters";
import { getCompanyExtraData } from "@/app/actions/getCompanyExtraData";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function RotaDutyRosterPage({
  params,
  searchParams,
}: Props) {
  const company = await getCompanyData(params.companyId);

  const { page, limit } = getPaginationParams(searchParams);
  const paginatedDutyRoster = await getDutyRosters({
    company_id: company.company_id,
    page,
    limit,
  });
  const companyExtraData = await getCompanyExtraData(params.companyId);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Duty Roster</p>
      <div className="flex items-center justify-between gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-32"
                href={`/dashboard/company/${params.companyId}`}
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/dashboard/company/${params.companyId}/rota`}
              >
                Rota
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Duty Roster</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <span className="flex-grow" />
        <Button
          className="bg-rose-500 hover:bg-rose-400 text-white rounded-full gap-2"
          size="sm"
        >
          <Icons.pdf className="stroke-white fill-white" /> Download as PDF File
        </Button>
        <Button className={ButtonSuccess} size="sm">
          <Icons.excel className="stroke-white fill-white" /> Download as Excel
          File
        </Button>
      </div>
      <div className="flex items-center justify-end gap-2 mt-2 mb-2">
        {/* Duty Roster Filter */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className={ButtonWarn}>
              <Icons.filter /> Filter Duty Roster
            </Button>
          </DialogTrigger>

          <DialogContent className={DialogContentWidth}>
            <DialogHeader>
              <DialogTitle>Filter Duty Roster</DialogTitle>
              <DialogDescription>
                Filter Duty Roster By the following fields
              </DialogDescription>
            </DialogHeader>

            <form>
              <ScrollArea className="h-[70vh]">
                <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
                  <DutyRosterFormFragment showEmployee />
                </div>
              </ScrollArea>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="rounded-full"
                    variant={"destructive"}
                    size="sm"
                  >
                    <Icons.cross /> Close
                  </Button>
                </DialogClose>
                {/* <DialogClose asChild> */}
                <Button type="submit" className={ButtonSuccess} size="sm">
                  <Icons.check /> Apply
                </Button>
                {/* </DialogClose> */}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <span className="flex-grow"></span>
        <DutyRosterEditDialog
          company_id={params.companyId}
          departments={companyExtraData.departments}
          designations={companyExtraData.designations}
          shifts={companyExtraData.shifts}
          employees={companyExtraData.employees}
          type="employee"
        />
        {/* <DutyRosterEditDialog type="designation" /> */}
      </div>

      <DutyRosterDataTable
        data={paginatedDutyRoster.data.map((item) => ({
          ...item,
          company_shifts: companyExtraData.shifts,
          company_departments: companyExtraData.departments,
          company_employees: companyExtraData.employees,
        }))}
      />
    </main>
  );
}
