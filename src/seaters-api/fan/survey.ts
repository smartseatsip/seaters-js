export interface translationItem {
  lang: string;
  text: string;
}

export interface Answer {
  questionId: string;
  surveyInstanceId?: string;
  answer: string;
  userId?: string;
}

export interface Question {
  id: string;
  text: translationItem[];
  answerLabel: translationItem[];
  answerSemanticId: string;
  status: SurveyStatus;
}
export interface SurveyQuestion {
  question: Question;
  enabled: boolean;
}

export interface Survey {
  id: string;
  name: string;
  status: SurveyStatus;
  title: translationItem[];
  description: translationItem[];
  surveyQuestions: SurveyQuestion[];
}
export interface SurveyInstance {
  id: string;
  waitinglistId: string;
  extensionPoint;
  survey: Survey;
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
