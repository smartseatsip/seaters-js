export interface TranslationItem {
  lang: string;
  text: string;
}

export interface Answer {
  questionId: string;
  surveyInstanceId?: string;
  answer: string;
  userId?: string;
}

export interface AnswerSemantic {
  id?: string;
  name: string;
  createdDate?: string;
  lastModifiedDate?: string;
  version?: number;
}

export interface Question {
  id: string;
  text: TranslationItem[];
  answerLabel: TranslationItem[];
  answerSemanticId: string;
  status: SURVEY_STATUS;
}
export interface SurveyQuestion {
  questionId?: string;
  question?: Question;
  enabled: boolean;
  mandatory: boolean;
}

export interface Survey {
  id: string;
  name: string;
  status: SURVEY_STATUS;
  title: TranslationItem[];
  description: TranslationItem[];
  surveyQuestions: SurveyQuestion[];
}
export interface SurveyInstance {
  id?: string;
  waitinglistId: string;
  extensionPoint: SURVEY_EXTENSION_POINT;
  surveyId?: string;
  survey?: Survey;
}

export type SURVEY_STATUS = 'ACTIVE' | 'ARCHIVED';
export type SURVEY_EXTENSION_POINT = 'BEFORE_JOINING_WAITINGLIST' | 'BEFORE_PAYMENT';
