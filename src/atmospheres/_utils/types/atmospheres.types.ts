import { atmospheres } from "src/atmospheres/atmospheres.schema";


export type Atmosphere = typeof atmospheres.$inferSelect

export type CreateAtmosphere  = typeof atmospheres.$inferInsert;