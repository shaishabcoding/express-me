import dotenv from 'dotenv';
import path from 'path';
import getEnv from '../util/env/getEnv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default {
  ip_address: getEnv('ip address', '0.0.0.0') as string,
  url: {
    database: getEnv('database url') as string,
  },
  node_env: getEnv('node env', 'development') as string,
  port: getEnv('port', 3000) as number,
  allowed_origins: getEnv<string>('allowed origins', []) as string[],
  bcrypt_salt_rounds: getEnv('bcrypt salt rounds') as string,
  stripe_api_secret: getEnv('stripe api secret') as string,
  google_maps: getEnv('google maps') as string,
  jwt: {
    jwt_secret: getEnv('jwt secret') as string,
    jwt_expire_in: getEnv('jwt expire in') as string,
    jwtRefreshSecret: getEnv('jwt refresh secret') as string,
    jwtRefreshExpiresIn: getEnv('jwt refresh expires in') as string,
  },
  payment: {
    stripe_secret_key: getEnv('stripe secret key') as string,
    stripe_webhook_secret: getEnv('stripe webhook secret') as string,
  },
  email: {
    from: getEnv('email from') as string,
    user: getEnv('email user') as string,
    port: getEnv('email port') as string,
    host: getEnv('email host') as string,
    pass: getEnv('email pass') as string,
  },
  admin: {
    email: getEnv('admin email') as string,
    password: getEnv('admin password') as string,
  },
  reset_pass_ui_link: getEnv('reset pass ui link') as string,
};
