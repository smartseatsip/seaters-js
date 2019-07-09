import { PagedSortedResult, SeatersApi } from '../../seaters-api';
import { survey } from './survey-types';

export class FanSurveyService {
  constructor(private seatersApi: SeatersApi) {}
  // FAN
  getSurvey(
    waitingListId: string,
    extensionPoint: survey.SURVEY_EXTENSION_POINT,
    fanGroupId?: string
  ): Promise<PagedSortedResult<survey.SurveyInstance>> {
    const pagingOptions: any = {};
    if (!pagingOptions.filters) {
      
      if(waitingListId) {
        pagingOptions.filters = {
          waitinglist_id: waitingListId,
          extension_point: extensionPoint
        };
      } else {
        pagingOptions.filters = {
          fangroup_id: fanGroupId,
          extension_point: extensionPoint
        };
      }
    }

    return this.seatersApi.fan.getSurveys(pagingOptions);
  }

  getAnswers(surveyInstanceId: string): Promise<PagedSortedResult<survey.Answer>> {
    return this.seatersApi.fan.getAnswers(surveyInstanceId);
  }

  getChoices(questionId, pagingOptions?) : any {
    return this.seatersApi.fan.getChoices(questionId, pagingOptions);
  }

  submitAnswers(surveyInstanceId: string, answers: survey.Answer[]): Promise<survey.Answer[]> {
    return this.seatersApi.fan.submitAnswers(surveyInstanceId, answers);
  }

  // FGO
  getWaitingListSurveys(
    waitingListId: string,
    extensionPoint: survey.SURVEY_EXTENSION_POINT
  ): Promise<PagedSortedResult<survey.SurveyInstance>> {
    const pagingOptions: any = {};
    if (!pagingOptions.filters) {
      pagingOptions.filters = {
        extension_point: extensionPoint
      };
    }

    return this.seatersApi.fan.getWaitingListSurveys(waitingListId, pagingOptions);
  }

  getUserAnswers(
    waitingListId: string,
    surveyInstanceId: string,
    userId: string
  ): Promise<PagedSortedResult<survey.Answer>> {
    const pagingOptions: any = {};
    if (!pagingOptions.filters) {
      pagingOptions.filters = {
        user_id: userId
      };
    }
    return this.seatersApi.fan.getUserAnswers(waitingListId, surveyInstanceId, pagingOptions);
  }
}
