import { z } from 'zod/v4';

const virusTypes: string[] = ['T-Virus', 'G-Virus', 'Uroboros', 'Las Plagas', 'T-Abyss Virus'];

export const VirusSchema = z.object({
    name: z.string().min(3).max(20).nonempty(),
    type: z.enum(virusTypes),
    riskLevel: z.number().int().min(1).max(5),
    infectivity: z.number().int().min(1).max(100),
    description: z.string().max(500).optional(),
});

export type Virus = z.infer<typeof VirusSchema>;