import { useIndexDb } from "../data/Indexed/IndexedContext"
import Table from "../components/Table"

export default function DataTable() {
  const { getDataArray } = useIndexDb()

  return (
    <div>
      <div>
        <Table data={getDataArray} />
      </div>
    </div>
  )
}
