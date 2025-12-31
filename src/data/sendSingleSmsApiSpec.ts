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
      name: "ارسال تکی پیامک (SendSingleSMS)",
      description: `
<p>
متد ارسال تکی برای ارسال پیامک به یک شماره مقصد، به‌صورت ساده و مستقیم استفاده می‌شود.
این متد مناسب سناریوهایی است که نیاز به ارسال پیامک‌های فوری،
اطلاع‌رسانی یا پیام‌های تک‌کاربره دارند.<br/>در متد <b>SendSingleSMS</b> امکان کنترل نحوه انتخاب خط ارسال پیامک وجود دارد.
با استفاده از این قابلیت، می‌توانید مشخص کنید پیامک شما از چه خطی و با چه اولویتی ارسال شود.<br/>حالت‌های قابل استفاده برای انتخاب خط ارسال عبارت‌اند از:
</p>



  <p>
    <b>Priority<br />
    ارسال پیامک بر اساس اولویت خطوطی که کاربر در پنل کاربری تعریف کرده است.<br />
    (اولویت خطوط از بخش مدیریت خطوط در پنل کاربری قابل تنظیم است)
  </p>
  <br />
  <p>
    <b>Fastest<br />
    ارسال پیامک از سریع‌ترین خط اختصاصی موجود، با کم‌ترین زمان تحویل به گیرنده.
  </p>
  <br />
  <p>
    <b>Cheapest<br />
    ارسال پیامک از ارزان‌ترین خط اختصاصی، بر اساس تعرفه فعال کاربر.
  </p>

<p>
همچنین در صورتی که شماره خط اختصاصی به‌صورت مستقیم در درخواست وب‌سرویس مشخص شود،
پیامک بدون در نظر گرفتن اولویت‌ها، دقیقاً از همان خط ارسال خواهد شد.
</p>
`,
    },
  ],
  paths: {
    "/api/v1/WebService/SendSingleSms": {
      post: {
        summary: "پارامترهای ورودی",
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
                    description: "شماره گیرنده",
                  },
                  lineNumber: {
                    type: "string",
                    description:
                      "شماره فرستنده پیام که کیتواند شامل پارامترهای fastest-cheapest-priority یا شماره خط باشد.",
                  },
                  clientReferenceId: {
                    type: "string",
                    description:
                      "شناسه کاربر برای تعیین شماره ای یکتااز طرف کاربر برای هر پیامک به کار میرود و پس از ارسال پیامک میتوان با متد status کلیه اطلاعات پیام ارسال شده را دریافت کرد.",
                  },
                  sendDate: {
                    type: "string",
                    format: "date-time",
                    description:
                      "زمان‌بندی ارسال؛ در صورت خالی بودن، ارسال آنی است",
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
          },
        },
        responses: {
          "ارسال موفق (200)": {
            // description: "ارسال پیامک موفقیت‌آمیز بود.",
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
          "ارسال ناموفق (غیر200)": {
            // description: "ارسال پیامک موفقیت‌آمیز بود.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isSuccess: {
                      type: "boolean",
                      example: false,
                    },
                    statusCode: {
                      type: "integer",
                      example: 401,
                    },
                    message: {
                      type: "string",
                      example: "",
                    },
                    data: {
                      type: "object",
                     
                    },
                  },
                },
                example: {
                  isSuccess: false,
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
