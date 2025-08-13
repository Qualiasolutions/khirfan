"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { 
  Search, 
  FileText, 
  Users, 
  Briefcase, 
  BookOpen, 
  DollarSign, 
  Shield,
  Workflow,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  const pages = [
    { name: "Overview", icon: Briefcase, href: "/" },
    { name: "Matters", icon: FileText, href: "/matters" },
    { name: "Documents", icon: FileText, href: "/documents" },
    { name: "Research", icon: BookOpen, href: "/research" },
    { name: "Clients", icon: Users, href: "/clients" },
    { name: "Workflows", icon: Workflow, href: "/workflows" },
    { name: "Billing", icon: DollarSign, href: "/billing" },
    { name: "Governance", icon: Shield, href: "/governance" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ]

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <Command className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
          <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input 
              placeholder="Type a command or search..."
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
          <Command.List className="max-h-96 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm opacity-50">
              No results found.
            </Command.Empty>
            
            <Command.Group heading="Pages" className="px-2 py-2">
              {pages.map((page) => (
                <Command.Item
                  key={page.href}
                  onSelect={() => runCommand(() => router.push(page.href))}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                  )}
                >
                  <page.icon className="h-4 w-4" />
                  <span>{page.name}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="my-2 h-px bg-gray-200 dark:bg-gray-800" />
            
            <Command.Group heading="Actions" className="px-2 py-2">
              <Command.Item
                onSelect={() => runCommand(() => console.log("New Matter"))}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                )}
              >
                <FileText className="h-4 w-4" />
                <span>Create New Matter</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => console.log("New Document"))}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                )}
              >
                <FileText className="h-4 w-4" />
                <span>Generate Document</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => console.log("Search Research"))}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                )}
              >
                <BookOpen className="h-4 w-4" />
                <span>Search Legal Research</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}