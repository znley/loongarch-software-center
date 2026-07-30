import { readFileSync } from 'fs';
import { join } from 'path';

export interface DistroVersion {
  version: string;
  abi: number;
  iso_download_url: string;
}

export interface Distro {
  distro: string;
  logo_url: string | null;
  display_name: string;
  versions: DistroVersion[];
}

export interface SourceConfig {
  name: string;
  command: string;
  config: string;
  abis: Record<string, string>;
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

export function getEndpoints(): Record<string, SourceConfig> {
  const dataPath = join(process.cwd(), 'data', 'endpoints.json');
  const raw = readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw) as Record<string, SourceConfig>;
}

export function getSourceUrl(sourceType: string, abi: number): string | null {
  const sources = getSources();
  const source = sources[sourceType];
  if (!source) return null;
  return source.abis[abi.toString()] || null;
}

export function getEndpointUrl(endpointType: string, abi: number): string | null {
  const endpoints = getEndpoints();
  const endpoint = endpoints[endpointType];
  if (!endpoint) return null;
  return endpoint.abis[abi.toString()] || null;
}
