import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';

const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(_filename);

export function readJSON<T>(path: string): Promise<T> {
    return new Promise((resolve, reject) => {
        const stream = createReadStream(`${__dirname}/${path}`, { encoding: 'utf8' });
        let data = '';
        stream.on('data', (chunk) => {
            data += chunk;
        });

        stream.on('end', () => {
            const jsonData = JSON.parse(data);
            resolve(jsonData as T);
        });

        stream.on('error', (error) => {
            reject(error);
        });

        stream.on('close', () => {});
    });
}

export function writeJSON<T>(path: string, data: T): Promise<void> {
    return new Promise((resolve, reject) => {
        const stream = createWriteStream(`${__dirname}/${path}`, { encoding: 'utf8' });
        stream.write(JSON.stringify(data, null, 2), (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}