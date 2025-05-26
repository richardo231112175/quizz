"use client"

import * as React from "react"
import { Edit, Trash, LinkIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
  { id: "m5gr84i9", soal: "WE WOK DE TOK", tipe: "pilihan berganda" },
  { id: "3u1reuv4", soal: "HEE DOPE ZOE COW WEE", tipe: "multiple choice" },
  { id: "derv1ws0", soal: "Siapa nama bapak Richardo?", tipe: "essay" },
  { id: "5kma53ae", soal: "Kapan Arnold gaperta?", tipe: "essay" },
  { id: "bhqecj4p", soal: "Kapan mempunyai minggu tenang?", tipe: "essay" },
]



export type Payment = {
  id: string
  soal: string
  tipe: "pilihan berganda" | "multiple choice" | "essay"
  opsi?: { [key: string]: string }
}


export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [selectedTipe, setSelectedTipe] = React.useState<string[]>([])
  const [dataSource, setDataSource] = React.useState(data)
  const [editDialog, setEditDialog] = React.useState(false)
  const [deleteDialog, setDeleteDialog] = React.useState(false)
  const [currentSoal, setCurrentSoal] = React.useState<Payment | null>(null)
  const [newSoalText, setNewSoalText] = React.useState("")
  const [addDialog, setAddDialog] = React.useState(false)
  const [newSoalInput, setNewSoalInput] = React.useState("")
  const [newTipeInput, setNewTipeInput] = React.useState<"essay" | "pilihan berganda" | "multiple choice">("essay")
  const [pilihanOpsi, setPilihanOpsi] = React.useState<string>("")
  const [multipleOpsi, setMultipleOpsi] = React.useState<string[]>([])
  const [pilihanOpsiText, setPilihanOpsiText] = React.useState<{ [key: string]: string }>({})
  const [multipleOpsiText, setMultipleOpsiText] = React.useState<{ [key: string]: string }>({})



  const columns: ColumnDef<Payment>[] = [
{
  id: "no",
  header: "No",
  cell: ({ row, table }) => {
    const visibleRows = table.getFilteredRowModel().rows
    const index = visibleRows.findIndex(r => r.id === row.id)
    return <div>{index + 1}</div>
  }
},

  {
  accessorKey: "soal",
  header: "Soal",
  // cell: ({ row }) => (
  //   <div className="capitalize">{row.getValue("soal")}</div>
  // ),
  enableSorting: false,
  enableColumnFilter: false,
    cell: ({ row }) => <div className="truncate overflow-hidden whitespace-nowrap max-w-[300px]">{row.getValue("soal")}</div>,
  },
  {
  accessorKey: "tipe",
  header: "Tipe",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("tipe")}</div>
  ),
  enableSorting: false,
  filterFn: (row, columnId, filterValue) => {
    if (!Array.isArray(filterValue)) return true
    return filterValue.includes(row.getValue(columnId))
  }
  },

{
  accessorKey: "poin",
  header: () => <div className="text-right">Poin</div>,
  cell: ({ row }) => {
    const tipe = row.original.tipe
    let poin = 0
    if (tipe === "essay") poin = 10
    else if (tipe === "pilihan berganda" || tipe === "multiple choice") poin = 5

    return <div className="text-right font-medium">{poin} poin</div>
  },
},

