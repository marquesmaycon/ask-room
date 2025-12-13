import z from "zod"

export const signInSchema = z.object({
  email: z.email("Digite um e-mail válido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres")
})

export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua senha"),
    ...signInSchema.shape
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
