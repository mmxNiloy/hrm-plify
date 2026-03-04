"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import Icons from "./icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  items: string[];
  onValueChange?: (value: string) => void;
  contentClassName?: string;
}

const ComboBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, defaultValue, ...props }, ref) => {
    const { label, placeholder, items, onValueChange, contentClassName } =
      props;
    const [selectedValue, setSelectedValue] = useState<string>(
      ((props.value as string) ?? (defaultValue as string) ?? "").trim(),
    );
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={props.disabled || props.readOnly} asChild>
          <Button
            variant={"outline"}
            role="combobox"
            className={cn(className, "justify-between")}
          >
            <input
              tabIndex={-1}
              readOnly
              type={type}
              value={selectedValue}
              placeholder={
                selectedValue.length > 0
                  ? selectedValue
                  : (label ?? "Select an option")
              }
              className="bg-transparent enabled:placeholder:text-foreground hover:bg-transparent cursor-pointer focus:outline-none caret-transparent border-none flex-grow"
              ref={ref}
              {...props}
            />
            {/* {selectedValue.length > 0
                ? selectedValue
                : label ?? "Select an option"} */}
            <Icons.chevronsUpDown className="size-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverPrimitive.Content
          align={"center"}
          sideOffset={4}
          className={cn(
            "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            contentClassName,
          )}
        >
          <Command className="max-h-72">
            <CommandInput placeholder={placeholder ?? "Search..."} />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup>
                {items.map((item, index) => (
                  <CommandItem
                    onSelect={() => {
                      setSelectedValue(item);
                      setOpen(false);

                      if (onValueChange) onValueChange(item);
                    }}
                    key={`${item}-#${index}`}
                    value={item}
                  >
                    {selectedValue === item && (
                      <Icons.check className="mr-2 size-4" />
                    )}
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverPrimitive.Content>
      </Popover>
    );
  },
);
ComboBox.displayName = "Combobox";

interface LabelledInputProps extends Omit<InputProps, "items"> {
  items: {
    label: string;
    value: string;
    image?: string;
  }[];
  onSearchChange?: (value: string) => void;
}

const LabelledComboBox = React.forwardRef<HTMLInputElement, LabelledInputProps>(
  ({ className, type, onSearchChange, defaultValue, ...props }, ref) => {
    const { label, placeholder, items, onValueChange, contentClassName } =
      props;
    const [selectedValue, setSelectedValue] = useState<string>(
      ((props.value as string) ?? (defaultValue as string) ?? "").trim(),
    );
    const [open, setOpen] = useState<boolean>(false);

    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger disabled={props.disabled || props.readOnly} asChild>
            <Button
              disabled={props.disabled || props.readOnly}
              variant={"outline"}
              role="combobox"
              className={cn(className, "justify-between")}
            >
              <input
                readOnly
                className="bg-transparent enabled:placeholder:text-foreground hover:bg-transparent cursor-pointer focus:outline-none caret-transparent border-none flex-grow"
                required={props.required}
                tabIndex={-1}
                value={
                  items.find((item) => item.value === selectedValue)?.label ??
                  undefined
                }
                placeholder={
                  selectedValue.length > 0
                    ? (items.find((item) => item.value === selectedValue)
                        ?.label ?? label)
                    : (label ?? "Select an option")
                }
              />
              <input
                tabIndex={-1}
                readOnly
                type={type}
                value={selectedValue}
                placeholder={
                  selectedValue.length > 0
                    ? (items.find((item) => item.value === selectedValue)
                        ?.label ?? label)
                    : (label ?? "Select an option")
                }
                className="sr-only bg-transparent hover:bg-transparent cursor-pointer focus:outline-none caret-transparent border-none flex-grow"
                ref={ref}
                {...props}
              />
              {/* {selectedValue.length > 0
                ? selectedValue
                : label ?? "Select an option"} */}
              <Icons.chevronsUpDown className="size-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverPrimitive.Content
            align={"center"}
            sideOffset={4}
            className={cn(
              "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              contentClassName,
            )}
          >
            <Command className="max-h-72">
              <CommandInput
                onValueChange={onSearchChange}
                placeholder={placeholder ?? "Search..."}
              />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup className="*:space-y-0.5">
                  {items.map((item, index) => (
                    <CommandItem
                      onSelect={() => {
                        setSelectedValue(item.value);
                        setOpen(false);

                        if (onValueChange) onValueChange(item.value);
                      }}
                      key={`${item}-#${index}`}
                      value={item.value}
                      keywords={item.label.split(" ")}
                      className={cn(
                        item.value === selectedValue
                          ? "border border-blue-500 border-dashed"
                          : "",
                      )}
                    >
                      {/* {selectedValue === item.value && (
                        <Icons.check className="mr-2 size-4" />
                      )} */}
                      {item.image && (
                        <Avatar className="size-10 mr-4 bg-muted">
                          <AvatarFallback>{item.label[0]}</AvatarFallback>
                          <AvatarImage
                            src={item.image}
                            className="object-contain object-center"
                          />
                        </Avatar>
                      )}

                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverPrimitive.Content>
        </Popover>
      </>
    );
  },
);
LabelledComboBox.displayName = "LabelledCombobox";

export { ComboBox, LabelledComboBox };
