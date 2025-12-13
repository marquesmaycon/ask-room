export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-background mx-auto min-h-screen max-w-4xl px-4 py-10">
      <main>{children}</main>
    </div>
  )
}
