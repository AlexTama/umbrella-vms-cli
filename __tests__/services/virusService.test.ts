import { beforeAll, describe, expect, test } from 'bun:test';
import { Virus } from '../../src/schema/zodSchema';
import { VirusService } from '../../src/services/virusService';
import { file } from 'bun';

describe('VirusService', () => {
    let virusService: VirusService;
    beforeAll(() => {
        virusService = new VirusService();
    });

    describe('As a Umbrella scientist', () => {
        describe('I want to create virus records from command CLI', () => {
            test('Then I can manage controlled strains', async () => {
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
                expect(result).toBe('Virus T-Virus of type T-Virus added successfully!');

                // Read the file to ensure it was created
                const filePath = `${__dirname}/../../src/storage/viruses.json`;
                const viruses = await file(filePath).json();
                expect(viruses).toContainEqual(virus);
            });
        });
    });
});