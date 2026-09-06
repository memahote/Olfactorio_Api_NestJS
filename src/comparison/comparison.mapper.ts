import { ComparisonInsert, ComparisonValues } from "./_utils/types/comparison.types";

export class ComparisonMapper {
  toComparisonInsert = (userId: string, type: ComparisonValues): ComparisonInsert => ({
    userId: userId,
    type: type
  })
}