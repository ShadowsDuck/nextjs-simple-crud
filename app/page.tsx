import AddUserButton from "@/components/AddUserButton";
import Search from "@/components/Search";
import UserTable from "@/components/UserTable";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";

  return (
    <div className="flex flex-col gap-4 max-w-7xl h-auto mx-auto p-4 md:p-24">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-4xl font-bold">Users</h1>
        <AddUserButton />
      </div>
      <Search />
      <UserTable query={query} />
    </div>
  );
}
