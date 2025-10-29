import React from "react";
import { format } from "date-fns";
import { IBank } from "@/schema/form/bank.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuildingIcon, CalendarIcon, HashIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getFullNameOfUser } from "@/utils/Misc";
import CreateAccountDialog from "./create-account-dialog";

interface BankDetailsPageProps {
  bank: IBank;
}

export default function BankDetailsCard({ bank }: BankDetailsPageProps) {
  console.log("Bank", bank);

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <BuildingIcon className="h-6 w-6" />
            {bank.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HashIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Bank ID</p>
                  <p className="text-sm text-muted-foreground">{bank.id}</p>
                </div>
              </div>
              {bank.company && (
                <div className="flex items-center gap-2">
                  <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">
                      {bank.company.company_name}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created By</p>
                  <p className="text-sm text-muted-foreground">
                    {getFullNameOfUser(bank.author)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created At</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(bank.created_at), "dd-MM-yyyy")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(bank.updated_at), "dd-MM-yyyy")}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Account Count</p>
              <Badge variant="secondary">{bank.accounts.length} Accounts</Badge>
            </div>
          </div>
          <div className="flex justify-end">
            <CreateAccountDialog bankId={bank.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
