import { connect } from 'mongoose';
import config from '../../config';
import colors from 'colors';
import { errorLogger, logger } from '../../shared/logger';

export default async function connectDB() {
  try {
    await connect(config.database_url as string);
    logger.info(colors.green('🚀 Database connected successfully'));
  } catch (error) {
    errorLogger.error(colors.red('❌ Database connection failed!'), error);
    process.exit(1);
  }
}
