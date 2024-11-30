import vine from '@vinejs/vine'
import { randomUUID } from 'node:crypto'

const baseSchema = {
  name: vine.string().trim().minLength(1).maxLength(255),
  username: vine.string().trim().minLength(1).maxLength(255),
  date: vine.number().min(1).max(31),
  month: vine.number().min(1).max(12),
  year: vine
    .number()
    .nullable()
    .transform((value) => value || null),
  place: vine.string().trim().maxLength(255),
}

export const createBirthdayValidator = vine.compile(
  vine.object({
    memberjid: vine.string().trim(),
    uuid: vine
      .string()
      .uuid()
      .parse(() => randomUUID()),
    ...baseSchema,
  })
)

export const updateBirthdayValidator = vine.compile(
  vine.object({
    ...Object.entries(baseSchema).reduce(
      (acc, [key, validator]) => ({
        ...acc,
        [key]: validator.optional(),
      }),
      {}
    ),
  })
)

export const birthdayValidator = vine.compile(
  vine.object({
    memberjid: vine.string().trim(),
    uuid: vine.string().uuid(),
    ...baseSchema,
    createdAt: vine.date().optional(),
    updatedAt: vine.date().optional(),
  })
)
