"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import UpdateUserButton from "./UpdateUserButton";
import DeleteUserButton from "./DeleteUserButton";
import { useRouter } from "next/navigation";

const UserTableRow = ({ user }: { user: UserProps }) => {
  const router = useRouter();
  const { id, email, username, createdAt, updatedAt } = user;

  const handleRowClick = () => {
    router.push(`/user/${id}`);
  };

  return (
    <TableRow onClick={handleRowClick} className="cursor-pointer">
      <TableCell className="font-medium">{email}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{new Date(createdAt).toLocaleString("th-TH")}</TableCell>
      <TableCell>{new Date(updatedAt).toLocaleString("th-TH")}</TableCell>
      <TableCell className="flex justify-end gap-4">
        {/* stopPropagation เพื่อไม่ให้คลิกปุ่ม icon ไป trigger แถว */}
        <div onClick={(e) => e.stopPropagation()}>
          <UpdateUserButton userId={id} email={email} username={username} />
          <DeleteUserButton userId={id} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
