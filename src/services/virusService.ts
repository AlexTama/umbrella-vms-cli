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

    async addVirus(virus: Virus): Promise<string> {
        const validation = VirusSchema.safeParse(virus);
        if (!validation.success) {
            throw new Error(`Validation failed: ${validation.error.message}`);
        }

        const viruses = await this.readViruses();
        const alreadyExists = viruses.some(v => v.name === virus.name && v.type === virus.type);
        if (alreadyExists) {
            throw new Error(`Virus ${virus.name} of type ${virus.type} already exists!`);
        }

        viruses.push(virus);
        await this.writeViruses(viruses);
        return `🧬 Virus ${virus.name} of type ${virus.type} added successfully!`;
    }
}

 