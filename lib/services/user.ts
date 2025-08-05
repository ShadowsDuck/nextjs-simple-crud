export async function getUsers() {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    console.error("getUsers error:", error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.error("getUserById error:", error);
    throw error;
  }
}

export async function createUser(data: {
  email: string;
  username: string;
  password: string;
}) {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Failed to create user");
    }

    return res.json();
  } catch (error) {
    console.error("createUser error:", error);
    throw error;
  }
}

export async function updateUser(
  id: string,
  data: {
    email?: string;
    username?: string;
    password?: string;
  }
) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Failed to update user");
    }

    return res.json();
  } catch (error) {
    console.error("updateUser error:", error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Failed to delete user");
    }

    return res.json();
  } catch (error) {
    console.error("deleteUser error:", error);
    throw error;
  }
}
