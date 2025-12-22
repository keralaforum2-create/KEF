declare module 'sib-api-v3-sdk' {
  export class ApiClient {
    static instance: ApiClient;
    authentications: { [key: string]: any };
  }

  export class TransactionalEmailsApi {
    sendTransacEmail(sendSmtpEmail: SendSmtpEmail): Promise<any>;
  }

  export class SendSmtpEmail {
    sender?: { name: string; email: string };
    to?: Array<{ email: string; name?: string }>;
    cc?: Array<{ email: string }>;
    subject?: string;
    htmlContent?: string;
  }

  export default {
    ApiClient,
    TransactionalEmailsApi,
    SendSmtpEmail,
  };
}
