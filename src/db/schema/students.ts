import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const students = sqliteTable("students", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  name_ar: text("name").notNull(),
  name_en: text("name").notNull(),
  student_number: text("student_number").notNull(),
  grade: integer("grade", { mode: "number" }).notNull(),
  section: integer("section", { mode: "number" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const selectstudentsSchema = createSelectSchema(students);

export const insertstudentsSchema = createInsertSchema(students, {
  name_ar: (schema) => schema.name_ar.min(1).max(500),
})
  .required({
    student_number: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const patchstudentsSchema = insertstudentsSchema.partial();
