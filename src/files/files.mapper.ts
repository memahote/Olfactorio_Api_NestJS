import { Injectable } from '@nestjs/common';

import { uuid } from 'drizzle-orm/pg-core';
import { MemoryStoredFile } from 'nestjs-form-data';
import { Files } from './_utils/types/files.types';
import { FilesDirectoryPrivacyValues } from './_utils/types/files-directory-privacy-values.types';
import { FilesDirectoryValues } from './_utils/types/files-directory-values.types';

@Injectable()
export class FilesMapper {
  toUploadedFile = (
    bucket: string,
    key: string,
    file: MemoryStoredFile,
  ) => ({
    bucket: bucket,
    key: key,
    fileName: file.originalName,
    mimeType: file.mimeType,
    size: file.size.toString(),
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
