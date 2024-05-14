import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setPagination: OnChangeFn<PaginationState>;
  currentPage: number;
  pageCount: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setPagination,
  currentPage,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    pageCount,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex w-full items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={table.nextPage}
          Next
        </Button>
      </div>
    </div>
  );
}
