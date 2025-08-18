"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableRowsSkeleton,
} from "@/components/ui/table";
import { getAllTransactions } from "@/lib/api/user/queries";
import { PAGE_SIZE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ITransaction } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	ColumnDef,
	ColumnFiltersState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import Image from "next/image";
import * as React from "react";

export const columns: ColumnDef<ITransaction>[] = [
	{
		header: "Type / Time",
		cell: ({ row }) => {
			const { type, currency, dateCreated } = row.original;
			return (
				<div className="capitalize font-medium flex flex-col">
					<p>
						<span
							className={cn({
								"text-destructive": type.toLowerCase() === "sell",
								"text-[#008000]": type.toLowerCase() === "buy",
							})}
						>
							{type + " "}
						</span>
						<span>{currency}</span>
					</p>
					<p className="text-[#475569]">{dateCreated}</p>
				</div>
			);
		},
	},
	{
		header: "Amount / Rate",
		cell: ({ row }) => {
			const { amount, rate, currency } = row.original;
			return (
				<div>
					<p className="font-medium">
						{amount.toLocaleString()} {currency}
					</p>
					<p className="text-[#475467]">{rate.toLocaleString()} NGN</p>
				</div>
			);
		},
	},
	{
		header: "Title",
		cell: ({ row }) => {
			const { flow } = row.original;
			return <p className="text-[#475467] font-medium">{flow}</p>;
		},
	},
	{
		accessorKey: "orderNumber",
		header: "Order Number",
		cell: ({ row }) => {
			return (
				<div className="font-medium flex flex-wrap items-center gap-x-1 font-inter">
					<p className="text-wrap">{row.original.orderNumber}</p>
					<button className="shrink-0">
						<Image
							src="/assets/icons/copy.svg"
							alt="copy icon"
							width={18}
							height={18}
						/>
					</button>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Status / Action",
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<div className="font-inter capitalize">
					<p className="font-medium">{row.original.status}</p>
					<a
						href="#"
						className="text-[#008000]"
					>
						Download receipt
					</a>
				</div>
			);
		},
	},
];

export function TransactionsTable() {
	const [pageParams] = React.useState({
		pageIndex: 0,
		pageSize: PAGE_SIZE,
	});

	const { data: transactions, isFetching } = useQuery({
		queryKey: ["transactions", pageParams],
		queryFn: () =>
			getAllTransactions({
				page: pageParams.pageIndex,
				size: pageParams.pageSize,
			}),
		staleTime: 1000 * 60 * 5,
		placeholderData: keepPreviousData,
	});

	const [data] = React.useState(() => transactions ?? []);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full font-inter border-t border-t-[#21241D] border border-[#EAECF0] shadow-[0px_1px_3px_0px_#1018281A]">
			{/* <div className="py-5 px-6 border-b border-[#EAECF0]">
				<h3 className="text-[#101828] text-2xl font-semibold">
					Latest Transactions
				</h3>
			</div> */}
			<div className="flex items-center py-3 px-4">
				<div className="flex rounded-xl border border-[#D0D5DD] overflow-hidden">
					<Button className="rounded-none border-0 h-10">In progress</Button>
					<Button
						variant="outline"
						className="rounded-none border-0 h-10"
					>
						All
					</Button>
				</div>
				<div className="max-w-sm flex items-center px-3.5 py-2.5 ml-auto border border-[#D0D5DD] rounded-xl">
					<Search
						stroke="#667085"
						size={20}
					/>
					<Input
						placeholder="Search"
						value={
							(table.getColumn("orderNumber")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table.getColumn("orderNumber")?.setFilterValue(event.target.value)
						}
						className="text-[#667085] placeholder:text-[#667085] border-none shadow-none h-6"
					/>
				</div>
			</div>
			<div className="rounded-md">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className="xl:px-6 py-3.5"
											key={header.id}
										>
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
						{isFetching ? (
							<TableRowsSkeleton
								length={4}
								columnCount={columns.length}
							/>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											className="py-4 xl:px-6"
											key={cell.id}
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
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 p-2 px-3">
				<div className="text-muted-foreground flex-1 text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
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
	);
}
