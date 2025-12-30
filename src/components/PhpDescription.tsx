import { useEffect, useState, useMemo } from "react";
import { Box, Paper, Stack, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

// تعریف استایل برای کامپوننت Item
const Item = styled(Paper)(({ theme }) => ({
  textAlign: "right",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  fontSize: "16px",
  //   fontWeight: "bold",
  backgroundColor: "#0f172a",
  width: "100%",
  color: "white",
}));

const programms = [
  {
    id: "php",
    details: [
      {
        type: "text",
        message: "برای نصب از کد زیر استفاده کنید:",
      },
      { type: "code", message: "composer require ghasedaksms/php" },
      {
        type: "text",
        message: "از کد زیر برای دسترسی به کلاس ها و وابستگی ها استفاده کنی :",
      },
      { type: "code", message: "require __DIR__ . '/vendor/autoload.php';" },
      {
        type: "text",
        message: "برای تعریف مقادیر اولیه از کد زیر استفاده کنید:",
      },
      {
        type: "code",
        message: `$apikey='a0419c511952cb1a8e1161feb3b0553aee18b933c3141dd0161cb785b33ae332WDW6V3ReqzQEMg9q';\n $ghasedaksms = new GhasedaksmsApi('your_api_key');`,
      },
      {
        type: "text",
        message:
          "از نمونه کد زیر برای دریافت اطلاعات کاربری میتوانید استفاده کنید:",
      },
      {
        type: "code",
        message: `var accountInfo = await client.GetAccountInformation();`,
      },
      {
        type: "text",
        message: "ار نمونه کد زیر برای ارسال پیامک به صورت تکی استفاده کنید:",
      },
      {
        type: "code",
        message: `$sendDate = new DateTimeImmutable('now');
        $lineNumber = '20008580';
        $receptor = '09962999643';
        $message = 'test';
        try {
            $response = $ghasedaksms->sendSingle(new SingleMessageDTO(
                sendDate: $sendDate,
                lineNumber: $lineNumber,
                receptor: $receptor,
                message: $message
            ));
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
      {
        type: "text",
        message: "برای ارسال پیامک گروهی از نمونه کد زیر استفاده کنید:",
      },
      {
        type: "code",
        message: `$sendDate = new DateTimeImmutable('now');
        $lineNumber = '20008580';
        $receptor = ['09962999643','0919*******'];
        $message = 'test';
        try {
            $response = $ghasedaksms->sendBulk(new BulkMessageDTO(
                sendDate: $sendDate,
                lineNumber: $lineNumber,
                receptors: $receptor,
                message: $message
            ));
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
      {
        type: "text",
        message:
          "برای ارسال پیامک گروهی نظیر به نظیر از نمونه کد زیر استفاده کنید:",
      },
      {
        type: "code",
        message: `$sendDate = new DateTimeImmutable('now');
        $lineNumber = '20008580';
        $receptor1 = '09962999643';
        $receptor2 = '0912*******';
        $message1 = 'test1';
        $message2 = 'test2';
        try {
            $response = $ghasedaksms->sendPairToPair(new PairToPairMessageDTO(
                [
                    new SingleMessageDTO(
                        sendDate: $sendDate,
                        lineNumber: $lineNumber,
                        receptor: $receptor1,
                        message: $message1
                    ),
                    new SingleMessageDTO(
                        sendDate: $sendDate,
                        lineNumber: $lineNumber,
                        receptor: $receptor2,
                        message: $message2
                    )
                ]
            ));
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
      {
        type: "text",
        message:
          "برای ارسال پیامک اعتبار سنجی به روش قدیمی (OTP) از نمونه کد زیر استفاده کنید:",
      },
      {
        type: "code",
        message: `$sendDate = new DateTimeImmutable('now');
        try {
            $response = $ghasedaksms->sendOtpWithParams(new OtpMessageWithParamsDTO(
                sendDate: $sendDate,
                receptors: [
                    new ReceptorDTO(
                        mobile: '09*********',
                        clientReferenceId: '1'
                    )
                ],
                templateName: 'newOtp',
                param1: 'param1',
                param2: 'param2'
            ));
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
      {
        type: "text",
        message:
          "برای ارسال پیامک اعتبار سنجی به روش جدید (OTP) از نمونه کد زیر استفاده کنید:",
      },
      {
        type: "code",
        message: `$sendDate = new DateTimeImmutable('now');
        try {
            $response = $ghasedaksms->sendOtp(new OtpMessageDTO(
                sendDate: $sendDate,
                receptors: [
                    new ReceptorDTO(
                        mobile: '09*********',
                        clientReferenceId: '1'
                    )
                ],
                templateName: 'newOtp',
                inputs: [
                    new InputDTO(
                        param: 'Code',
                        value: 'value'
                    ),
                    new InputDTO(
                        param: 'Name',
                        value: 'value'
                    )
                ]
            ));
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
      {
        type: "text",
        message:
          "از نمونه کد زیر برای دریافت پارامتر های قالب OTP استفاده نمایید:",
      },
      {
        type: "code",
        message: `try {
            $response = $ghasedaksms->getOtpTemplateParameters(
                new GetOtpTemplateParametersDTO(
                    templateName: 'newOtp'
                )
            );
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
      {
        type: "text",
        message: "از نمونه کد زیر برای دریافت وضعیت پیام استفاده کنید:",
      },
      {
        type: "code",
        message: `try {
            $response = $ghasedaksms->checkSmsStatus(new CheckSmsStatusDTO(
                ids: ['246*****'],
                type: 1
            ));
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
      {
        type: "text",
        message: "از نمونه کد زیر برای دریافت پیام های دریافتی استفاده کنید:",
      },
      {
        type: "code",
        message: `try {
            $response = $ghasedaksms->getReceivedSMSes(
                new GetReceivedSMSesDTO(
                    lineNumber: '20008580'
                )
            );
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
      {
        type: "text",
        message:
          "از نمونه کد زیر برای دریافت پیام های دریافتی به صورت صفحه بندی شده استفاده کنید:",
      },
      {
        type: "code",
        message: `$startDate = new DateTimeImmutable('now');
        $endDate = $startDate->modify('+3 days');
        try {
            $response = $ghasedaksms->getReceivedSMSesPaging(
                new GetReceivedSMSesPagingDTO(
                    lineNumber: '20008580',
                    startDate: $startDate,
                    endDate: $endDate,
                    pageIndex: 0,
                    pageSize: 10
                )
            );
            var_dump($response);
        } catch (ExceptionsGhasedakSMSException $e) {
            var_dump($e->getMessage());
        }`,
      },
    ],
  },
];

const PhpDescription: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("php"); // برای استفاده از تب‌ها

  return (
    <div>
      <Grid marginBottom={4} component="div">
        <Item sx={{ fontSize: "20px", fontWeight: "bold", marginBottom: 3 }}>
          راهنما نصب:
        </Item>
        {programms
          ?.filter((item) => item?.id === currentTab)[0]
          ?.details?.map((item, index) => {
            if (item?.type === "text") {
              return (
                <Item key={index} sx={{ pr: 1, paddingBottom: 2 }}>
                  {item?.message}
                </Item>
              );
            }
            if (item?.type === "code") {
              return (
                <Stack key={index} sx={{ paddingBottom: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <SyntaxHighlighter
                      customStyle={{
                        textAlign: "left",
                        direction: "ltr",
                        border: "1px solid #797373",
                        borderRadius: 7,
                        backgroundColor: "#0b1224",
                        color: "#f8f8f2",
                        padding: "20px",
                        width: "100%",
                        overflowX: "auto",
                      }}
                      language={currentTab}
                      style={xonokai}
                    >
                      {item?.message}
                    </SyntaxHighlighter>
                  </Box>
                </Stack>
              );
            }
            return null;
          })}
      </Grid>
    </div>
  );
};

export default PhpDescription;
