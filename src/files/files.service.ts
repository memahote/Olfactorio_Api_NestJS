import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MemoryStoredFile } from 'nestjs-form-data';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_CLIENT_TOKEN } from './files.provider';
import { FilesMapper } from './files.mapper';
import { FilesDirectoryPrivacyValues } from './_utils/types/files-directory-privacy-values.types';
import { FilesDirectoryValues } from './_utils/types/files-directory-values.types';
import { Files } from './_utils/types/files.types';
import { FilesRepository } from './files.repository';
import { Exceptions } from 'src/_utils/exceptions/exceptions';

@Injectable()
export class FilesService {
  private readonly BUCKET_NAME: string;
  private readonly RUSTFS_URL: string;
  private readonly PRESIGNED_URL_EXPIRATION_TIME = 3600;

  constructor(
    @Inject(S3_CLIENT_TOKEN) private readonly s3Client: S3Client,
    private readonly configService: ConfigService,
    private readonly filesMapper: FilesMapper,
    private readonly filesRepository: FilesRepository,
  ) {
    this.BUCKET_NAME =
      this.configService.getOrThrow<string>('RUSTFS_BUCKET_NAME');
    this.RUSTFS_URL = this.configService.getOrThrow<string>('RUSTFS_URL');
  }

  async uploadFile(
    file: MemoryStoredFile,
    filesPrivacyDirectoryValues: FilesDirectoryPrivacyValues,
    filesDirectoryType: FilesDirectoryValues,
  ): Promise<Files> {
    const key = this.filesMapper.buildFileKey(
      filesPrivacyDirectoryValues,
      filesDirectoryType,
    );

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const fileData = this.filesMapper.toUploadedFile(
      this.BUCKET_NAME,
      key,
      file,
    );

    return this.filesRepository.create(fileData);
  }

  async getFileById(id: string) {
    return this.filesRepository.findById(id);
  }

  async deleteFile(file: Files) {
    await this.filesRepository.delete(file.id);
    const deletedFile = new DeleteObjectCommand({
      Bucket: this.BUCKET_NAME,
      Key: file.key,
    });

    return await this.s3Client.send(deletedFile);
  }

  async getPresignedUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.BUCKET_NAME,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: this.PRESIGNED_URL_EXPIRATION_TIME,
    });
  }

  async getPublicUrl(fileId: string) {
    const file = await this.filesRepository.findById(fileId);

    if (!file) {
      throw Exceptions.NOT_FOUND('File');
    }

    return this.filesMapper.buildFilePublicUrl(
      this.RUSTFS_URL,
      this.BUCKET_NAME,
      file.key,
    );
  }
}
