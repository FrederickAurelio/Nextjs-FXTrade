import DesktopPage from "/app/_app_components/DesktopPage"
import ChartPage from "/app/_app_components/ChartPage"
import TablePage from "/app/_app_components/TablePage"

export default function Page() {
  return (
    <main className="grid h-[93dvh] w-full bg-zinc-100 lg:h-dvh lg:grid-cols-2 lg:divide-x-2 lg:divide-zinc-200">
      <DesktopPage>
        <ChartPage />
        <TablePage />
      </DesktopPage>
    </main>
  )
}

