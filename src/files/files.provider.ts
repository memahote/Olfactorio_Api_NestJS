import { S3Client } from '@aws-sdk/client-s3';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const S3_CLIENT_TOKEN = 'RustfsClient';

export const FilesProvider: Provider[] = [
  {
    provide: S3_CLIENT_TOKEN,
    useFactory: (configService: ConfigService) => {
      const s3Endpoint = configService.getOrThrow<string>('RUSTFS_URL');
      const s3AccessKey = configService.getOrThrow<string>('RUSTFS_ACCESS_KEY');
      const s3SecretKey = configService.getOrThrow<string>('RUSTFS_SECRET_KEY');
      return new S3Client({
        endpoint: s3Endpoint,
        region: 'eu-west-2',
        credentials: {
          accessKeyId: s3AccessKey,
          secretAccessKey: s3SecretKey,
        },
        forcePathStyle: true,
      });
    },
    inject: [ConfigService],
  },
];