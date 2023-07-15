"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboadColumn = {
  id: string
  label: string
  CreatedAt: string
}

export const columns: ColumnDef<BillboadColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
