import type {
  PaymentStatus,
  RequestStatus,
  RequestType,
} from "@/types/requests-types";

export type RequestImage = { url: string; caption?: string | null };

export type RequestDetails = {
  id: string;
  title: string;
  description: string;
  type: RequestType;
  status: RequestStatus;
  severity?: string | null;
  createdAt: string;
  updatedAt: string;
  location: string;
  coordinates?: string | null;
  category?: { name: string } | null;
  department?: { name: string } | null;
  service?: { name: string; fee: number | string } | null;
  payment?: { status: PaymentStatus; amount: number | string } | null;
  citizen: { name: string; ward?: string | null; verified?: boolean };
  assignedStaff?: { name: string; title?: string | null } | null;
  images: RequestImage[];
  referenceCode?: string | null;
  scope?: string | null;
  staffNote?: string | null;
};

export const DUMMY_REQUEST: RequestDetails = {
  id: "REQ-2026-1042",
  title: "Damaged Road Surface on Main Street",
  description:
    "A significant depression and fractured asphalt fissure approximately 3 feet wide by 5 inches deep has formed along the westbound travel lane on Main Street near the 4th Avenue crosswalk.",
  type: "COMPLAINT_REQUEST",
  status: "SUBMITTED",
  severity: "High",
  createdAt: "2026-03-24T09:14:00.000Z",
  updatedAt: "2026-03-25T08:30:00.000Z",
  location: "Main St & 4th Avenue",
  coordinates: "41.8781° N, 87.6298° W",
  category: { name: "Roads & Infrastructure" },
  department: { name: "Department of Transportation (DOT)" },
  service: null,
  payment: null,
  citizen: { name: "Sarah Jenkins", ward: "Ward 4", verified: true },
  assignedStaff: { name: "Marcus Vance", title: "Load Foreman" },
  images: [
    {
      url: "https://picsum.photos/seed/road1/1200/800",
      caption: "Crosswalk fissure",
    },
    {
      url: "https://picsum.photos/seed/road2/800/600",
      caption: "Depth metric",
    },
    {
      url: "https://picsum.photos/seed/road3/800/600",
      caption: "Catch basin marking",
    },
  ],
  referenceCode: "INF-2026-DOT",
  scope: "Roadway Infrastructure Defect",
  staffNote: "Sub-surface void drained; asphalt cold-patch applied.",
};
