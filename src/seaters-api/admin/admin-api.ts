/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../../seaters-api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { SeatersApiController } from '../seaters-api-controller';
import * as admin from './admin-types';
import { profiling, survey } from '../../services/index';

export class AdminApi extends SeatersApiController {
  constructor(private apiContext: SeatersApiContext) {
    super();
  }

  getUsers(page: PagingOptions): Promise<PagedResult<admin.User>> {
    return this.apiContext.get('/seaters-admin/users', null, SeatersApiContext.buildPagingQueryParams(page));
  }

  searchUsers(query: admin.UserSearchQuery, page: PagingOptions): Promise<PagedResult<admin.User>> {
    return this.apiContext.put('/seaters-admin/users', query, null, SeatersApiContext.buildPagingQueryParams(page));
  }

  getUser(id: string): Promise<admin.User> {
    return this.apiContext.get('/seaters-admin/users/:id', { id });
  }

  updateUser(user: admin.User): Promise<admin.User> {
    return this.apiContext.put('/seaters-admin/users/:id', user, { id: user.id });
  }

  deleteUser(id: string): Promise<admin.User> {
    return this.apiContext.delete('/seaters-admin/users/:id', { id });
  }

  createUser(user: admin.User): Promise<admin.User> {
    return this.apiContext.post('/seaters-admin/users', user);
  }

  getUserOwnerships(userId: string, page: PagingOptions): Promise<PagedResult<admin.FanGroupOwnership>> {
    return this.apiContext.get(
      '/seaters-admin/users/:id/ownerships',
      null,
      SeatersApiContext.buildPagingQueryParams(page)
    );
  }

  createUserOwnership(ownership: admin.FanGroupOwnership): Promise<admin.FanGroupOwnership> {
    return this.apiContext.post('/seaters-admin/users/:id/ownerships', ownership, { id: ownership.userId });
  }

  deleteUserOwnership(ownership: admin.FanGroupOwnership): Promise<admin.FanGroupOwnership> {
    return this.apiContext.delete('/seaters-admin/users/:userId/ownerships/:fanGroupId', {
      userId: ownership.userId,
      fanGroupId: ownership.fanGroupId
    });
  }

  getFanGroup(fanGroupId: string): Promise<admin.FanGroup> {
    return this.apiContext.get('/seaters-admin/fan-groups/:id', { id: fanGroupId });
  }

  getFanGroupProtectionCodes(
    fanGroupId: string,
    page: PagingOptions
  ): Promise<PagedResult<admin.FanGroupProtectionCode>> {
    return this.apiContext.get(
      '/seaters-admin/fan-groups/:id/protection-codes',
      { id: fanGroupId },
      SeatersApiContext.buildPagingQueryParams(page)
    );
  }

  getFanGroupWaitingLists(fanGroupId: string, page: PagingOptions): Promise<PagedResult<admin.WaitingList>> {
    return this.apiContext.get(
      '/seaters-admin/fan-groups/:id/waiting-lists',
      { id: fanGroupId },
      SeatersApiContext.buildPagingQueryParams(page)
    );
  }

  getWaitingList(waitingListId: string): Promise<admin.WaitingList> {
    return this.apiContext.get('/seaters-admin/waiting-lists/:id', { id: waitingListId });
  }

  updateWaitingList(wl: admin.UpdateWaitingList): Promise<admin.WaitingList> {
    return this.apiContext.put('/seaters-admin/waiting-lists/:id', wl, { id: wl.id });
  }

  deleteWaitingList(waitingListId: string): Promise<any> {
    return this.apiContext.put('/seaters-admin/waiting-lists/:id', { id: waitingListId });
  }

  createFanGroupProtectionCode(
    fanGroupId: string,
    code: string,
    maxTimesUsed: number
  ): Promise<admin.FanGroupProtectionCode> {
    return this.apiContext.post(
      '/seaters-admin/fan-groups/:id/protection-codes',
      { code, maxTimesUsed },
      { id: fanGroupId }
    );
  }

  deleteFanGroupProtectionCode(fanGroupId: string, code: string): Promise<any> {
    return this.apiContext.delete('/seaters-admin/fan-groups/:id/protection-codes/:code', { id: fanGroupId, code });
  }

  importFanGroupProtectionCodes(fanGroupId: string, fileId: string): Promise<any> {
    return this.apiContext.put('/seaters-admin/fan-groups/:id/import-protection-codes/:fileId', null, {
      id: fanGroupId,
      fileId
    });
  }

