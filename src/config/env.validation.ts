import { envSchema } from './env.schema';

export function validate(config: Record<string, any>) {
  const { data, error, success } = envSchema.safeParse(config);

  if (!success) {
    console.log(error);
    throw new Error(`Config validation error: ${error.message}`);
  }

  return data;
}
