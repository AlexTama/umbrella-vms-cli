import { file, write } from 'bun';
import { Virus, VirusSchema } from '../schema/zodSchema';

const DB_PATH = `${__dirname}/../storage/viruses.json`;

export class VirusService {

    async addVirus(virus: Virus): Promise<string> {
        // Validate the virus object against the Virus schema
        const validation = VirusSchema.safeParse(virus);
        if (!validation.success) {
            throw new Error(`Validation failed: ${validation.error.message}`);
        }

        // Check if the virus already exists in the database
        const viruses = await file(DB_PATH).json()
        if (viruses.includes(virus)) {
            throw new Error(`Virus ${virus.name} of type ${virus.type} already exists!`);
        }
        await write(file(DB_PATH), (JSON.stringify([...viruses, virus], null, 2)));
        return `Virus ${virus.name} of type ${virus.type} added successfully!`;
    }
}

 