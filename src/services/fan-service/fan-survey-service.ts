import { SeatersApi, PagedSortedResult } from '../../seaters-api';
import { fan } from './fan-types';
import { survey } from './survey-types';
import { PagingOptions } from '../../index';

export class FanSurveyService {
  constructor(private seatersApi: SeatersApi) {}
  // FAN
  getSurvey(waitingListId: string, extensionPoint: string): Promise<PagedSortedResult<survey.SurveyInstance>> {
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
    extensionPoint: string
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