import DesktopPage from "/app/_app_components/DesktopPage"
import PhonePage from "/app/_app_components/PhonePage"
import ChartPage from "/app/_app_components/ChartPage"
import TablePage from "/app/_app_components/TablePage"
import PhoneNav from "../_app_components/PhoneNav"
import { getTransactions } from "/app/_lib/data-service"

export default async function Page() {
  const data = await getTransactions();
  return (
    <>
      <main className="grid h-[93dvh] w-full bg-zinc-100 lg:h-dvh lg:grid-cols-2 lg:divide-x-2 lg:divide-zinc-200">
        <DesktopPage>
          <ChartPage data={data} />
          <TablePage data={data} />
        </DesktopPage>
        <PhonePage
          table={<TablePage data={data} />}
          chart={<ChartPage data={data} />}
        />
      </main>
      <PhoneNav />
    </>
  )
}

