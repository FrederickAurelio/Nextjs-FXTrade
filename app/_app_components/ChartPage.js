import { Suspense } from "react"
import Chart from "./Chart"
import SearchCurrency from "./SearchCurrency"
import Spinner from "../_components/Spinner"

async function ChartPage({ data }) {
  return (
    <main className="flex h-full flex-col overflow-hidden p-3">
      <SearchCurrency />
      <Suspense fallback={<Spinner />}>
        <Chart data={data} />
      </Suspense>
    </main>
  )
}

export default ChartPage
