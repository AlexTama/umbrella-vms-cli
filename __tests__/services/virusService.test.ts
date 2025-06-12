import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
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
        } as Virus])
    })),
    write: vi.fn().mockResolvedValue(undefined)
}));

describe('VirusService', () => {
    let virusService: VirusService;
    beforeAll(() => {
        virusService = new VirusService();
    });
    afterEach(() => {
        vi.clearAllMocks(); // Clear mocks after each test to avoid interference
        vi.resetModules(); // Reset modules to ensure fresh state for each test
    });

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
                const expected = await virusService.addVirus(virus);
                expect(expected).rejects.toThrow(`Virus ${virus.name} of type ${virus.type} already exists!`);
            });
        });
    });
});