import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { EnvConfig } from './env.schema';

@Injectable()
export class ConfigService {
  constructor(
    private readonly nestConfigService: NestConfigService<EnvConfig, true> // true means all keys are required
  ) {}

  //   test() {
  //     const port = this.nestConfigService.get('PORT', { infer: true }); // infer: true means the return type is inferred from EnvConfig
  //   }

  get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
    return this.nestConfigService.get(key, { infer: true });
  }
}
