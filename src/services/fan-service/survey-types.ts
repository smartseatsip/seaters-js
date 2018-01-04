import {
  SurveyInstance as _SurveyInstance,
  Survey as _Survey,
  SurveyQuestion as _SurveyQuestion,
  Question as _Question,
  SurveyStatusEnum as _SurveyStatusEnum,
  SurveyExtensionPointEnum as _SurveyExtensionPointEnum,
  Answer as _Answer
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
  export const SURVEY_STATUS = _SurveyStatusEnum;
  export const SURVEY_EXTENSION_POINT = _SurveyExtensionPointEnum;
}
