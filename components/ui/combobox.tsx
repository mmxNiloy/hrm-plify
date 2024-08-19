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
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  items: string[];
}

const ComboBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { label, placeholder, items } = props;
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    return (
      <>
        <input
          type={type}
          value={selectedValue}
          className="hidden"
          ref={ref}
          {...props}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              role="combobox"
              className="justify-between"
            >
              {selectedValue.length > 0
                ? selectedValue
                : label ?? "Select an option"}
              <Icons.chevronsUpDown className="size-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder={placeholder ?? "Search..."} />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup>
                  {items.map((item, index) => (
                    <CommandItem
                      onSelect={() => {
                        setSelectedValue(item);
                        setOpen(false);
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
          </PopoverContent>
        </Popover>
      </>
    );
  }
);
ComboBox.displayName = "Combobox";

export { ComboBox };
