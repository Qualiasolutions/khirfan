import seed from "@/data/seed.json";
import { randomLatency, sleep } from "@/lib/utils";

export async function fetchPracticeAreas() {
  await sleep(randomLatency());
  return seed.practiceAreas;
}

export async function fetchMatters() {
  await sleep(randomLatency());
  return seed.matters;
}

export async function fetchDocuments() {
  await sleep(randomLatency());
  return seed.documents;
}

export async function fetchClients() {
  await sleep(randomLatency());
  return seed.clients;
}


