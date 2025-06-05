import { Virus } from '../src/core/virus';

describe('Virus', () => {
    describe('When a T-Virus is created', () => {
        it('Should create a T-Virus with the correct properties', () => {
            const tVirus: Virus = {
                id: 'VIR-0001',
                name: 'T-Virus',
                description: 'Turns humans into B.O.W.s',
                threatLevel: 'High',
                mutationRate: 0.75,
                createdAt: new Date(),
            };

            expect(tVirus.name).toBe("T-Virus");
            expect(tVirus.threatLevel).toBe("High");
            expect(tVirus.mutationRate).toBeGreaterThan(0.5);
        });
    });
});