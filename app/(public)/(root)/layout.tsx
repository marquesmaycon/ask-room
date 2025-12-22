import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
