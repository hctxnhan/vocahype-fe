import { DataTable } from './Table';
import { columns, data } from './columns';

export function SelectedWordTable() {
  return <div className='flex-1'>
    <DataTable columns={columns} data={data} />
  </div>;
}
