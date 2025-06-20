import { file, write } from 'bun';
import { Virus, VirusSchema } from '../schema/zodSchema';
import { existsSync } from 'node:fs';

const DB_PATH = `${__dirname}/../storage/viruses.json`;

export class VirusService {

    private async readViruses(): Promise<Virus[]> {
        if(!existsSync(DB_PATH)) return [];
        try {
            return await file(DB_PATH).json() as Virus[];
        } catch (error) {
            return [];
        }
    }

    private async writeViruses(viruses: Virus[]): Promise<void> {
        await write(file(DB_PATH), JSON.stringify(viruses, null, 2));
    }

    private validateVirus(virus: Virus): boolean {
        const validation = VirusSchema.safeParse(virus);
        if (!validation.success) {
            throw new Error(`Validation failed: ${validation.error.message}`);
        }
        return true;
    }

    async addVirus(virus: Virus): Promise<string> {
        this.validateVirus(virus);
        const viruses = await this.readViruses();
        const alreadyExists = viruses.some(v => v.name === virus.name && v.type === virus.type);
        if (alreadyExists) {
            throw new Error(`Virus ${virus.name} of type ${virus.type} already exists!`);
        }

        viruses.push(virus);
        await this.writeViruses(viruses);
        return `🧬 Virus ${virus.name} of type ${virus.type} added successfully!`;
    }

    async getAllViruses(): Promise<Virus[]> {
        const viruses = await this.readViruses();
        if (viruses === undefined || viruses === null) {
            throw new Error('Failed to read viruses from the database.');
        }
        
        if (viruses.length === 0) {
            return []
        }

        viruses.forEach(virus => {
            if (!VirusSchema.safeParse(virus).success) {
                throw new Error(`Invalid virus data found: ${JSON.stringify(virus)}`);
            }
        });

        return viruses;
    }
}

 