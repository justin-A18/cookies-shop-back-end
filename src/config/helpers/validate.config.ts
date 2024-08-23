import { envs } from '../envs.config';

export const validationHelper = (config: any) => {
  const parsed = envs.safeParse(config);
  if (!parsed.success) {
    throw new Error(`Config validation error: ${parsed.error}`);
  }
  return parsed.data;
};
