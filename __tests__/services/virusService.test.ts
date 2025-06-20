import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { Virus } from '../../src/schema/zodSchema';
import { VirusService } from '../../src/services/virusService';

vi.mock('bun', () => ({
    file: vi.fn(() => ({
        json: vi.fn().mockResolvedValue([{
            name: 'G-Virus',
            type: 'G-Virus',
            riskLevel: 5,
            infectivity: 100,
            description: 'A highly infectious virus that causes severe mutations in humans.'
        } as Virus,
        {
            name: 'Uroboros',
            type: 'Uroboros',
            riskLevel: 5,
            infectivity: 100,
            description: 'A highly infectious virus that causes severe mutations in humans.'
        } as Virus]),
    })),
    write: vi.fn().mockResolvedValue(undefined)
}));

let virusService: VirusService;
beforeAll(() => {
    virusService = new VirusService();
});
afterAll(() => {
    vi.clearAllMocks(); // Clear mocks after each test to avoid interference
    vi.resetModules(); // Reset modules to ensure fresh state for each test
});

describe('VirusService', () => {
    describe('As a Umbrella scientist', () => {
        describe('I want to create virus records from command CLI', () => {
            test('Then I can add a new virus to manage controlled strains', async () => {
                // act
                const virus: Virus = {
                    name: 'T-Virus',
                    type: 'T-Virus',
                    riskLevel: 5,
                    infectivity: 100,
                    description: 'A highly infectious virus that causes severe mutations in humans.'
                };

                // assert
                const result = await virusService.addVirus(virus);
                expect(result).toBe(`🧬 Virus ${virus.name} of type ${virus.type} added successfully!`);
            });

            test('Should throw error if virus already exists', async () => {
                const virus: Virus = {
                    name: 'G-Virus',
                    type: 'G-Virus',
                    riskLevel: 5,
                    infectivity: 100,
                    description: 'A highly infectious virus that causes severe mutations in humans.'
                };

                // assert
                await expect(virusService.addVirus(virus)).rejects.toThrowError();
            });
        });

        describe('When I call (getAllViruses) method', () => {
          test('Then I can retrieve all viruses from the database', async () => {
            // act
            const viruses = await virusService.getAllViruses();

            // assert
            expect(viruses).toBeDefined();
            expect(viruses.length).toBeGreaterThan(0);
            expect(viruses[0]).toMatchObject({
                name: 'G-Virus',
                type: 'G-Virus',
                riskLevel: 5,
                infectivity: 100,
                description: 'A highly infectious virus that causes severe mutations in humans.'
            });
          })
        });
    });
});
