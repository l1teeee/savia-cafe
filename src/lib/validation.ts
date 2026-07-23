import { z } from "zod";

export function getLocalDateISO(date = new Date()): string {
  const localTime = date.getTime() - date.getTimezoneOffset() * 60_000;
  return new Date(localTime).toISOString().slice(0, 10);
}

export const newsletterSchema = z.object({
  email: z.string().email("Introduce un correo válido"),
  privacy: z.literal(true, {
    error: "Debes aceptar la política de privacidad",
  }),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;

export const reservationSchema = z.object({
  locationId: z.string().min(1, "Elige una cafetería"),
  date: z
    .string()
    .min(1, "Elige una fecha")
    .refine(
      (v) => v >= getLocalDateISO(),
      "La fecha no puede ser pasada"
    ),
  time: z.string().min(1, "Elige una hora"),
  people: z
    .number()
    .int("Debe ser un número entero")
    .min(1, "Mínimo 1 persona")
    .max(12, "Para grupos grandes escríbenos"),
  name: z.string().min(2, "Escribe tu nombre"),
  email: z.string().email("Introduce un correo válido"),
});

export type ReservationValues = z.infer<typeof reservationSchema>;
