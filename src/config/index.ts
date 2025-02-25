import dotenv from 'dotenv';
import { resolve } from 'path';
import e from '../util/env/getEnv';

dotenv.config({ path: resolve(process.cwd(), '.env') });

export default {
  server: {
    ip_address: e('ip address', '0.0.0.0') as string,
    node_env: e('node env', 'development') as string,
    port: e('port', 3000) as number,
  },
  url: {
    database: e('database url') as string,
    reset_pass_ui: e('reset pass ui link') as string,
  },
  allowed_origins: e<string>('allowed origins', []) as string[],
  bcrypt_salt_rounds: e('bcrypt salt rounds', 10) as number,
  google_maps: e('google maps') as string,
  jwt: {
    access_token: {
      secret: e('jwt secret') as string,
      expire_in: e('jwt expire in') as string,
    },
    refresh_token: {
      secret: e('jwt refresh secret') as string,
      expire_in: e('jwt refresh expire in') as string,
    },
  },
  payment: {
    stripe: {
      key: e('stripe api key') as string,
      secret: e('stripe api secret') as string,
      webhook: e('stripe webhook secret') as string,
    },
  },
  email: {
    from: e('email from') as string,
    user: e('email user') as string,
    port: e('email port') as string,
    host: e('email host') as string,
    pass: e('email pass') as string,
  },
  admin: {
    email: e('admin email') as string,
    password: e('admin password') as string,
  },
};
