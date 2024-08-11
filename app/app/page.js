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
      <DesktopPage>
        <ChartPage data={data} />
        <TablePage data={data} />
      </DesktopPage>
      <PhonePage
        table={<TablePage data={data} />}
        chart={<ChartPage data={data} />}
      />
      <PhoneNav />
    </>
  )
}

