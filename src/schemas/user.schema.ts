import { z } from 'zod';

export const userSchema = (isEdit: boolean) => z.object({
    name: isEdit 
        ? z.string()
            .min(1, "O nome é obrigatório.")
            .max(100, "O nome deve ter no máximo 100 caracteres.")
            .optional()
        : z.string()
            .min(1, "O nome é obrigatório.")
            .max(100, "O nome deve ter no máximo 100 caracteres."),
    email: isEdit
        ? z.string()
            .email("Digite um email válido.")
            .min(1, "O email é obrigatório.")
            .optional()
        : z.string()
            .email("Digite um email válido.")
            .min(1, "O email é obrigatório."),
    password: isEdit
        ? z.string()
            .min(8, "A senha deve ter no mínimo 8 caracteres.")
            .max(50, "A senha deve ter no máximo 50 caracteres.")
            .optional()
        : z.string()
            .min(8, "A senha deve ter no mínimo 8 caracteres.")
            .max(50, "A senha deve ter no máximo 50 caracteres."),
    passwordConfirmation: isEdit
        ? z.string()
            .min(8, "A confirmação de senha deve ter no mínimo 8 caracteres.")
            .max(50, "A confirmação de senha deve ter no máximo 50 caracteres.")
            .optional()
        : z.string()
            .min(8, "A confirmação de senha deve ter no mínimo 8 caracteres.")
            .max(50, "A confirmação de senha deve ter no máximo 50 caracteres."),
})
    .refine(
        (data) => {
            if (data.password && data.passwordConfirmation) {
                return data.password === data.passwordConfirmation;
            }
            if (data.password || data.passwordConfirmation) {
                return false;
            }
            return true;
        },
        {
            message: "As senhas devem ser iguais.",
            path: ["passwordConfirmation"],
        }
    )

export type UserRequest = z.infer<ReturnType<typeof userSchema>>;