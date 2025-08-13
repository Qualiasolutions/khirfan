export type RiskLevel = "Low" | "Medium" | "High";

export interface Matter {
  id: string;
  client: string;
  practiceArea: string;
  stage: string;
  owner: string;
  nextAction: string;
  deadline: string; // ISO date
  risk: RiskLevel;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
  version: string;
  status: "draft" | "review" | "approved";
}

export interface ClientRecord {
  id: string;
  name: string;
  sector: string;
  sla: string;
  scores: {
    engagement: number;
    billing: number;
    satisfaction: number;
  };
}

export interface ResearchRecord {
  type: string;
  jurisdiction: string;
  title: string;
  summary: string;
  relevance: number; // percentage
  date: string; // ISO
}

export interface WorkflowRecord {
  id: string;
  name: string;
  tags: string[];
  steps: string[];
  active: boolean;
}

export interface BillingEntry {
  matter: string;
  desc: string;
  hours: number;
  rate: number;
}

export interface BillingData {
  wip: number;
  arAging: number;
  realization: number;
  profit: number;
  timeEntries: BillingEntry[];
  rateCard: Record<string, number>;
}

export interface GovernanceData {
  overall: number;
  policies: number;
  lastAuditDays: number;
  pdp: Record<string, number>;
}

export interface SeedData {
  practiceAreas: string[];
  matters: Matter[];
  documents: DocumentItem[];
  clients: ClientRecord[];
  research: ResearchRecord[];
  workflows: WorkflowRecord[];
  billing: BillingData;
  governance: GovernanceData;
}


