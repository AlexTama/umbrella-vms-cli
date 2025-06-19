import { program } from 'commander';
import { VirusService } from '../services/virusService';

program
  .command('create-virus')
  .description('Create a new virus record')
  .requiredOption('-n, --name <name>', 'Name of the virus')
  .requiredOption('-t, --type <type>', 'Type of the virus')
  .requiredOption('-r, --risk-level <riskLevel>', 'Risk level of the virus (1-5)')
  .requiredOption('-i, --infectivity <infectivity>', 'Infectivity of the virus (1-100)')
  .option('-d, --description <description>', 'Description of the virus')
  .action(async (options) => {

    const { name, type, riskLevel, infectivity, description } = options;
    // Create virus object
    const virus = {
      name,
      type,
      riskLevel: parseInt(riskLevel, 10),
      infectivity: parseInt(infectivity, 10),
      description: description || '',
    };

    // Import VirusService and add the virus
    const virusService = new VirusService();

    try {
      const result = await virusService.addVirus(virus);
      console.log(result);
    } catch (error) {
      console.error(`Error adding virus: ${error.message}`);
      process.exit(1);
    }
  }
);

export default program;