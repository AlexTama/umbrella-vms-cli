export type VirusLevel = "Low" | "Medium" | "High" | "Extreme";

export interface Virus {
  id: string;
  name: string;
  description: string;
  level: VirusLevel;
  mutationRate: number;
  createdAt: Date;
}