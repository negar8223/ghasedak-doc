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
<br/><br/>
<p>
چنانچه درخواست‌های ارسالی شما با خطای خاصی مواجه شد، برای آگاهی از دلایل آن می‌توانید از 
<a href="/#errors" target="_blank">جدول خطاها</a> کمک بگیرید.
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
        // description: `<table>
        // <thead>
        // <tr>
        // <th align="left">Body</th>
        // <th align="left">نوع</th>
        // <th align="left">توضیحات</th>
        // </tr>
        // </thead>
        // <tbody>
        // <tr>
        // <td><b>message</b><br/><span>required</span></td>
        // <td>string</td>
        // <td>متن پیامک</td>
        // </tr>
        // <tr>
        // <td><b>receptor</b><br/><span>required</span></td>
        // <td>string</td>
        // <td>شماره گیرنده</td>
        // </tr>
        // <tr>
        // <td><b>clientReferenceId</b></td>
        // <td>string</td>
        // <td>
        // شناسه کاربر برای تعیین شماره‌ای یکتا برای هر پیامک و پس از ارسال پیامک
        // می‌توان با متد <code>status</code> اطلاعات پیام ارسال شده را دریافت کرد.
        // </td>
        // </tr>
        // <tr>
        // <td><b>lineNumber</b></td>
        // <td>string</td>
        // <td>
        // شماره فرستنده پیام که می‌تواند شامل
        // <code>fastest</code>،
        // <code>cheapest</code>،
        // <code>priority</code>
        // یا شماره خط باشد.
        // </td>
        // </tr>
        // <tr>
        // <td><b>sendDate</b></td>
        // <td>string · date-time</td>
        // <td>زمان‌بندی ارسال؛ در صورت خالی بودن، ارسال آنی است</td>
        // </tr>
        // </tbody>
        // </table>`,
        "x-codeSamples": [
          {
            lang: "curl",
            label: "curl",
            source: `curl -X 'POST' \
    'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS' \
    -H 'accept: text/plain' \
    -H 'ApiKey: "your-apiKey' \
    -H 'Content-Type: application/json' \
    --data '{
      "items": [
        {
          "lineNumber": "21*******",
          "receptor": "0937*****",
          "message": "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
          "clientReferenceId": "1",
          "sendDate": "2024-07-20T07:18:57.128Z"
        },
        {
          "lineNumber": "21*******",
          "receptor": "0912*****",
          "message": "ارسال پیام دوم نظیر به نظیر از وب سرویس قاصدک",
          "clientReferenceId": "2",
          "sendDate": "2024-07-20T07:18:57.128Z"
        }
      ],
      "udh": false
    }'`,
          },
          {
            lang: "csharp",
            label: "C#",
            source: `using System;
  using System.Net.Http;
  using System.Text;
  using System.Threading.Tasks;
  using Newtonsoft.Json;
  using System.Collections.Generic;
  
  public class SmsItem
  {
      public string LineNumber { get; set; }
      public string Receptor { get; set; }
      public string Message { get; set; }
      public string ClientReferenceId { get; set; }
      public string SendDate { get; set; }
  }
  
  public class PairToPairSmsRequest
  {
      public List<SmsItem> Items { get; set; }
      public bool Udh { get; set; }
  }
  
  public class Program
  {
      public static async Task Main(string[] args)
      {
          var client = new HttpClient();
          client.DefaultRequestHeaders.Add("ApiKey", "your-apiKey");
          var request = new HttpRequestMessage(HttpMethod.Post, "https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS");
  
          var smsItem = new SmsItem
          {
              LineNumber = "21*******",
              Receptor = "0937*****",
              Message = "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
              ClientReferenceId = "1",
              SendDate = "2024-07-20T07:18:57.128Z"
          };
  
          var pairToPairSmsRequest = new PairToPairSmsRequest
          {
              Items = new List<SmsItem> { smsItem },
              Udh = false
          };
  
          var json = JsonConvert.SerializeObject(pairToPairSmsRequest);
          var content = new StringContent(json, Encoding.UTF8, "application/json");
          request.Content = content;
  
          var response = await client.SendAsync(request);
          response.EnsureSuccessStatusCode();
          Console.WriteLine(await response.Content.ReadAsStringAsync());
      }
  }`,
          },
          {
            lang: "php",
            label: "PHP",
            source: `<?php
  
  $curl = curl_init();
  
  curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
    "items": [
      {
        "lineNumber": "21*******",
        "receptor": "0937*****",
        "message": "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
        "clientReferenceId": "1",
        "sendDate": "2024-07-20T07:18:57.128Z"
      },
      {
        "lineNumber": "21*******",
        "receptor": "0912*****",
        "message": "ارسال پیام دوم نظیر به نظیر از وب سرویس قاصدک",
        "clientReferenceId": "2",
        "sendDate": "2024-07-20T07:18:57.128Z"
      }
    ],
    "udh": false
  }',
    CURLOPT_HTTPHEADER => array(
      'Content-Type: application/json',
      'ApiKey: "your-apiKey'
    ),
  ));
  
  $response = curl_exec($curl);
  
  curl_close($curl);
  echo $response;`,
          },
          {
            lang: "java",
            label: "Java",
            source: `import com.google.gson.Gson;
  import okhttp3.*;
  
  import java.io.IOException;
  import java.util.List;
  import java.util.Arrays;
  
  class SmsItem {
      private String lineNumber;
      private String receptor;
      private String message;
      private String clientReferenceId;
      private String sendDate;
  
      public SmsItem(String lineNumber, String receptor, String message, String clientReferenceId, String sendDate) {
          this.lineNumber = lineNumber;
          this.receptor = receptor;
          this.message = message;
          this.clientReferenceId = clientReferenceId;
          this.sendDate = sendDate;
      }
  }
  
  class PairToPairSmsRequest {
      private List<SmsItem> items;
      private boolean udh;
  
      public PairToPairSmsRequest(List<SmsItem> items, boolean udh) {
          this.items = items;
          this.udh = udh;
      }
  }
  
  public class Main {
      public static void main(String[] args) throws IOException {
          OkHttpClient client = new OkHttpClient();
  
          SmsItem firstItem = new SmsItem(
                  "21*******",
                  "0937*****",
                  "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
                  "1",
                  "2024-07-20T07:18:57.128Z"
          );
  
          PairToPairSmsRequest pairToPairSmsRequest = new PairToPairSmsRequest(
                  Arrays.asList(firstItem),
                  false
          );
  
          Gson gson = new Gson();
          String json = gson.toJson(pairToPairSmsRequest);
  
          RequestBody body = RequestBody.create(json, MediaType.parse("application/json"));
  
          Request request = new Request.Builder()
                  .url("https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS")
                  .post(body)
                  .addHeader("Content-Type", "application/json")
                  .addHeader("ApiKey", "your-apiKey")
                  .build();
  
          try (Response response = client.newCall(request).execute()) {
              if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
              System.out.println(response.body().string());
          }
      }
  }`,
          },
          {
            lang: "javascript",
            label: "Node.js",
            source: `var request = require('request');
  var options = {
    method: 'POST',
    url: 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS',
    headers: {
      'accept': 'text/plain',
      'ApiKey: "your-apiKey',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "items": [
        {
          "lineNumber": "21*******",
          "receptor": "0937*****",
          "message": "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
          "clientReferenceId": "1",
          "sendDate": "2024-07-20T07:18:57.128Z"
        },
        {
          "lineNumber": "21*******",
          "receptor": "0912*****",
          "message": "ارسال پیام دوم نظیر به نظیر از وب سرویس قاصدک",
          "clientReferenceId": "2",
          "sendDate": "2024-07-20T07:18:57.128Z"
        }
      ],
      "udh": false
    })
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });`,
          },
          {
            lang: "python",
            label: "Python",
            source: `import requests
  import json
  
  url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS"
  
  payload = json.dumps({
    "items": [
      {
        "lineNumber": "21*******",
        "receptor": "0937*****",
        "message": "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
        "clientReferenceId": "1",
        "sendDate": "2024-07-20T07:18:57.128Z"
      },
      {
        "lineNumber": "21*******",
        "receptor": "0912*****",
        "message": "ارسال پیام دوم نظیر به نظیر از وب سرویس قاصدک",
        "clientReferenceId": "2",
        "sendDate": "2024-07-20T07:18:57.128Z"
      }
    ],
    "udh": False
  })
  headers = {
    'accept': 'text/plain',
    'ApiKey: "your-apiKey',
    'Content-Type': 'application/json'
  }
  
  response = requests.request("POST", url, headers=headers, data=payload)
  
  print(response.text)`,
          },
          {
            lang: "go",
            label: "Go",
            source: `package main
  
  import (
      "bytes"
      "encoding/json"
      "fmt"
      "net/http"
      "io/ioutil"
  )
  
  type SmsItem struct {
      LineNumber       string \`json:"lineNumber"\`
      Receptor         string \`json:"receptor"\`
      Message          string \`json:"message"\`
      ClientReferenceId string \`json:"clientReferenceId"\`
      SendDate         string \`json:"sendDate"\`
  }
  
  type PairToPairSmsRequest struct {
      Items []SmsItem \`json:"items"\`
      Udh   bool      \`json:"udh"\`
  }
  
  func main() {
      url := "https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS"
  
      pairToPairSmsRequest := PairToPairSmsRequest{
          Items: []SmsItem{
              {
                  LineNumber:       "21*******",
                  Receptor:         "0937*****",
                  Message:          "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
                  ClientReferenceId: "1",
                  SendDate:         "2024-07-20T07:18:57.128Z",
              },
              {
                  LineNumber:       "21*******",
                  Receptor:         "0912*****",
                  Message:          "ارسال پیام دوم نظیر به نظیر از وب سرویس قاصدک",
                  ClientReferenceId: "2",
                  SendDate:         "2024-07-20T07:18:57.128Z",
              },
          },
          Udh: false,
      }
  
      jsonData, err := json.Marshal(pairToPairSmsRequest)
      if err != nil {
          fmt.Println("Error marshalling JSON:", err)
          return
      }
  
      req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
      if err != nil {
          fmt.Println("Error creating request:", err)
          return
      }
      req.Header.Set("Content-Type", "application/json")
      req.Header.Set("ApiKey", "your-apiKey")
  
      client := &http.Client{}
      res, err := client.Do(req)
      if err != nil {
          fmt.Println("Error sending request:", err)
          return
      }
      defer res.Body.Close()
  
      body, err := ioutil.ReadAll(res.Body)
      if err != nil {
          fmt.Println("Error reading response:", err)
          return
      }
      fmt.Println(string(body))
  }`,
          },
        ],
        responses: {
          "200": {
            description: "ارسال موفق.",
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
            description: "ارسال ناموفق.",
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
                      type: "null",
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
