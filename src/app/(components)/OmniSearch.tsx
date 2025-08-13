"use client";

import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";

export function OmniSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen} label="OmniSearch">
      <CommandInput placeholder="Search matters, documents, clients..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Shortcuts">
          <CommandItem>Create Matter</CommandItem>
          <CommandItem>Generate NDA</CommandItem>
          <CommandItem>Translate to Arabic</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}


