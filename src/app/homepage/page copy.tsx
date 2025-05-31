'use client';

import * as React from 'react';
import { JSX } from 'react';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type CellContext,
    type SortingState as SortingStateType,
    type Table as TableType,
    Row,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@/components/ui/table';

export type Payment = {
  id: string
  soal: string
  tipe: 'pilihan berganda' | 'multiple choice' | 'essay'
  opsi?: { [key: string]: string }
}

const data: Payment[] = [
    { id: 'm5gr84i9', soal: 'WE WOK DE TOK', tipe: 'pilihan berganda' },
    { id: '3u1reuv4', soal: 'HEE DOPE ZOE COW WEE', tipe: 'multiple choice' },
    { id: 'derv1ws0', soal: 'Siapa nama bapak Richardo?', tipe: 'essay' },
    { id: '5kma53ae', soal: 'Kapan Arnold gaperta?', tipe: 'essay' },
    { id: 'bhqecj4p', soal: 'Kapan mempunyai minggu tenang?', tipe: 'essay' },
];

type PaymentCellContext = CellContext<Payment, unknown>;

export default function DataTableDemo():JSX.Element {
    const [ sorting, setSorting ]: [
        SortingStateType,
        React.Dispatch<React.SetStateAction<SortingStateType>>
    ] = React.useState<SortingState>([]);
    const [ columnFilters, setColumnFilters ]: [
        ColumnFiltersState,
        React.Dispatch<React.SetStateAction<ColumnFiltersState>>
    ] = React.useState<ColumnFiltersState>([]);
    const [ columnVisibility, setColumnVisibility ]: [
        VisibilityState,
        React.Dispatch<React.SetStateAction<VisibilityState>>
    ] = React.useState<VisibilityState>({});

    const columns: ColumnDef<Payment>[] = [
        {
            id: 'no',
            header: 'No',
            cell: ({ row, table }:PaymentCellContext):JSX.Element => {
                const visibleRows:Row<Payment>[]= table.getFilteredRowModel().rows;
                
                const index:number= visibleRows.findIndex((r) => r.id === row.id);
                return <div>{index + 1}</div>;
            },
        },

        {
            accessorKey: 'soal',
            header: 'Soal',
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ row }:PaymentCellContext) => <div className="truncate overflow-hidden whitespace-nowrap max-w-[300px]">{row.getValue('soal')}</div>,
        },
        {
            accessorKey: 'tipe',
            header: 'Tipe',
            cell: ({ row }:PaymentCellContext) => (
                <div className="capitalize">{row.getValue('tipe')}</div>
            ),
            enableSorting: false,
            filterFn: (row, columnId, filterValue):boolean=> {
                if (!Array.isArray(filterValue)) return true;
                return filterValue.includes(row.getValue(columnId));
            },
        },

        {
            accessorKey: 'poin',
            header: () => <div className="text-right">Poin</div>,
            cell: ({ row }:PaymentCellContext):JSX.Element=> {
                const tipe :string = row.original.tipe;
                let poin :number= 0;
                if (tipe === 'essay') poin = 10;
                else if (tipe === 'pilihan berganda' || tipe === 'multiple choice') poin = 5;

                return <div className="text-right font-medium">{poin} poin</div>;
            },
        },

    ];



    const table: TableType<Payment>  = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });


    return (
        <div className="h-fit w-full">
            <div className="w-full max-w-5xl">
                <div className="rounded-md">
                    <Table>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
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
                </div>
            </div>
        </div>
    );
}

