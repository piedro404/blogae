import { z } from "zod";

export const postSchema = (isEdit: boolean) =>
  z.object({
    title: isEdit
      ? z.string()
          .min(1, "O título é obrigatório.")
          .max(100, "O título deve ter no máximo 100 caracteres.")
          .optional()
      : z.string()
          .min(1, "O título é obrigatório.")
          .max(100, "O título deve ter no máximo 100 caracteres."),
    content: isEdit
      ? z.string()
          .max(255, "O conteúdo deve ter no máximo 255 caracteres.")
          .optional()
      : z.string()
          .max(255, "O conteúdo deve ter no máximo 255 caracteres."),
    authorId: isEdit
      ? z.number().int().positive().optional()
      : z.number().int().positive(),
    categoryId: z.number().int().positive().optional(),
  });

export type PostRequest = z.infer<ReturnType<typeof postSchema>>;
