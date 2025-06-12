import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VirusService } from './virusService';
import { file, write } from 'bun';
import { Virus } from '../schema/zodSchema';

// Ensure the mock is initialized before any tests
vi.mock('bun', () => ({
    file: vi.fn(() => ({
        json: vi.fn().mockResolvedValue([{ name: 'MockVirus', type: 'MockType' } as Virus])
    })),
    write: vi.fn().mockResolvedValue(undefined)
}));

describe('VirusService', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear mocks before each test to avoid interference
    });

    it('should mock file and write functions', async () => {
        const service = new VirusService();

        const result = await service.addVirus({ name: 'NewVirus', type: 'NewType' } as Virus);

        expect(result).toBe('🧬 Virus NewVirus of type NewType added successfully!');
        expect(file).toHaveBeenCalledWith(expect.any(String));
        expect(write).toHaveBeenCalledWith(expect.any(Object), expect.stringContaining('NewVirus'));
    });
});
