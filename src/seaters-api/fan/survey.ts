export interface Answer {
  questionId: string;
  surveyInstanceId?: string;
  answer: string;
}

export interface Question {
  id: string;
  text: string;
  answerLabel: string;
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
