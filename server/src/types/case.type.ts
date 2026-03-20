export interface Case {
  PK: string;
  SK: string;
  caseId: string;
  userId: string;
  description: string;
  location?: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetUserCasesRequest {
  userId: string;
}

export interface GetUserCasesResponse {
  success: boolean;
  message: string;
  data: Case[];
}
