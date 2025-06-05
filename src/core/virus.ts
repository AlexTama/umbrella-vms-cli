export type VirusLevel = "Low" | "Medium" | "High" | "Extreme";

export interface Virus {
  id: string;
  name: string;
  description: string;
  threatLevel: VirusLevel;
  mutationRate: number;
  createdAt: Date;
}