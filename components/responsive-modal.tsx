"use client"

import { useIsMobile } from "@/hooks/use-is-mobile"
import { cn } from "@/lib/utils"

import { Dialog, DialogContent } from "./ui/dialog"
import { Drawer, DrawerContent } from "./ui/drawer"

type ResponsiveModalProps = React.PropsWithChildren<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>

export const ResponsiveModal = ({ open, onOpenChange, children }: ResponsiveModalProps) => {
  const isDesktop = !useIsMobile()

  const Root = isDesktop ? Dialog : Drawer
  const Content = isDesktop ? DialogContent : DrawerContent

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Content className={cn("max-h-[85vh]", isDesktop && "max-w-165 border-none p-0")}>
        {children}
      </Content>
    </Root>
  )
}
