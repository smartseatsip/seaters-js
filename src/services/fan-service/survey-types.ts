import {
  SurveyInstance as _SurveyInstance,
  Survey as _Survey,
  SurveyQuestion as _SurveyQuestion,
  Question as _Question,
  Answer as _Answer,
  AnswerSemantic as _AnswerSemantic,
  SURVEY_STATUS as _SURVEY_STATUS,
  SURVEY_EXTENSION_POINT as _SURVEY_EXTENSION_POINT
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
