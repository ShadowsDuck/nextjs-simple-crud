import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/lib/services/user";
import DeleteUserButton from "./DeleteUserButton";
import UpdateUserButton from "./UpdateUserButton";

interface UserProps {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserTable = async () => {
  const users = await getUsers();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(
          ({ id, email, username, createdAt, updatedAt }: UserProps) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{email}</TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>
                {new Date(createdAt).toLocaleString("th-TH")}
              </TableCell>
              <TableCell>
                {new Date(updatedAt).toLocaleString("th-TH")}
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex flex-row gap-4">
                  <UpdateUserButton
                    userId={id}
                    email={email}
                    username={username}
                  />
                  <DeleteUserButton userId={id} />
                </div>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
