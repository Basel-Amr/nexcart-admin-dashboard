import { api } from "./axios";

/**
 * Sends an OTP to register an account.
 *
 * @param {{username: string, email: string, password: string, phone?: string}} registration Registration details.
 * @returns {Promise<Object>} The API's success response.
 */
export async function sendRegistrationOtp(registration) {
  const { data } = await api.post("/auth/register/send-otp", registration);
  return data;
}

/**
 * Verifies a registration OTP and creates the account.
 *
 * @param {{email: string, otp: string}} verification Registration email and OTP.
 * @returns {Promise<Object>} The API's success response.
 */
export async function verifyRegistrationOtp(verification) {
  const { data } = await api.post("/auth/register/verify-otp", verification);
  return data;
}

/**
 * Authenticates with email and password.
 *
 * @param {{email: string, password: string}} credentials Login credentials.
 * @returns {Promise<Object>} The API response, including the documented token and user fields.
 */
export async function login(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

/**
 * Logs out the current session.
 *
 * @returns {Promise<Object>} The API's success response.
 */
export async function logout() {
  const { data } = await api.post("/auth/logout");
  return data;
}

/**
 * Sends a password-reset OTP to an account email.
 *
 * @param {{email: string}} request Account email.
 * @returns {Promise<Object>} The API's success response.
 */
export async function sendPasswordResetOtp(request) {
  const { data } = await api.post("/auth/forgot-password/send-otp", request);
  return data;
}

/**
 * Verifies a password-reset OTP and sets the new password.
 *
 * @param {{email: string, otp: string, newPassword: string}} verification Reset email, OTP, and new password.
 * @returns {Promise<Object>} The API's success response.
 */
export async function verifyPasswordResetOtp(verification) {
  const { data } = await api.post(
    "/auth/forgot-password/verify-otp",
    verification,
  );
  return data;
}

/**
 * Retrieves the currently authenticated user.
 *
 * @returns {Promise<Object>} The API response containing the current user.
 */
export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data;
}

/**
 * Calls the documented admin-only access test endpoint.
 *
 * @returns {Promise<Object>} The API's admin access response.
 */
export async function getAdminTest() {
  const { data } = await api.get("/auth/admin-test");
  return data;
}

/**
 * Changes a user's role as an administrator.
 *
 * @param {{userId: string, role: "admin"|"customer"}} roleChange User ID and new role.
 * @returns {Promise<Object>} The API response containing the updated user.
 */
export async function changeUserRole(roleChange) {
  const { data } = await api.patch("/auth/change-role", roleChange);
  return data;
}
