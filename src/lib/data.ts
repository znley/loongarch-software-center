import { readFileSync } from 'fs';
import { join } from 'path';

export interface Distro {
  id: number;
  distro: string;
  version: string;
  display_name: string;
  logo_url: string | null;
  iso_download_url: string;
  abi: number;
}

export interface SourceConfig {
  name: string;
  command: string;
  config: string;
  urls: Record<string, string>;
}

export function getDistros(): Distro[] {
  const dataPath = join(process.cwd(), 'data', 'distros.json');
  const raw = readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw) as Distro[];
}

export function getSources(): Record<string, SourceConfig> {
  const dataPath = join(process.cwd(), 'data', 'sources.json');
  const raw = readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw) as Record<string, SourceConfig>;
}

export function getSourceUrl(sourceType: string, abi: number): string | null {
  const sources = getSources();
  const source = sources[sourceType];
  if (!source) return null;
  return source.urls[abi.toString()] || null;
}
