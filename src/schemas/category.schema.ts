import { z } from 'zod';

export const categorySchema = (isEdit: boolean) => z.object({
    name: isEdit 
        ? z.string()
            .min(1, "O nome é obrigatório.")
            .max(100, "O nome deve ter no máximo 100 caracteres.")
            .optional()
        : z.string()
            .min(1, "O nome é obrigatório.")
            .max(100, "O nome deve ter no máximo 100 caracteres."),
    description: isEdit
        ? z.string()
            .max(255, "A descrição deve ter no máximo 255 caracteres.")
            .optional()
        : z.string()
            .max(255, "A descrição deve ter no máximo 255 caracteres.")
            .optional(),
});

export type CategoryRequest = z.infer<ReturnType<typeof categorySchema>>;