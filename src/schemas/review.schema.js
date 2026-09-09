import { z } from 'zod';

export const createReviewSchema = z.object({
  author: z
    .string({ required_error: 'El autor es obligatorio' })
    .min(2, 'El nombre del autor debe tener al menos 2 caracteres')
    .max(100, 'El nombre del autor no puede exceder 100 caracteres')
    .trim(),
  rating: z
    .number({ required_error: 'El rating es obligatorio' })
    .int('El rating debe ser entero')
    .min(1, 'El rating mínimo es 1')
    .max(5, 'El rating máximo es 5'),
  comment: z
    .string({ required_error: 'El comentario es obligatorio' })
    .min(10, 'El comentario debe tener al menos 10 caracteres')
    .max(500, 'El comentario no puede exceder 500 caracteres')
    .trim()
});

export const productIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'El ID del producto debe ser un número entero')
    .transform(Number)
});
