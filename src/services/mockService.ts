import seed from "@/data/seed.json";
import { randomLatency, sleep } from "@/lib/utils";
import type { Matter, DocumentItem, ClientRecord } from "@/types/data";

export async function fetchPracticeAreas() {
  await sleep(randomLatency());
  return seed.practiceAreas;
}

export async function fetchMatters() {
  await sleep(randomLatency());
  return seed.matters as Matter[];
}

export async function fetchDocuments() {
  await sleep(randomLatency());
  return seed.documents as DocumentItem[];
}

export async function fetchClients() {
  await sleep(randomLatency());
  return seed.clients as ClientRecord[];
}


