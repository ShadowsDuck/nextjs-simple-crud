import { getUserById } from "@/lib/services/user";

export default async function Home({ params }: { params: { id: string } }) {
  const userId = params.id;

  const user = await getUserById(userId);

  return (
    <div>
      <h1>User: {userId}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
