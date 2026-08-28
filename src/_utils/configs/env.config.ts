import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';
import { exit } from 'process';

export class ServerConfig {
  @IsNumber()
  PORT: number;

  @IsString()
  BACKEND_URL: string;
}

export class DatabaseConfig {
  @IsString()
  MONGODB_VERSION: string;

  @IsNumber()
  MONGODB_PORT: number;

  @IsString()
  MONGODB_URI: string;

  @IsString()
  MONGODB_DBNAME: string;

  @IsBoolean()
  SMTP_PREVIEW: boolean;
}

export class RustfsConfig {
  @IsString()
  RUSTFS_VERSION: string;

  @IsString()
  RUSTFS_URL: string;

  @IsNumber()
  RUSTFS_PORT: number;

  @IsNumber()
  RUSTFS_INTERFACE_PORT: number;

  @IsString()
  RUSTFS_ACCESS_KEY: string;

  @IsString()
  RUSTFS_SECRET_KEY: string;

  @IsString()
  RUSTFS_BUCKET_NAME: string;
}

export class CryptographyConfig {
  @IsNumber()
  SALT_ROUND: number;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRATION: number;

  @IsNumber()
  REFRESH_TOKEN_EXPIRATION_DAYS: number;
}

export class OnApplicationBootstrapConfig {
  @IsString()
  ADMIN_EMAIL: string;

  @IsString()
  ADMIN_NAME: string;

  @IsString()
  ADMIN_LASTNAME: string;

  @IsString()
  ADMIN_PASSWORD: string;
}

export class EnvironmentVariables {
  @ValidateNested()
  @Type(() => ServerConfig)
  SERVER: ServerConfig;

  @ValidateNested()
  @Type(() => DatabaseConfig)
  DATABASE: DatabaseConfig;

  @ValidateNested()
  @Type(() => RustfsConfig)
  RUSTFS: RustfsConfig;

  @ValidateNested()
  @Type(() => CryptographyConfig)
  CRYPTOGRAPHY: CryptographyConfig;

  @ValidateNested()
  @Type(() => OnApplicationBootstrapConfig)
  ON_APPLICATION_BOOTSTRAP: OnApplicationBootstrapConfig;
}

export function validateEnv(config: Record<string, unknown>) {
  const structuredConfig = {
    SERVER: {
      PORT: config.PORT,
      BACKEND_URL: config.BACKEND_URL,
    },

    DATABASE: {
      MONGODB_VERSION: config.MONGODB_VERSION,
      MONGODB_PORT: config.MONGODB_PORT,
      MONGODB_URI: config.MONGODB_URI,
      MONGODB_DBNAME: config.MONGODB_DBNAME,
      SMTP_PREVIEW: config.SMTP_PREVIEW,
    },

    RUSTFS: {
      RUSTFS_VERSION: config.RUSTFS_VERSION,
      RUSTFS_URL: config.RUSTFS_URL,
      RUSTFS_PORT: config.RUSTFS_PORT,
      RUSTFS_INTERFACE_PORT: config.RUSTFS_INTERFACE_PORT,
      RUSTFS_ACCESS_KEY: config.RUSTFS_ACCESS_KEY,
      RUSTFS_SECRET_KEY: config.RUSTFS_SECRET_KEY,
      RUSTFS_BUCKET_NAME: config.RUSTFS_BUCKET_NAME,
    },

    CRYPTOGRAPHY: {
      SALT_ROUND: config.SALT_ROUND,
      JWT_SECRET: config.JWT_SECRET,
      JWT_EXPIRATION: config.JWT_EXPIRATION,
      REFRESH_TOKEN_EXPIRATION_DAYS: config.REFRESH_TOKEN_EXPIRATION_DAYS,
    },

    ON_APPLICATION_BOOTSTRAP: {
      ADMIN_EMAIL: config.ADMIN_EMAIL,
      ADMIN_NAME: config.ADMIN_NAME,
      ADMIN_LASTNAME: config.ADMIN_LASTNAME,
      ADMIN_PASSWORD: config.ADMIN_PASSWORD,
    },
  };

  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    structuredConfig,
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    new Logger(validateEnv.name).error(errors.toString());
    exit();
  }

  return validatedConfig;
}
