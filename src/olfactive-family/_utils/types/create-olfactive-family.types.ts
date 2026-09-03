import { AttributeSelect } from "src/attributes/_utils/types/attributes.types";
import { FileSelect } from "src/files/_utils/types/files.types";
import { olfactiveFamilies } from "src/olfactive-family/olfactive-families.schema";


export type OlfactiveFamilySelect = typeof olfactiveFamilies.$inferSelect;

export type OlfactiveFamilyInsert = typeof olfactiveFamilies.$inferInsert;

export type OlfactiveFamilyWithAttributesAndFile =
  Omit<OlfactiveFamilySelect, 'fileId'| 'createdAt' | 'updatedAt'> & {
    file: FileSelect;
    attributes: AttributeSelect[];
  };