{
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const soal = row.original

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => {
                setCurrentSoal(soal)
                setNewSoalText(soal.soal)
                setEditDialog(true)
              }}
            >
              Edit <Edit className="ml-2 w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setCurrentSoal(soal)
                setDeleteDialog(true)
              }}
            >
              Delete <Trash className="ml-2 w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  },
}


]



  const table = useReactTable({
    data: dataSource,
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
  })

  React.useEffect(() => {
  if (selectedTipe.length === 0) {
    table.getColumn("tipe")?.setFilterValue(undefined)
  } else {
    table.getColumn("tipe")?.setFilterValue(selectedTipe)
  }
}, [selectedTipe])


  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='w-full max-w-5xl p-4 border-4 border-black'>
        <p className='font-bold mb-4 text-3xl'>Bank Soal</p>
        <div className="flex items-center gap-4 py-4">
          <Button onClick={() => setAddDialog(true)}>Tambah Soal</Button>
          <Input
            placeholder="Filter soal..."
            value={(table.getColumn("soal")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("soal")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Tipe Soal <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["essay", "pilihan berganda", "multiple choice"].map((tipe) => (
                <DropdownMenuCheckboxItem
                  key={tipe}
                  checked={selectedTipe.includes(tipe)}
                  onCheckedChange={(checked) => {
                    setSelectedTipe((prev) =>
                      checked ? [...prev, tipe] : prev.filter((t) => t !== tipe)
                    )
                  }}
                  className="capitalize"
                >
                  {tipe}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <div className="rounded-md">
          <Dialog open={editDialog} onOpenChange={setEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Soal</DialogTitle>
                <DialogDescription>Ubah isi soal di bawah ini</DialogDescription>
              </DialogHeader>
              <Input
                value={newSoalText}
                onChange={(e) => setNewSoalText(e.target.value)}
              />
              <DialogFooter>
                <Button
                  onClick={() => {
                    if (currentSoal) {
                      setDataSource((prev) =>
                        prev.map((item) =>
                          item.id === currentSoal.id ? { ...item, soal: newSoalText } : item
                        )
                      )
                    }
                    setEditDialog(false)
                  }}
                >
                  OK
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hapus Soal?</DialogTitle>
                <DialogDescription>Soal akan dihapus secara permanen.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialog(false)}>
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (currentSoal) {
                      setDataSource((prev) =>
                        prev.filter((item) => item.id !== currentSoal.id)
                      )
                    }
                    setDeleteDialog(false)
                  }}
                >
                  Ya, Hapus
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={addDialog} onOpenChange={setAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Soal</DialogTitle>
              <DialogDescription>Masukkan soal baru dan pilih tipenya</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Soal</label>
                <Input
                  value={newSoalInput}
                  onChange={(e) => setNewSoalInput(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Tipe Soal</label>
                <select
                  value={newTipeInput}
                  onChange={(e) => {
                    const tipe = e.target.value as Payment["tipe"]
                    setNewTipeInput(tipe)
                    // Reset opsi saat tipe soal berubah
                    setPilihanOpsi("")
                    setMultipleOpsi([])
                  }}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="essay">Essay</option>
                  <option value="pilihan berganda">Pilihan Berganda</option>
                  <option value="multiple choice">Multiple Choice</option>
                </select>
              </div>

              {/* Render opsi tambahan sesuai tipe soal */}
              {newTipeInput === "pilihan berganda" && (
                <div>
                  <label className="block mb-1 font-medium">Opsi Jawaban (Pilih salah satu)</label>
                  {["A", "B", "C", "D"].map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`pilihan-${opt}`}
                        name="pilihan-jawaban"
                        value={opt}
                        checked={pilihanOpsi === opt}
                        onChange={() => setPilihanOpsi(opt)}
                      />
                      <label htmlFor={`pilihan-${opt}`}>{opt}</label>
                      <Input
                        placeholder={`Keterangan ${opt}`}
                        value={pilihanOpsiText[opt] || ""}
                        onChange={(e) => {
                          setPilihanOpsiText(prev => ({
                            ...prev,
                            [opt]: e.target.value,
                          }))
                        }}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              )}

              {newTipeInput === "multiple choice" && (
                <div>
                  <label className="block mb-1 font-medium">Opsi Jawaban (Pilih lebih dari satu)</label>
                  {["A", "B", "C", "D"].map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`multiple-${opt}`}
                        value={opt}
                        checked={multipleOpsi.includes(opt)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMultipleOpsi(prev => [...prev, opt])
                          } else {
                            setMultipleOpsi(prev => prev.filter(v => v !== opt))
                          }
                        }}
                      />
                      <label htmlFor={`multiple-${opt}`}>{opt}</label>
                      <Input
                        placeholder={`Keterangan ${opt}`}
                        value={multipleOpsiText[opt] || ""}
                        onChange={(e) => {
                          setMultipleOpsiText(prev => ({
                            ...prev,
                            [opt]: e.target.value,
                          }))
                        }}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialog(false)}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  if (newSoalInput.trim()) {
                    const newItem: Payment = {
                      id: crypto.randomUUID(),
                      soal: newSoalInput.trim(),
                      tipe: newTipeInput,
                      // tambahkan opsi jawaban sesuai tipe
                      opsi:
                        newTipeInput === "pilihan berganda"
                          ? pilihanOpsiText
                          : newTipeInput === "multiple choice"
                          ? multipleOpsiText
                          : undefined,
                    }
                    setDataSource((prev) => [...prev, newItem])
                    setNewSoalInput("")
                    setNewTipeInput("essay")
                    setPilihanOpsi("")
                    setMultipleOpsi([])
                    setAddDialog(false)
                  }
                }}
              >
                Tambahkan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
