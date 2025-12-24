import { ApiSpec } from "@/src/types";

export const apiSpec: ApiSpec = {
  meta: {
    title: "Example Scalar-like API",
    version: "v1",
    baseUrl: "https://api.example.com",
    intro:
      "A lightweight React-powered documentation shell modeled after Scalar. Replace this sample data with your real API schema in the next step."
  },
  tags: [
    {
      name: "Authentication",
      description: "Manage tokens and session lifecycle.",
      operations: [
        {
          id: "auth-login",
          method: "POST",
          path: "/auth/login",
          summary: "Create a session token",
          description:
            "Exchange user credentials for a JWT access token. Tokens expire after 60 minutes and can be refreshed with the refresh token endpoint.",
          parameters: [
            {
              name: "x-api-key",
              in: "header",
              required: true,
              type: "string",
              description: "Tenant-specific API key."
            }
          ],
          requestBody: {
            contentType: "application/json",
            example: {
              email: "user@example.com",
              password: "••••••••"
            }
          },
          responses: [
            {
              status: 200,
              description: "Successful authentication.",
              contentType: "application/json",
              example: {
                accessToken: "eyJhbGciOi...",
                refreshToken: "9af27e...",
                expiresIn: 3600
              }
            },
            {
              status: 401,
              description: "Invalid credentials."
            }
          ],
          codeSamples: [
            {
              lang: "bash",
              label: "cURL",
              code: `curl -X POST https://api.example.com/auth/login \\
  -H "x-api-key: YOUR_KEY" \\
  -H "content-type: application/json" \\
  -d '{"email":"user@example.com","password":"hunter2"}'`
            },
            {
              lang: "javascript",
              label: "fetch",
              code: `await fetch("https://api.example.com/auth/login", {
  method: "POST",
  headers: {
    "x-api-key": "YOUR_KEY",
    "content-type": "application/json"
  },
  body: JSON.stringify({ email, password })
});`
            }
          ]
        }
      ]
    },
    {
      name: "Payments",
      description: "Manage charges and refunds.",
      operations: [
        {
          id: "payment-create",
          method: "POST",
          path: "/payments",
          summary: "Create a payment",
          description:
            "Charge a customer using a saved payment method. The request is idempotent if an idempotency key is provided.",
          parameters: [
            {
              name: "Idempotency-Key",
              in: "header",
              required: false,
              type: "string",
              description: "Provide to avoid duplicate charges."
            }
          ],
          requestBody: {
            contentType: "application/json",
            example: {
              amount: 4200,
              currency: "USD",
              customerId: "cus_123",
              methodId: "card_987"
            }
          },
          responses: [
            {
              status: 201,
              description: "Payment created.",
              contentType: "application/json",
              example: {
                id: "pay_123",
                status: "succeeded",
                amount: 4200,
                currency: "USD"
              }
            },
            {
              status: 402,
              description: "Payment failed."
            }
          ],
          codeSamples: [
            {
              lang: "bash",
              label: "cURL",
              code: `curl -X POST https://api.example.com/payments \\
  -H "content-type: application/json" \\
  -H "Idempotency-Key: 5c4l4r-demo" \\
  -d '{"amount":4200,"currency":"USD","customerId":"cus_123","methodId":"card_987"}'`
            },
            {
              lang: "javascript",
              label: "fetch",
              code: `await fetch("https://api.example.com/payments", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "Idempotency-Key": "5c4l4r-demo"
  },
  body: JSON.stringify({
    amount: 4200,
    currency: "USD",
    customerId: "cus_123",
    methodId: "card_987"
  })
});`
            }
          ]
        },
        {
          id: "payment-refund",
          method: "POST",
          path: "/payments/{paymentId}/refunds",
          summary: "Refund a payment",
          description: "Issue a full or partial refund for a payment.",
          parameters: [
            {
              name: "paymentId",
              in: "path",
              required: true,
              type: "string",
              description: "Identifier of the payment to refund."
            }
          ],
          requestBody: {
            contentType: "application/json",
            example: {
              amount: 2000,
              reason: "requested_by_customer"
            }
          },
          responses: [
            {
              status: 201,
              description: "Refund created.",
              contentType: "application/json",
              example: {
                id: "rf_456",
                status: "pending",
                amount: 2000
              }
            }
          ],
          codeSamples: [
            {
              lang: "bash",
              label: "cURL",
              code: `curl -X POST https://api.example.com/payments/pay_123/refunds \\
  -H "content-type: application/json" \\
  -d '{"amount":2000,"reason":"requested_by_customer"}'`
            }
          ]
        }
      ]
    }
  ]
};