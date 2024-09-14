import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { IUser } from "@/schema/UserSchema";
import Link from "next/link";
import React from "react";

export default function EmployeeNavMenu({ user }: { user: IUser }) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Human Resources</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Employee Management</MenubarSubTrigger>
            <MenubarSubContent>
              <Link
                className="w-full"
                href={`/dashboard/company/${user.company_id}/employee`}
              >
                <MenubarItem className="cursor-pointer">Dashboard</MenubarItem>
              </Link>
              <MenubarSeparator />
              <Link
                className="w-full"
                href={`/dashboard/company/${user.company_id}/employee/all`}
              >
                <MenubarItem>All Employees</MenubarItem>
              </Link>
              <Link
                className="w-full"
                href={`/dashboard/company/${user.company_id}/employee/migrant`}
              >
                <MenubarItem>Migrant Employees</MenubarItem>
              </Link>
              <Link
                className="w-full"
                href={`/dashboard/company/${user.company_id}/employee/change-of-circumstances"`}
              >
                <MenubarItem>Change of Circumstances</MenubarItem>
              </Link>
              <Link
                className="w-full"
                href={`/dashboard/company/${user.company_id}/employee/contract-agreement`}
              >
                <MenubarItem>Contract Agreement</MenubarItem>
              </Link>
              <MenubarSeparator />
              <MenubarItem>Employee Corner</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>

          <MenubarSub>
            <MenubarSubTrigger>Recruitment</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Job</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Job List</MenubarItem>
                  <MenubarItem>Job Posting</MenubarItem>
                  <MenubarItem>Job Published</MenubarItem>
                  <MenubarItem>Job Applied</MenubarItem>
                  <MenubarItem>Short listing</MenubarItem>
                  <MenubarItem>Interview</MenubarItem>
                  <MenubarItem>Hired</MenubarItem>
                  <MenubarItem>Rejected</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>Generate offer letter</MenubarItem>
              <MenubarItem>Search</MenubarItem>
              <MenubarItem>Status search</MenubarItem>
              <MenubarItem>Message center</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Mock Interview</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Interview forms</MenubarItem>
                  <MenubarItem>Interviews</MenubarItem>
                  <MenubarItem>Capstone assessment report</MenubarItem>
                  <MenubarItem>Cognitive ability assessment report</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarSubContent>
          </MenubarSub>

          <MenubarSub>
            <MenubarSubTrigger>Leave Management</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Manage Leave Type</MenubarItem>
              <MenubarItem>Leave Rule</MenubarItem>
              <MenubarItem>Leave Allocation</MenubarItem>
              <MenubarItem>Leave Balance</MenubarItem>
              <MenubarItem>Leave Report</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Approve Leave</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Administration</MenubarTrigger>
        <MenubarContent>
          <Link href={"/dashboard/company"}>
            <MenubarItem>Company Management</MenubarItem>
          </Link>
          <MenubarSub>
            <MenubarSubTrigger>Organization Profile</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Profile</MenubarItem>
              <MenubarItem>Create Employee Profile</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Billing</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Billing</MenubarItem>
              <MenubarItem>Payment receipt</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>User Access</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>User configuration</MenubarItem>
              <MenubarItem>Role management</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Settings</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>HCM Master</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Department</MenubarItem>
                  <MenubarItem>Designation</MenubarItem>
                  <MenubarItem>Employment type</MenubarItem>
                  <MenubarItem>Pay group</MenubarItem>
                  <MenubarItem>Annual pay</MenubarItem>
                  <MenubarItem>Bank master</MenubarItem>
                  <MenubarItem>Bank shortcode</MenubarItem>
                  <MenubarItem>Tax master</MenubarItem>
                  <MenubarItem>Payment type</MenubarItem>
                  <MenubarItem>Wedges pay mode</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Pay item</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Operations</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Time & Attendance</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarSub>
                <MenubarSubTrigger>Attendance</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Dashboard</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Upload attendance</MenubarItem>
                  <MenubarItem>Generate attendance</MenubarItem>
                  <MenubarItem>Daily attendance</MenubarItem>
                  <MenubarItem>Attendance history</MenubarItem>
                  <MenubarItem>Process attendance</MenubarItem>
                  <MenubarItem>Absent report</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Rota</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Dashboard</MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Time shift management</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Shift management</MenubarItem>
                      <MenubarItem>Late policy</MenubarItem>
                      <MenubarItem>Day off</MenubarItem>
                      <MenubarItem>Grace period</MenubarItem>
                      <MenubarItem>Duty roster</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>Visitor</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Visitor register link</MenubarItem>
                      <MenubarItem>Visitor register</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Holiday Management</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Dashboard</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Holiday type</MenubarItem>
                  <MenubarItem>Holiday list</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Tasks</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Finance & Documents</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Payroll</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Documents</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Staff report</MenubarItem>
              <MenubarItem>Archive</MenubarItem>
              <MenubarItem>Organization report</MenubarItem>
              <MenubarItem>Employee report</MenubarItem>
              <MenubarItem>Employee archive report</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Organogram Chart</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Level</MenubarItem>
              <MenubarItem>Organization hierarchy</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Compliance & Planning</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Sponsor Compliance</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
