declare module 'config' {
  export const database: {
    name: string;
    host: string;
    port: number;
    username: string;
    password: string;
    sync: boolean;
    logging: boolean;
  }

  export const cache: {
    host: string;
    port: number;
    db: number;
    prefix: string;
    password: string;
  }

  export const jwt: {
    secret: string;
    algorithm: string;
    exp: number;
  }

  export const app: {
    perpage: number
  }

  export const sentry: {
    uri: string;
  }

  export const env: string
  export const port: number
}
