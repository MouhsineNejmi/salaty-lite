import config from './';
import { getLogger } from '@salaty/logger';

const logger: any = getLogger(config.service_name, config.log_level);

export default logger;
