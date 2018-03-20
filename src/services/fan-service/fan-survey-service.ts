import { PagedSortedResult, SeatersApi } from '../../seaters-api';
import { survey } from './survey-types';

export class FanSurveyService {
  constructor(private seatersApi: SeatersApi) {}
  // FAN
  getSurvey(
    waitingListId: string,
    extensionPoint: survey.SURVEY_EXTENSION_POINT
  ): Promise<PagedSortedResult<survey.SurveyInstance>> {
    const pagingOptions: any = {};
    if (!pagingOptions.filters) {
      pagingOptions.filters = {
        waitinglist_id: waitingListId,
        extension_point: extensionPoint
      };
    }

    return this.seatersApi.fan.getSurveys(pagingOptions);
  }
  getAnswers(surveyId: string): Promise<PagedSortedResult<survey.Answer>> {
    return this.seatersApi.fan.getAnswers(surveyId);
  }
  submitAnswers(surveyId: string, answers: survey.Answer[]): Promise<survey.Answer[]> {
    return this.seatersApi.fan.submitAnswers(surveyId, answers);
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
  getUserAnswers(waitingListId: string, surveyId: string, userId: string): Promise<PagedSortedResult<survey.Answer>> {
    const pagingOptions: any = {};
    if (!pagingOptions.filters) {
      pagingOptions.filters = {
        user_id: userId
      };
    }
    return this.seatersApi.fan.getUserAnswers(waitingListId, surveyId, pagingOptions);
  }
}
