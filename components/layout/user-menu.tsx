"use client"

import { useQueryClient } from "@tanstack/react-query"
import type { User } from "better-auth"
import { LayoutDashboard, LogOut } from "lucide-react"
import Link from "next/link"

import { signOut } from "@/features/auth/actions"
import { extractInitials } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const queryClient = useQueryClient()

  function handleLogout() {
    queryClient.clear()
    signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="border bg-white text-sm font-bold dark:bg-slate-900">
            {extractInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          {user.name} <small className="text-muted-foreground">{user.email}</small>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard /> Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
