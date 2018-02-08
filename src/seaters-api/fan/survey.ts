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
  status: SurveyStatus;
}
export interface SurveyQuestion {
  questionId?: string;
  question?: Question;
  enabled: boolean;
}

export interface Survey {
  id: string;
  name: string;
  status: SurveyStatus;
  title: TranslationItem[];
  description: TranslationItem[];
  surveyQuestions: SurveyQuestion[];
}
export interface SurveyInstance {
  id?: string;
  waitinglistId: string;
  extensionPoint;
  surveyId?: string;
  survey?: Survey;
}

export enum SurveyStatusEnum {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED'
}

export type SurveyStatus = SurveyStatusEnum.ACTIVE | SurveyStatusEnum.ARCHIVED;

export enum SurveyExtensionPointEnum {
  BEFORE_JOINING_WAITINGLIST = 'BEFORE_JOINING_WAITINGLIST'
}

export type SurveyExtensionPoint = SurveyExtensionPointEnum.BEFORE_JOINING_WAITINGLIST;
