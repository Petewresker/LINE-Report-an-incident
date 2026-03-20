import dynamoose from 'dynamoose';

const caseSchema = new dynamoose.Schema(
  {
    PK: {
      type: String,
      hashKey: true,
      required: true,
    },
    SK: {
      type: String,
      rangeKey: true,
      required: true,
    },
    caseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved', 'rejected'],
      default: 'pending',
    },
    imageUrl: {
      type: String,
      required: false,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

export const CaseModel = dynamoose.model('IncidentReports_Group3', caseSchema);
