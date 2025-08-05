import AddUserButton from "@/components/AddUserButton";
import UserTable from "@/components/UserTable";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl h-auto mx-auto p-4 md:p-24">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-4xl font-bold">Users</h1>
        <AddUserButton />
      </div>
      <UserTable />
    </div>
  );
}
