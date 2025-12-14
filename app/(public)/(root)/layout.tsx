import { Header } from "@/components/layout/header"

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-slate-200 dark:bg-slate-900">
      <div className="mx-auto min-h-screen max-w-4xl px-4 py-4">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}
