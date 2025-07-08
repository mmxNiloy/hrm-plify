"use client";
import { MultiSelect } from "@/components/custom/Multiselect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IPermission, IUser, IUserConfig } from "@/schema/UserSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useMemo, useState } from "react";

interface Props extends IFormFragmentProps<IUser> {
  permissions: IPermission[];
}

export default function SystemUserFormFragment({
  data,
  readOnly,
  disabled,
  permissions,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const permissionsMap = useMemo(() => {
    const hash = new Map<number, boolean>();
    if (data) {
      data.access_permissions.forEach((item) =>
        hash.set(item.permission_id, true)
      );
    }

    return hash;
  }, [data]);

  const readPerms = useMemo(() => {
    return permissions.filter((item) => item.permission_name.endsWith("read"));
  }, [permissions]);

  const updatePerms = useMemo(() => {
    return permissions.filter((item) =>
      item.permission_name.endsWith("update")
    );
  }, [permissions]);

  const createPerms = useMemo(() => {
    return permissions.filter((item) =>
      item.permission_name.endsWith("create")
    );
  }, [permissions]);

  const selectedUpdatePerms = useMemo(() => {
    return updatePerms
      .map((item) =>
        permissionsMap.get(item.permission_id)
          ? item.permission_id.toString()
          : ""
      )
      .filter((item) => item.length > 0);
  }, [permissionsMap, updatePerms]);

  const selectedWritePerms = useMemo(() => {
    return createPerms
      .map((item) =>
        permissionsMap.get(item.permission_id)
          ? item.permission_id.toString()
          : ""
      )
      .filter((item) => item.length > 0);
  }, [createPerms, permissionsMap]);

  const selectedReadPerms = useMemo(() => {
    return readPerms
      .map((item) =>
        permissionsMap.get(item.permission_id)
          ? item.permission_id.toString()
          : ""
      )
      .filter((item) => item.length > 0);
  }, [permissionsMap, readPerms]);

  const [checkedReadPerms, setCheckedReadPerms] = useState<string[]>([]);
  const [checkedWritePerms, setCheckedWritePerms] = useState<string[]>([]);
  const [checkedUpdatePerms, setCheckedUpdatePerms] = useState<string[]>([]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>First Name</Label>
        <Input
          id={"first-name-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          key={`first-name-${data?.first_name}`}
          name="first_name"
          placeholder="First Name"
          defaultValue={data?.first_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Middle Name</Label>
        <Input
          id={"middle-name-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          key={`middle-name-${data?.middle_name}`}
          name="middle_name"
          placeholder="Middle Name"
          defaultValue={data?.middle_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Last Name</Label>
        <Input
          id={"last-name-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          key={`last-name-${data?.last_name}`}
          name="last_name"
          placeholder="Last Name"
          defaultValue={data?.last_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        {/* <Input
          id={"last-name-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          key={`last-name-${data?.last_name}`}
          name="last_name"
          placeholder="Last Name"
          defaultValue={data?.last_name}
        /> */}

        <RadioGroup
          name="status"
          defaultValue={data?.status ?? "inactive"}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <RadioGroupItem value="active" id="status-active" />
            <Label htmlFor="status-active">Active</Label>
          </div>

          <div className="flex gap-2">
            <RadioGroupItem value="inactive" id="status-inactive" />
            <Label htmlFor="status-inactive">Inactive</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Email</Label>
        <Input
          id={"email-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          type="email"
          key={`email-${data?.email}`}
          name="email"
          placeholder="Email"
          defaultValue={data?.email ?? ""}
        />
      </div>

      {!data && (
        <div className="flex flex-col gap-2 col-span-full">
          <Label className={RequiredAsterisk}>Password</Label>
          <PasswordInput
            id={"password-input"}
            required
            readOnly={readOnly}
            disabled={disabled}
            name="password"
          />
        </div>
      )}

      {/* Permissions */}
      <p className="col-span-full font-semibold">Allowed Access</p>

      {/* Read Permissions */}
      <div className="flex flex-col gap-2">
        <Label>Read Permissions</Label>
        <MultiSelect
          placeholder="Read Permissions"
          options={readPerms.map((item) => ({
            label: item.description,
            value: item.permission_id.toString(),
          }))}
          defaultValue={selectedReadPerms}
          onValueChange={(value) => setCheckedReadPerms(value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Write Permissions</Label>
        <MultiSelect
          placeholder="Write Permissions"
          options={createPerms.map((item) => ({
            label: item.description,
            value: item.permission_id.toString(),
          }))}
          defaultValue={selectedWritePerms}
          onValueChange={(value) => setCheckedWritePerms(value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Update Permissions</Label>
        <MultiSelect
          placeholder="Update Permissions"
          options={updatePerms.map((item) => ({
            label: item.description,
            value: item.permission_id.toString(),
          }))}
          defaultValue={selectedUpdatePerms}
          onValueChange={(value) => setCheckedUpdatePerms(value)}
        />
      </div>

      <div className="hidden">
        {[...checkedReadPerms, ...checkedWritePerms, ...checkedUpdatePerms].map(
          (perm) => (
            <Input
              key={`checked-perm-${perm}`}
              name="userAccess"
              value={perm}
              readOnly
            />
          )
        )}
      </div>
    </>
  );
}
