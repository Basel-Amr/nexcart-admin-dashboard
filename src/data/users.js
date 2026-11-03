const STORAGE_KEY = "nexcart-users";

/* =========================================
   DEFAULT USERS
========================================= */

const DEFAULT_USERS = [
  // Admin users
  {
    id: 1,
    username: "John Admin",
    email: "john.admin@nexcart.com",
    password: "Admin@123",
    phone: "+201000000001",
    role: "admin",
    verified: true,
  },
  {
    id: 2,
    username: "Sarah Admin",
    email: "sarah.admin@nexcart.com",
    password: "Admin@123",
    phone: "+201000000002",
    role: "admin",
    verified: true,
  },
  {
    id: 3,
    username: "Michael Admin",
    email: "michael.admin@nexcart.com",
    password: "Admin@123",
    phone: "+201000000003",
    role: "admin",
    verified: true,
  },
  {
    id: 4,
    username: "Emily Admin",
    email: "emily.admin@nexcart.com",
    password: "Admin@123",
    phone: "+201000000004",
    role: "admin",
    verified: false,
  },
  {
    id: 5,
    username: "David Admin",
    email: "david.admin@nexcart.com",
    password: "Admin@123",
    phone: "+201000000005",
    role: "admin",
    verified: true,
  },

  // Customer users
  {
    id: 6,
    username: "Ahmed Hassan",
    email: "ahmed@example.com",
    password: "Customer@123",
    phone: "+201000000006",
    role: "customer",
    verified: true,
  },
  {
    id: 7,
    username: "Omar Mohamed",
    email: "omar@example.com",
    password: "Customer@123",
    phone: "+201000000007",
    role: "customer",
    verified: true,
  },
  {
    id: 8,
    username: "Mariam Ali",
    email: "mariam@example.com",
    password: "Customer@123",
    phone: "+201000000008",
    role: "customer",
    verified: false,
  },
  {
    id: 9,
    username: "Youssef Khaled",
    email: "youssef@example.com",
    password: "Customer@123",
    phone: "+201000000009",
    role: "customer",
    verified: true,
  },
  {
    id: 10,
    username: "Nour Ibrahim",
    email: "nour@example.com",
    password: "Customer@123",
    phone: "+201000000010",
    role: "customer",
    verified: false,
  },
  {
    id: 11,
    username: "Salma Mostafa",
    email: "salma@example.com",
    password: "Customer@123",
    phone: "+201000000011",
    role: "customer",
    verified: true,
  },
  {
    id: 12,
    username: "Karim Adel",
    email: "karim@example.com",
    password: "Customer@123",
    phone: "+201000000012",
    role: "customer",
    verified: true,
  },
  {
    id: 13,
    username: "Farah Samir",
    email: "farah@example.com",
    password: "Customer@123",
    phone: "+201000000013",
    role: "customer",
    verified: false,
  },
  {
    id: 14,
    username: "Hassan Mahmoud",
    email: "hassan@example.com",
    password: "Customer@123",
    phone: "+201000000014",
    role: "customer",
    verified: true,
  },
  {
    id: 15,
    username: "Laila Tarek",
    email: "laila@example.com",
    password: "Customer@123",
    phone: "+201000000015",
    role: "customer",
    verified: false,
  },
];

/* =========================================
   STORAGE HELPERS
========================================= */

// Load users from localStorage.
// Insert default users only on the first visit.
const loadUsers = () => {
  try {
    const savedUsers = localStorage.getItem(STORAGE_KEY);

    if (savedUsers !== null) {
      const parsedUsers = JSON.parse(savedUsers);

      if (Array.isArray(parsedUsers)) {
        return parsedUsers;
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));

    return [...DEFAULT_USERS];
  } catch (error) {
    console.error("Error loading users:", error);
    return [...DEFAULT_USERS];
  }
};

// Save users to localStorage.
export const saveUsers = (users) => {
  if (!Array.isArray(users)) {
    throw new Error("Users must be an array.");
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return [...users];
  } catch (error) {
    console.error("Error saving users:", error);
    throw new Error("Unable to save users.");
  }
};

/* =========================================
   GET USERS
========================================= */

export const getUsers = () => {
  return loadUsers();
};

/* =========================================
   ADD USER
========================================= */

export const addUser = (userData) => {
  const users = getUsers();

  const username = userData.username?.trim();
  const email = userData.email?.trim().toLowerCase();

  if (!username || !email) {
    throw new Error("Username and email are required.");
  }

  const emailExists = users.some((user) => user.email?.toLowerCase() === email);

  if (emailExists) {
    throw new Error("A user with this email already exists.");
  }

  const role = userData.role || "customer";

  if (!["admin", "customer"].includes(role)) {
    throw new Error("Invalid user role.");
  }

  const newId = users.length
    ? Math.max(...users.map((user) => Number(user.id) || 0)) + 1
    : 1;

  const newUser = {
    id: newId,
    username,
    email,
    password: userData.password || "",
    phone: userData.phone?.trim() || "",
    role,
    verified: userData.verified ?? false,
  };

  saveUsers([...users, newUser]);

  return newUser;
};

/* =========================================
   UPDATE USER
========================================= */

export const updateUser = (userId, updatedData) => {
  const users = getUsers();

  const existingUser = users.find((user) => user.id === userId);

  if (!existingUser) {
    throw new Error("User not found.");
  }

  const username =
    updatedData.username !== undefined
      ? updatedData.username.trim()
      : existingUser.username;

  const email =
    updatedData.email !== undefined
      ? updatedData.email.trim().toLowerCase()
      : existingUser.email;

  if (!username || !email) {
    throw new Error("Username and email are required.");
  }

  const emailExists = users.some(
    (user) => user.id !== userId && user.email?.toLowerCase() === email,
  );

  if (emailExists) {
    throw new Error("Another user already uses this email.");
  }

  if (
    updatedData.role !== undefined &&
    !["admin", "customer"].includes(updatedData.role)
  ) {
    throw new Error("Invalid user role.");
  }

  const updatedUsers = users.map((user) =>
    user.id === userId
      ? {
          ...user,
          ...updatedData,
          username,
          email,
        }
      : user,
  );

  saveUsers(updatedUsers);

  return updatedUsers.find((user) => user.id === userId);
};

/* =========================================
   TOGGLE USER ROLE
========================================= */

export const toggleUserRole = (userId) => {
  const users = getUsers();

  const existingUser = users.find((user) => user.id === userId);

  if (!existingUser) {
    throw new Error("User not found.");
  }

  const updatedUsers = users.map((user) =>
    user.id === userId
      ? {
          ...user,
          role: user.role === "admin" ? "customer" : "admin",
        }
      : user,
  );

  saveUsers(updatedUsers);

  return updatedUsers.find((user) => user.id === userId);
};

/* =========================================
   DELETE USER
========================================= */

export const deleteUser = (userId) => {
  const users = getUsers();

  const userExists = users.some((user) => user.id === userId);

  if (!userExists) {
    throw new Error("User not found.");
  }

  const updatedUsers = users.filter((user) => user.id !== userId);

  saveUsers(updatedUsers);

  return updatedUsers;
};
