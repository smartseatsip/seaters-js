import {
  Answer as _Answer,
  AnswerSemantic as _AnswerSemantic,
  Question as _Question,
  Survey as _Survey,
  SURVEY_EXTENSION_POINT as _SURVEY_EXTENSION_POINT,
  SURVEY_STATUS as _SURVEY_STATUS,
  SurveyInstance as _SurveyInstance,
  SurveyQuestion as _SurveyQuestion
} from '../../seaters-api/fan';

/**
 *  PROFILING
 */
export namespace survey {
  export interface SurveyInstance extends _SurveyInstance {}
  export interface Survey extends _Survey {}
  export interface SurveyQuestion extends _SurveyQuestion {}
  export interface Question extends _Question {}
  export interface Answer extends _Answer {}
  export interface AnswerSemantic extends _AnswerSemantic {}

  export type SURVEY_STATUS = _SURVEY_STATUS;
  export type SURVEY_EXTENSION_POINT = _SURVEY_EXTENSION_POINT;
}
