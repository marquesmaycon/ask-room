"use client"

import { useQueryClient } from "@tanstack/react-query"
import type { User } from "better-auth"
import { LayoutDashboard, LogOut } from "lucide-react"
import Link from "next/link"

import { signOut } from "@/features/auth/actions"
import { authClient } from "@/lib/auth-client"
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
  const { refetch } = authClient.useSession()

  async function handleLogout() {
    queryClient.clear()
    await signOut()
    await refetch()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="rounded-md">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="hover:bg-accent bg-background dark:bg-input/30 rounded-md border text-xs font-bold transition-colors">
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
