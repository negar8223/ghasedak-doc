export const sendSingleSmsApiSpec = {
  openapi: "3.1.0",
  info: {
    // title: "Ghasedak - Send Single SMS",
    // description: "ارسال پیامک به یک گیرنده از طریق وب‌سرویس قاصدک.",
    // version: "1.0.0"
  },
  servers: [
    {
      url: "https://gateway.ghasedak.me/rest",
      description: "Production",
    },
  ],
  tags: [
    {
      name: "SMS",
      description: "ارسال پیامک و مدیریت ارسال‌ها",
    },
  ],
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
            description: "ارسال پیامک موفقیت‌آمیز بود.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isSuccess: {
                      type: "boolean",
                      example: true,
                    },
                    statusCode: {
                      type: "integer",
                      example: 200,
                    },
                    message: {
                      type: "string",
                      example: "",
                    },
                    data: {
                      type: "object",
                      properties: {
                        receptors: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          example: "0996*******",
                        },
                        lineNumber: {
                          type: "string",
                          example: "21*******",
                        },
                        cost: {
                          type: "integer",
                          example: 3537,
                        },
                        messageId: {
                          type: "string",
                          example: "4248",
                        },
                        clientReferenceId: {
                          type: "string",
                          example: "req-001",
                        },
                        message: {
                          type: "string",
                          example: "test dotnet package bulk",
                        },
                        sendDate: {
                          type: "string",
                          format: "date-time",
                          example: "2024-07-09T14:01:36.6632614+03:30",
                        },
                      },
                    },
                  },
                },
                example: {
                  isSuccess: true,
                  statusCode: 200,
                  message: "",
                  data: {
                    receptors: "21*******",
                    lineNumber: "21*******",
                    cost: 3537,
                    messageId: "4248",
                    clientReferenceId: "req-001",
                    message: "test dotnet package bulk",
                    sendDate: "2024-07-09T14:01:36.6632614+03:30",
                  },
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
