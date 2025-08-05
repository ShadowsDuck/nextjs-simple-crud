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

const UserTable = async ({ query }: { query: string }) => {
  const users = await getUsers(query);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Email</TableHead>
          <TableHead className="w-[250px]">Username</TableHead>
          <TableHead className="w-[250px]">Created At</TableHead>
          <TableHead className="w-[250px]">Updated At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map(
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
          )
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center p-4">
              <p className="text-gray-500 font-semibold">Not Found</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
