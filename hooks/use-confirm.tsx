"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { ResponsiveModal } from "@/components/responsive-modal"
import { Button, type ButtonProps } from "@/components/ui/button"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"

type ConfirmPayload = {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ButtonProps["variant"]
}

type State = {
  payload: ConfirmPayload
  state: boolean
  resolve: (v: boolean) => void
} | null

const ConfirmCtx = createContext<{
  confirm: (p?: ConfirmPayload) => Promise<boolean>
} | null>(null)

const CLOSE_DELAY_MS = 220

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(null)

  const confirm = useCallback((payload: ConfirmPayload = {}) => {
    return new Promise<boolean>((resolve) => setState({ payload, resolve, state: true }))
  }, [])

  const close = useCallback(() => setState((p) => p && { ...p, state: false }), [])

  const onConfirm = useCallback(() => {
    state?.resolve(true)
    close()
  }, [state, close])

  const onCancel = useCallback(() => {
    state?.resolve(false)
    close()
  }, [state, close])

  useEffect(() => {
    if (!state?.state) {
      const t = setTimeout(() => setState(null), CLOSE_DELAY_MS)
      return () => clearTimeout(t)
    }
  }, [state?.state])

  const value = useMemo(() => ({ confirm }), [confirm])

  return (
    <ConfirmCtx.Provider value={value}>
      {children}
      <ResponsiveModal open={Boolean(state?.state)} onOpenChange={close}>
        <div className="p-6">
          <DialogTitle className="text-[22px] font-bold">
            {state?.payload.title ?? "Confirmar"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2 text-sm">
            {state?.payload.description ?? "Tem certeza que deseja continuar?"}
          </DialogDescription>
          <div className="flex w-full items-center justify-end gap-4 pt-4">
            <Button onClick={onCancel} variant="outline">
              {state?.payload.cancelLabel ?? "Cancelar"}
            </Button>
            <Button onClick={onConfirm} variant={state?.payload.variant ?? "destructive"}>
              {state?.payload.confirmLabel ?? "Confirmar"}
            </Button>
          </div>
        </div>
      </ResponsiveModal>
    </ConfirmCtx.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmCtx)
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider")
  return ctx.confirm
}
