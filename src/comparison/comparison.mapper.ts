import { GetComparisonDto } from './_utils/dtos/responses/get-comparison.dto';
import {
  ComparisonInsert,
  ComparisonSelect,
  ComparisonValues,
} from './_utils/types/comparison.types';

export class ComparisonMapper {
  toComparisonInsert = (
    userId: string,
    type: ComparisonValues,
  ): ComparisonInsert => ({
    userId: userId,
    type: type,
  });

  toGetComparisonDto = (comparison: ComparisonSelect): GetComparisonDto => ({
    id: comparison.id,
    type: comparison.type,
    userId: comparison.userId,
    createdAt: comparison.createdAt,
  });
}
