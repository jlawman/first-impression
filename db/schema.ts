import { pgTable, text, timestamp, uuid, jsonb, integer } from 'drizzle-orm/pg-core'

export const analyses = pgTable('analyses', {
  id: uuid('id').defaultRandom().primaryKey(),
  userIdentifier: text('user_identifier').notNull(),
  imageUrl: text('image_url').notNull(),
  resultsJson: jsonb('results_json').notNull(),
  overallScore: integer('overall_score').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Analysis = typeof analyses.$inferSelect
export type NewAnalysis = typeof analyses.$inferInsert
