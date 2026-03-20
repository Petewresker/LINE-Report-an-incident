import { CaseModel } from '../models/case.model';
import { Case } from '../types/case.type';

export const getUserCasesService = async (userId: string): Promise<Case[]> => {
  try {
    // Query 
    const PK = `USER#${userId}`;
    
    const result = await CaseModel.query('PK').eq(PK).exec();
    
    const cases = result.map((item: any) => ({
      PK: item.PK,
      SK: item.SK,
      caseId: item.caseId,
      userId: item.userId,
      description: item.description,
      location: item.location,
      status: item.status,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    cases.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return cases;
  } catch (error) {
    throw error;
  }
};
