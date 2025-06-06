import { z } from 'zod';

export const VirusSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(100),
    level: z.enum(['Low', 'Medium', 'High', 'Critical']),
    description: z.string().max(500).optional(),
    mutationRate: z.number().min(1).max(5),
    crreatedAt: z.date().default(() => new Date()),
    isAirborne: z.boolean().default(false),
});

export type Virus = z.infer<typeof VirusSchema>;