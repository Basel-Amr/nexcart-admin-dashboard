# NexCart API layer

This directory contains the Axios client and service functions for the documented
Koda Store REST API. It keeps HTTP calls out of React components and returns the
backend's response body unchanged.

## Files

```text
src/api/
├── axios.js
├── auth.js
├── carts.js
├── orders.js
├── products.js
├── reviews.js
├── users.js
├── wishlists.js
└── README.md
```

## Configuration and authentication

Copy the root `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to the
documented production server or a compatible local API server. The client
defaults to the documented production URL if the variable is omitted. Restart
the Vite dev server after changing environment variables.

`axios.js` creates one shared Axios instance with a 15-second timeout,
`Accept: application/json`, and `withCredentials: true`. Credentials allow the
documented login endpoint's httpOnly `token` cookie to be sent on later requests.
The API also documents Bearer JWT authentication. If the application chooses
that scheme, call `setAuthToken(token)` with the token returned by `login()`;
call `setAuthToken(null)` to clear it. This token is held in memory only, not
persisted. The API documents no global authentication requirement: only
operations marked secured in Swagger require authentication, and admin routes
also require admin authorization.

The client does not rewrite server responses or wrap errors. Service functions
resolve to `response.data`. Axios errors reject unchanged: when the server
responds, inspect `error.response.status` and `error.response.data` (the
documented `Error` response has `success` and `message`); network and timeout
errors may not include a response. Several Swagger error responses have no
schema, so their body shape is not assumed.

## Service functions

All service functions are named exports and return the unmodified JSON response
body unless the endpoint has no documented JSON response. `id`, `productId`,
and `reviewId` arguments are path IDs; path values are URL-encoded by the
service.

### Authentication — `auth.js`

| Function | Parameters | Endpoint and result |
|---|---|---|
| `sendRegistrationOtp(registration)` | `{ username, email, password, phone? }` | `POST /auth/register/send-otp`; success response |
| `verifyRegistrationOtp(verification)` | `{ email, otp }` | `POST /auth/register/verify-otp`; success response |
| `login(credentials)` | `{ email, password }` | `POST /auth/login`; response includes `success`, `message`, `token`, and `user` |
| `logout()` | None | `POST /auth/logout`; success response |
| `sendPasswordResetOtp(request)` | `{ email }` | `POST /auth/forgot-password/send-otp`; success response |
| `verifyPasswordResetOtp(verification)` | `{ email, otp, newPassword }` | `POST /auth/forgot-password/verify-otp`; success response |
| `getCurrentUser()` | None | `GET /auth/me`; response includes `success` and `user` |
| `getAdminTest()` | None | `GET /auth/admin-test`; admin access response |
| `changeUserRole(roleChange)` | `{ userId, role: "admin" \| "customer" }` | `PATCH /auth/change-role`; response includes updated `user` |
| `setAuthToken(token)`* | JWT string or `null` | Sets/clears the optional in-memory bearer token; exported by `axios.js` |

### Users — `users.js`

| Function | Parameters | Endpoint and result |
|---|---|---|
| `getUsers()` | None | `GET /users/all`; `success`, `count`, and `users` |
| `createUser(user)` | `{ username, email, password, phone? }` | `POST /users/add`; created `user` |
| `getUserById(id)` | User ID | `GET /users/{id}`; `user` |
| `updateUser(id, changes)` | User ID; `{ username?, phone?, avatar? }` | `PATCH /users/{id}`; updated `user` |
| `deleteUser(id)` | User ID | `DELETE /users/{id}`; success response |

### Products — `products.js`

| Function | Parameters | Endpoint and result |
|---|---|---|
| `getProducts(params?)` | `page`, `limit`, `category`, `brand`, `minPrice`, `maxPrice`, `search`, `sort` (`price_asc`, `price_desc`, `rating`) | `GET /products`; pagination fields and `products` |
| `searchProducts(params?)` | `search`, `category`, `subcategory`, `brand`, comma-separated `tags`, `minPrice`, `maxPrice`, `sort` (`price_asc`, `price_desc`, `rating`, `popular`, `oldest`), `page`, `limit` | `GET /products/search`; pagination fields and `products` |
| `getProductById(id)` | Product ID | `GET /products/{id}`; `product` |
| `createProduct(product)` | `FormData` with required `name`, `shortDescription`, `description`, `price`, `stock`, `category`, and `images`; documented optional fields are `discountPrice`, `sku`, `subcategory`, `brand`, `tags`, `featured`, `isActive` | `POST /products` as `multipart/form-data`; created `product` |
| `updateProduct(id, changes)` | Product ID; `FormData` with optional product fields and images; `deletedImages` is a string | `PATCH /products/update/{id}` as `multipart/form-data`; updated `product` |
| `deleteProduct(id)` | Product ID | `DELETE /products/{id}`; success response |

Pass a browser-created `FormData` instance to the product create/update
functions. Do not set its `Content-Type` manually; Axios/the browser must add the
multipart boundary. Append image files under the documented `images` field.

### Reviews — `reviews.js`

| Function | Parameters | Endpoint and result |
|---|---|---|
| `getProductReviews(productId)` | Product ID | `GET /products/{id}/reviews`; `averageRating`, `numReviews`, and `reviews` |
| `addProductReview(productId, review)` | Product ID; `{ rating, comment }` | `POST /products/{id}/reviews`; created `review` and rating summary |
| `deleteProductReview(productId, reviewId)` | Product ID and review ID | `DELETE /products/{id}/reviews/{reviewId}`; updated rating summary |

### Carts — `carts.js`

| Function | Parameters | Endpoint and result |
|---|---|---|
| `getCart()` | None | `GET /carts`; cart response |
| `addCartItem(item)` | `{ productId, quantity? }` | `POST /carts/items`; cart totals and items |
| `updateCartItem(item)` | `{ productId, quantity }` | `PATCH /carts/items`; cart response |
| `removeCartItem(productId)` | Product ID | `DELETE /carts/items/{productId}`; cart response |
| `applyCoupon(coupon)` | `{ code }` | `POST /carts/coupon`; updated totals and coupon |
| `removeCoupon()` | None | `DELETE /carts/coupon`; updated totals |
| `clearCart()` | None | `DELETE /carts/clear`; success response |

### Orders — `orders.js`

| Function | Parameters | Endpoint and result |
|---|---|---|
| `createOrder(order)` | `{ shippingAddress, paymentMethod?, customerNote? }`; shipping address requires `fullName`, `phone`, `country`, `city`, and `address`, with optional `postalCode`; payment method is `cash`, `stripe`, `paypal`, or `paymob` | `POST /orders`; created `order` |
| `getMyOrders(params?)` | `page`, `limit`, `status` | `GET /orders/my`; pagination fields and `orders` |
| `getMyOrderById(id)` | Order ID | `GET /orders/my/{id}`; `order` |
| `cancelMyOrder(id)` | Order ID | `PATCH /orders/my/{id}/cancel`; updated `order` |
| `getAdminDashboard()` | None | `GET /orders/admin/dashboard`; dashboard response |
| `getAdminCarts(params?)` | `page`, `limit` | `GET /orders/admin/carts`; pagination fields and `carts` |
| `getAdminOrders(params?)` | `page`, `limit`, `status`, `paymentStatus`, `from`, `to`, `sortBy`, `sortDir` | `GET /orders/admin`; pagination fields and `orders` |
| `getAdminOrderById(id)` | Order ID | `GET /orders/admin/{id}`; `order` |
| `updateAdminOrderStatus(id, changes)` | Order ID; `{ status, adminNote? }` | `PATCH /orders/admin/{id}/status`; updated `order` |

Order statuses are `pending`, `confirmed`, `processing`, `shipped`, `delivered`,
`cancelled`, and `returned`. Payment statuses are `pending`, `paid`, `failed`,
and `refunded`. `from` and `to` use `YYYY-MM-DD`; `sortDir` is `asc` or `desc`.

### Wishlists — `wishlists.js`

| Function | Parameters | Endpoint and result |
|---|---|---|
| `addProductToWishlist(productId)` | Product ID | `POST /wishlists/add/{productId}`; response body as returned by the API |
| `removeProductFromWishlist(productId)` | Product ID | `DELETE /wishlists/remove/{productId}`; updated `wishlist` |
| `getMyWishlist()` | None | `GET /wishlists/my`; `totalProducts` and `wishlist` |
| `clearWishlist()` | None | `DELETE /wishlists/clear`; success response |
| `getAdminWishlists(params?)` | `page`, `limit` | `GET /wishlists/admin/all`; pagination fields and `wishlists` |
| `getAdminWishlistStats()` | None | `GET /wishlists/admin/stats`; `statistics` |

Swagger does not define a response schema for the `201` response from
`POST /wishlists/add/{productId}`. The service therefore returns the raw
`response.data` without assuming its shape.

## Usage

```jsx
import { useEffect, useState } from "react";
import { getUsers } from "../api/users";

export function Customers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers()
      .then((response) => setUsers(response.users))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ?? requestError.message,
        );
      });
  }, []);

  if (error) return <p role="alert">{error}</p>;
  return <p>{users.length} customers</p>;
}
```

The endpoint paths, request fields, query parameters, and response envelopes
above follow the linked Swagger/OpenAPI document. Some error responses have no
documented schema; their payloads are passed through as received.
