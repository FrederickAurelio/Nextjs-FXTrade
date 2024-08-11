export default function DesktopPage({ children }) {
  return <main className="grid h-[93dvh] w-full bg-zinc-100 lg:h-dvh lg:grid-cols-2 lg:divide-x-2 lg:divide-zinc-200 max-lg:hidden">
    {children}
  </main>
}
