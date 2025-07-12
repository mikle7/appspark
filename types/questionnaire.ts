export interface QuestionnaireData {
  interests: string[];
  previousExperience: string;
  skillLevel: string;
  appType: string;
  primaryGoal: string;
  biggestChallenge: string;
  betaTest: string;
}

export interface QuestionnaireResponse {
  name: string;
  email: string;
  questionnaire: QuestionnaireData;
  isUpdate?: boolean;
}

// Question types for the questionnaire form
export interface Question {
  id: keyof QuestionnaireData;
  title: string;
  subtitle?: string;
  type: "single" | "multiple" | "text";
  options?: string[];
}

// Notion API response types
export interface NotionResponse {
  success: boolean;
  updated?: boolean;
  error?: string;
}
