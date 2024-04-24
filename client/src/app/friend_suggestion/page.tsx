"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
  Pagination,
  Button,
} from "@nextui-org/react";
import { columns, users } from "./data/data";
import { EyeIcon } from "./icon/EyeIcon";
import { EditIcon } from "./icon/EditIcon";
import { DeleteIcon } from "./icon/DeleteIcon";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { UserType } from "../types";
import Widget from "../widget";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type User = (typeof users)[0];

export default function FriendSuggestion() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;
  const [userData, setUserData] = useState<UserType | null>(null);

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Widget>
      <nav className="fixed z-40 w-full">
        <Navigation />
      </nav>
      <div className="h-screen flex justify-center items-center">
        <div className="flex-col content-center">
          <div className="flex justify-center mb-4">
            <p className="font-bold text-xl">Những người bạn có thể biết</p>
          </div>
          <div className="flex justify-center">
            <Table
              aria-label="Example table with custom cells"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="default"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[222px]",
              }}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center mt-6">
            <div>
              <Button
                // color="default"
                className="bg-[#9ae1e2] text-white"
                variant="flat"
                isLoading={isLoading}
                onClick={() => {
                  router.push("/home");
                  setLoading(true);
                }}
              >
                Bỏ qua
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  );
}
