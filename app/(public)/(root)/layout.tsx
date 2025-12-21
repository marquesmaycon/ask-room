import { Header } from "@/components/layout/header"

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-violet-50 dark:bg-violet-800">
      <div className="mx-auto min-h-screen max-w-6xl px-4 py-4">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}