  requestFanGroupBackgroundImageUpload(fanGroupId: string, fileName?: string): Promise<admin.OneTimeFile> {
    return this.requestFanGroupImageUpload(fanGroupId, 'background-image', fileName);
  }

  requestFanGroupCoverImageUpload(fanGroupId: string, fileName?: string): Promise<admin.OneTimeFile> {
    return this.requestFanGroupImageUpload(fanGroupId, 'coverimage', fileName);
  }

  requestFanGroupProfileImageUpload(fanGroupId: string, fileName?: string): Promise<admin.OneTimeFile> {
    return this.requestFanGroupImageUpload(fanGroupId, 'profileimage', fileName);
  }

  requestOneTimeFileUpload(fileName?: string): Promise<admin.OneTimeFile> {
    return this.apiContext.put('/seaters-admin/request-one-time-upload', null, null, fileName ? { fileName } : null);
  }

  /**
   * Upload a onetime file
   * @param oneTimeFileUrl url of a OneTimeFile returned by requestOneTimeFileUpload
   * @param data for browsers: HTMLInputElement, for node: not supported
   */
  uploadOneTimeFile(oneTimeFileUrl: string, data: any): Promise<any> {
    return this.apiContext.uploadOneTimeFile(oneTimeFileUrl, data);
  }

  //  PROFILING
  getCategories(options: PagingOptions): Promise<PagedResult<profiling.ProfilingCategory>> {
    return this.apiContext.get('/v2/seaters-admin/categories', null, SeatersApiContext.buildPagingQueryParams(options));
  }

  getCategory(id: string): Promise<profiling.ProfilingCategory> {
    return this.apiContext.get(`/v2/seaters-admin/categories/${id}`);
  }

  createCategory(category: profiling.ProfilingCategory): Promise<profiling.ProfilingCategory> {
    return this.apiContext.post(`/v2/seaters-admin/categories`, category);
  }

  updateCategory(category: profiling.ProfilingCategory): Promise<profiling.ProfilingCategory> {
    return this.apiContext.put(`/v2/seaters-admin/categories/${category.id}`, category);
  }

  deleteCategory(id: string): Promise<any> {
    return this.apiContext.delete(`/v2/seaters-admin/categories/${id}`);
  }

  orderCategories(orderedCategoryIds: string[]): Promise<any> {
    return this.apiContext.post(`/v2/seaters-admin/categories/order`, { categoryIds: orderedCategoryIds });
  }

  getInterests(options: PagingOptions): Promise<PagedResult<profiling.ProfilingCategory>> {
    return this.apiContext.get('/v2/seaters-admin/interests', null, SeatersApiContext.buildPagingQueryParams(options));
  }

  getInterest(id: string): Promise<profiling.ProfilingInterest> {
    return this.apiContext.get(`/v2/seaters-admin/interests/${id}`);
  }

  createInterest(interest: profiling.ProfilingInterest): Promise<profiling.ProfilingInterest> {
    return this.apiContext.post(`/v2/seaters-admin/interests`, interest);
  }

  updateInterest(interest: profiling.ProfilingInterest): Promise<profiling.ProfilingInterest> {
    return this.apiContext.put(`/v2/seaters-admin/interests/${interest.id}`, interest);
  }

  deleteInterest(id: string): Promise<any> {
    return this.apiContext.delete(`/v2/seaters-admin/interests/${id}`);
  }

  getFanAttributes(options: PagingOptions): Promise<PagedResult<profiling.ProfilingFanAttribute>> {
    return this.apiContext.get(
      '/v2/seaters-admin/fan-attributes',
      null,
      SeatersApiContext.buildPagingQueryParams(options)
    );
  }

  getFanAttribute(id: string): Promise<profiling.ProfilingFanAttribute> {
    return this.apiContext.get(`/v2/seaters-admin/fan-attributes/${id}`);
  }

  createFanAttribute(fanAttribute: profiling.ProfilingFanAttribute): Promise<profiling.ProfilingFanAttribute> {
    return this.apiContext.post(`/v2/seaters-admin/fan-attributes`, fanAttribute);
  }

  updateFanAttribute(fanAttribute: profiling.ProfilingFanAttribute): Promise<profiling.ProfilingFanAttribute> {
    return this.apiContext.put(`/v2/seaters-admin/fan-attributes/${fanAttribute.id}`, fanAttribute);
  }

  deleteFanAttribute(id: string): Promise<any> {
    return this.apiContext.delete(`/v2/seaters-admin/fan-attributes/${id}`);
  }

