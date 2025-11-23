"use client";

import * as React from "react";
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
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Barber } from "../page";

// Type for filtering - assuming reservation data structure
type ReservationData = {
  barber?: { _id: string };
  schedule?: { scheduled_time: string };
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  filterPlaceholder?: string;
  barbers?: Barber[];
  loadingBarbers?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn = "customerName",
  filterPlaceholder = "Cari berdasarkan nama...",
  barbers = [],
  loadingBarbers = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [selectedBarber, setSelectedBarber] = React.useState<string>("all");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  // Filter data based on barber and date
  const filteredData = React.useMemo(() => {
    let filtered = data;

    // Filter by barber
    if (selectedBarber !== "all") {
      filtered = filtered.filter((item: TData) => {
        return (
          (item as unknown as ReservationData).barber?._id === selectedBarber
        );
      });
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter((item: TData) => {
        const scheduledTime = (item as unknown as ReservationData).schedule
          ?.scheduled_time;
        if (!scheduledTime) return false;
        const itemDate = new Date(scheduledTime);
        return (
          itemDate.getDate() === selectedDate.getDate() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    return filtered;
  }, [data, selectedBarber, selectedDate]);

  const handleResetFilters = () => {
    setSelectedBarber("all");
    setSelectedDate(undefined);
  };

  const table = useReactTable({
    data: filteredData,
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
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 60,
      maxSize: 500,
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* Filters Section */}
      <div className="flex flex-col gap-4 py-4 px-1 flex-shrink-0 border-b bg-gray-50/50">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Barber Filter */}
          <div className="flex-1 min-w-0">
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Tukang Pangkas
            </label>
            <Select
              value={selectedBarber}
              onValueChange={setSelectedBarber}
              disabled={loadingBarbers}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih tukang pangkas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tukang Pangkas</SelectItem>
                {barbers.map((barber) => (
                  <SelectItem key={barber._id} value={barber._id}>
                    {barber.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Filter */}
          <div className="flex-1 min-w-0">
            <label className="text-xs font-medium text-gray-700 mb-1.5 block">
              Tanggal
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "EEEE, dd MMMM yyyy", {
                      locale: localeId,
                    })
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                  locale={localeId}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              disabled={selectedBarber === "all" && !selectedDate}
              className="w-full md:w-auto"
            >
              <X className="mr-2 h-4 w-4" />
              Reset Filter
            </Button>
          </div>
        </div>

        {/* Filter Summary */}
        {(selectedBarber !== "all" || selectedDate) && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-800">
              <span className="font-medium">Filter aktif:</span>{" "}
              {selectedBarber !== "all" && (
                <span>
                  Tukang Pangkas:{" "}
                  <span className="font-semibold">
                    {barbers.find((b) => b._id === selectedBarber)?.name}
                  </span>
                </span>
              )}
              {selectedBarber !== "all" && selectedDate && " | "}
              {selectedDate && (
                <span>
                  Tanggal:{" "}
                  <span className="font-semibold">
                    {format(selectedDate, "EEEE, dd MMMM yyyy", {
                      locale: localeId,
                    })}
                  </span>
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 flex-shrink-0">
        {/* Search Input */}
        <div className="w-full md:flex-1 lg:flex-initial lg:w-96">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder={filterPlaceholder}
              value={
                (table.getColumn(filterColumn)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(filterColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="pl-8 w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Column visibility dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-initial">
                Kolom <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-medium"
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                        maxWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.getSize(),
                          maxWidth: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    Tidak ada data ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4 flex-shrink-0">
        {/* Pagination Size Selector */}
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Baris per halaman:</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                {table.getState().pagination.pageSize === data.length
                  ? "Semua"
                  : table.getState().pagination.pageSize}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(value) => {
                  if (value === "all") {
                    table.setPageSize(data.length);
                  } else {
                    table.setPageSize(Number(value));
                  }
                }}
              >
                <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="all">
                  Semua ({filteredData.length})
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Pagination Info & Controls */}
        <div className="flex items-center space-x-6">
          <div className="text-sm text-muted-foreground">
            Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
