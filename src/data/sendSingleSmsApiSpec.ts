export const sendSingleSmsApiSpec = {
  openapi: "3.1.0",
  // info: {
  //   // title: "Ghasedak - Send Single SMS",
  //   // description: "ارسال پیامک به یک گیرنده از طریق وب‌سرویس قاصدک.",
  //   // version: "1.0.0"
  // },
  // servers: [
  //   {
  //     url: "https://gateway.ghasedak.me/rest",
  //     description: "Production"
  //   }
  // ],
  // tags: [
  //   {
  //     name: "SMS",
  //     description: "ارسال پیامک و مدیریت ارسال‌ها"
  //   }
  // ],
  paths: {
    "/api/v1/WebService/SendSingleSms": {
      post: {
        summary: "ارسال پیامک تکی",
        description:
          ".ارسال پیامک به یک گیرنده با استفاده از متن و شماره فرستنده",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["message", "receptor", "sender"],
                properties: {
                  message: {
                    type: "string",
                    description: "متن پیامک",
                  },
                  receptor: {
                    type: "string",
                    description: "شماره گیرنده (MSISDN)",
                  },
                  sender: {
                    type: "string",
                    description: "شماره اختصاصی ارسال‌کننده",
                  },
                  sendDateTime: {
                    type: "string",
                    format: "date-time",
                    description:
                      "زمان‌بندی ارسال؛ در صورت خالی بودن، ارسال آنی است",
                  },
                  clientId: {
                    type: "string",
                    description: "شناسه دلخواه برای رهگیری درخواست",
                  },
                },
              },
              example: {
                message: "کد تایید شما: 123456",
                receptor: "989123456789",
                sender: "10008512",
                sendDateTime: null,
                clientId: "req-001",
              },
            },
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["message", "receptor", "sender"],
                properties: {
                  message: {
                    type: "string",
                    description: "متن پیامک",
                  },
                  receptor: {
                    type: "string",
                    description: "شماره گیرنده (MSISDN)",
                  },
                  sender: {
                    type: "string",
                    description: "شماره اختصاصی ارسال‌کننده",
                  },
                  sendDateTime: {
                    type: "string",
                    description:
                      "زمان‌بندی ارسال؛ در صورت خالی بودن، ارسال آنی است",
                  },
                  clientId: {
                    type: "string",
                    description: "شناسه دلخواه برای رهگیری درخواست",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "integer", description: "کد وضعیت" },
                    message: { type: "string", description: "توضیح نتیجه" },
                    messageId: {
                      type: "string",
                      description: "شناسه پیامک ثبت‌شده",
                    },
                    cost: { type: "number", description: "هزینه ارسال" },
                  },
                },
                example: {
                  status: 200,
                  message: "",
                  messageId: "982341234",
                  cost: 120,
                },
              },
            },
          },
          "400": {
            description: "ورودی نامعتبر یا داده‌های ناقص.",
          },
          "401": {
            description: "احراز هویت ناموفق.",
          },
          "429": {
            description: "محدودیت نرخ ارسال.",
          },
          "500": {
            description: "خطای داخلی سرویس.",
          },
        },
        // security: [
        //   {
        //     ApiKeyAuth: []
        //   }
        // ]
      },
    },
  },
  // components: {
  //   securitySchemes: {
  //     ApiKeyAuth: {
  //       type: "apiKey",
  //       in: "header",
  //       name: "apikey",
  //       description: "کلید دسترسی شما برای وب‌سرویس"
  //     }
  //   }
  // }
};