  validateFanAttribute(
    id: string,
    updatedFanAttribute?: profiling.ProfilingFanAttribute
  ): Promise<profiling.ProfilingFanAttribute> {
    return this.apiContext.post(`/v2/seaters-admin/fan-attributes/${id}/validate`, updatedFanAttribute);
  }

  unvalidateFanAttribute(id: string): Promise<profiling.ProfilingFanAttribute> {
    return this.apiContext.post(`/v2/seaters-admin/fan-attributes/${id}/unvalidate`);
  }

  addAliases(id: string, idsToConvert: string[]): Promise<profiling.ProfilingFanAttribute> {
    return this.apiContext.post(`/v2/seaters-admin/fan-attributes/${id}/add-alias`, { fanAttributeIds: idsToConvert });
  }

  // Survey
  getSurvey(id: string): Promise<survey.Survey> {
    return this.apiContext.get(`/v2/seaters-admin/surveys/${id}`);
  }

  getSurveys(options: PagingOptions): Promise<PagedResult<survey.Survey>> {
    return this.apiContext.get('/v2/seaters-admin/surveys', null, SeatersApiContext.buildPagingQueryParams(options));
  }

  createSurvey(data: survey.Survey): Promise<survey.Survey> {
    return this.apiContext.post(`/v2/seaters-admin/surveys`, data);
  }

  updateSurvey(data: survey.Survey): Promise<survey.Survey> {
    return this.apiContext.put(`/v2/seaters-admin/surveys/${data.id}`, data);
  }

  // Survey : Instances
  getSurveyInstance(id: string): Promise<survey.Survey> {
    return this.apiContext.get(`/v2/seaters-admin/surveys/instances/${id}`);
  }

  getSurveyInstances(options: PagingOptions): Promise<PagedResult<survey.SurveyInstance>> {
    return this.apiContext.get(
      '/v2/seaters-admin/surveys/instances',
      null,
      SeatersApiContext.buildPagingQueryParams(options)
    );
  }

  createSurveyInstances(surveyInstance: survey.SurveyInstance): Promise<survey.SurveyInstance> {
    return this.apiContext.post(`/v2/seaters-admin/surveys/instances`, surveyInstance);
  }

  updateSurveyInstances(surveyInstance: survey.SurveyInstance): Promise<survey.SurveyInstance> {
    return this.apiContext.put(`/v2/seaters-admin/surveys/instances/${surveyInstance.id}`, surveyInstance);
  }

  // Survey : Answer Semantic
  getAnswerSemantic(id: string): Promise<survey.AnswerSemantic> {
    return this.apiContext.get(`/v2/seaters-admin/surveys/answer-semantics/${id}`);
  }

  getAnswerSemantics(options: PagingOptions): Promise<PagedResult<survey.AnswerSemantic>> {
    return this.apiContext.get(
      '/v2/seaters-admin/surveys/answer-semantics',
      null,
      SeatersApiContext.buildPagingQueryParams(options)
    );
  }

  createAnswerSemantic(answerSemantic: survey.AnswerSemantic): Promise<survey.AnswerSemantic> {
    return this.apiContext.post(`/v2/seaters-admin/surveys/answer-semantics`, answerSemantic);
  }

  updateAnswerSemantic(answerSemantic: survey.AnswerSemantic): Promise<survey.AnswerSemantic> {
    return this.apiContext.put(`/v2/seaters-admin/surveys/answer-semantics/${answerSemantic.id}`, answerSemantic);
  }

  // Survey : Questions
  getQuestion(id: string): Promise<survey.Question> {
    return this.apiContext.get(`/v2/seaters-admin/surveys/questions/${id}`);
  }

  getQuestions(options: PagingOptions): Promise<PagedResult<survey.Question>> {
    return this.apiContext.get(
      '/v2/seaters-admin/surveys/questions',
      null,
      SeatersApiContext.buildPagingQueryParams(options)
    );
  }

  createQuestion(question: survey.Question): Promise<survey.Question> {
    return this.apiContext.post(`/v2/seaters-admin/surveys/questions`, question);
  }

  updateQuestion(question: survey.Question): Promise<survey.Question> {
    return this.apiContext.put(`/v2/seaters-admin/surveys/questions/${question.id}`, question);
  }

  /**
   * HELPERS
   */

  private requestFanGroupImageUpload(
    fanGroupId: string,
    endpoint: string,
    fileName?: string
  ): Promise<admin.OneTimeFile> {
    return this.apiContext.put('/seaters-admin/fan-groups/:id/' + endpoint, null, { id: fanGroupId }, { fileName });
  }
}

/* tslint:enable:no-floating-promises */
