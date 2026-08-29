import { Injectable } from '@nestjs/common';
import {
  FilesDirectoryPrivacyValues,
  FilesDirectoryValues,
} from './_utils/types/files.types';
import { uuid } from 'drizzle-orm/pg-core';
import { MemoryStoredFile } from 'nestjs-form-data';
import { UploadedFile } from './_utils/types/uploaded-file.types';

@Injectable()
export class FilesMapper {
  toUploadedFile = (
    bucket: string,
    key: string,
    file: MemoryStoredFile,
  ): UploadedFile => ({
    bucket: bucket,
    key: key,
    fileName: file.originalName,
    mimeType: file.mimeType,
    size: file.size,
  });
  buildFileKey = (
    bucketDirectoryPrivacyType: FilesDirectoryPrivacyValues,
    bucketDirectoryType: FilesDirectoryValues,
  ): string =>
    `${bucketDirectoryPrivacyType}/${bucketDirectoryType}/${uuid()}-picture`;
  buildFilePublicUrl = (
    rustFsUrl: string,
    bucketName: string,
    key: string,
  ): string => `${rustFsUrl}/${bucketName}/${key}`;
}
