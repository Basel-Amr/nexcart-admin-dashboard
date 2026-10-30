import { api } from "./axios";

/**
 * Retrieves all users (admin operation).
 *
 * @returns {Promise<Object>} The API response containing `count` and `users`.
 */
export async function getUsers() {
  const { data } = await api.get("/users/all");
  return data;
}

/**
 * Creates a user from the admin panel.
 *
 * @param {{username: string, email: string, password: string, phone?: string}} user User details.
 * @returns {Promise<Object>} The API response containing the created user.
 */
export async function createUser(user) {
  const { data } = await api.post("/users/add", user);
  return data;
}

/**
 * Retrieves a user by ID (admin operation).
 *
 * @param {string} id User ID.
 * @returns {Promise<Object>} The API response containing the user.
 */
export async function getUserById(id) {
  const { data } = await api.get(`/users/${encodeURIComponent(id)}`);
  return data;
}

/**
 * Updates a user's profile.
 *
 * @param {string} id User ID.
 * @param {{username?: string, phone?: string, avatar?: string}} changes Documented profile fields to update.
 * @returns {Promise<Object>} The API response containing the updated user.
 */
export async function updateUser(id, changes) {
  const { data } = await api.patch(
    `/users/${encodeURIComponent(id)}`,
    changes,
  );
  return data;
}

/**
 * Deletes a user (admin operation).
 *
 * @param {string} id User ID.
 * @returns {Promise<Object>} The API's success response.
 */
export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${encodeURIComponent(id)}`);
  return data;
}
