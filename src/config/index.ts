import './configure';

export default {
  server: {
    ip_address: 'ip address'.getEnv('0.0.0.0'),
    node_env: 'node env'.getEnv('development'),
    port: 'port'.getEnv(3000),
  },
  url: {
    database: 'database url'.getEnv(),
    reset_pass_ui: 'reset pass ui link'.getEnv(),
  },
  allowed_origins: 'allowed origins'.getEnv<string[]>([]),
  bcrypt_salt_rounds: 'bcrypt salt rounds'.getEnv(10),
  google_maps: 'google maps'.getEnv(),
  jwt: {
    access_token: {
      secret: 'jwt secret'.getEnv(),
      expire_in: 'jwt expire in'.getEnv(),
    },
    refresh_token: {
      secret: 'jwt refresh secret'.getEnv(),
      expire_in: 'jwt refresh expire in'.getEnv(),
    },
  },
  payment: {
    stripe: {
      key: 'stripe api key'.getEnv(),
      secret: 'stripe api secret'.getEnv(),
      webhook: 'stripe webhook secret'.getEnv(),
    },
  },
  email: {
    from: 'email from'.getEnv(),
    user: 'email user'.getEnv(),
    port: 'email port'.getEnv(587),
    host: 'email host'.getEnv(),
    pass: 'email pass'.getEnv(),
  },
  admin: {
    email: 'admin email'.getEnv(),
    password: 'admin password'.getEnv(),
  },
};
