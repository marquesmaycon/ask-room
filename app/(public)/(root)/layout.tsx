import { Header } from "@/components/layout/header"

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-slate-200 px-4 py-4">
      <Header />
      <main>{children}</main>
    </div>
  )
}
