import z from "zod";

export const contactSchema = z.object({
    "name": z.string().min(1),
    "email": z.string().email(),
    "telNumber": z.string().min(10).max(13),
    "message": z.string()
});

export type ContactSchema = z.infer<typeof contactSchema>;