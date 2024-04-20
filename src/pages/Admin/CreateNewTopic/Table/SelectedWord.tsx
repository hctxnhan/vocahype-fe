import { DataTable } from './Table';
import { columns, data } from './columns';

export function SelectedWordTable() {
  return <div>
    <DataTable columns={columns} data={data} />
  </div>;
}
