declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    TWILIO_SID: string;
    TWILIO_TOKEN: string;
    TWILIO_HARMONY_SID: string;
  }
}
