export type AdminStatsData = {
  totalRequests: number;
  pendingRequests: number;
  inProgress: number;
  totalUsers: number;
};

export type CitizenStatsData = {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  resolvedRequests: number;
};

export type StaffStatsData = {
  totalAssigned: number;
  pendingAction: number;
  inProgress: number;
  resolved: number;
};
