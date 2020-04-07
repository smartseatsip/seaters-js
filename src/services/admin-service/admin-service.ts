import { PagedResult, PagingOptions, SeatersApi, SeatersService } from '../common';
import { admin } from './admin-types';
import { mapWaitingList } from './waiting-list-mapper';
import { profiling, survey } from '../index';
import { VenueConfig, Event } from '../../seaters-api/admin';
import { Badge, Category, BADGE_STATUS } from '../../seaters-api/fan';
import { PagedSortedResult } from '../../seaters-api';

export class AdminService extends SeatersService {
  constructor(seatersApi: SeatersApi) {
    super(seatersApi);
  }

  getEvent(eventId: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin.getEvent(eventId);
  }

  getFanGroup(fanGroupId: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin.getFanGroup(fanGroupId);
  }
  getFanGroupProtectionCodes(
    fanGroupId: string,
    page: PagingOptions
  ): Promise<PagedResult<admin.FanGroupProtectionCode>> {
    return this.seatersApi.admin.getFanGroupProtectionCodes(fanGroupId, page).then(r => this.convertPagedResult(r));
  }

  getFanGroupWaitingLists(fanGroupId: string, page: PagingOptions): Promise<PagedResult<admin.WaitingList>> {
    return this.seatersApi.admin.getFanGroupWaitingLists(fanGroupId, page).then(r => this.convertPagedResult(r));
  }

  getWaitingList(waitingListId: string): Promise<admin.WaitingList> {
    return this.seatersApi.admin.getWaitingList(waitingListId);
  }

  updateWaitingList(waitingList: admin.WaitingList): Promise<admin.WaitingList> {
    return this.seatersApi.admin.updateWaitingList(mapWaitingList(waitingList));
  }

  deleteWaitingList(waitingListId: string): Promise<any> {
    return this.seatersApi.admin.deleteWaitingList(waitingListId);
  }

  /**
   * Add a new protection code to a FanGroup
   * @param fanGroupId the id of the fangroup that can be unlocked with the code
   * @param code a text that can be used to unlock the fangroup
   * @param maxTimesUsed use 0 to describe unlimited code
   */
  createFanGroupProtectionCode(
    fanGroupId: string,
    code: string,
    maxTimesUsed: number
  ): Promise<admin.FanGroupProtectionCode> {
    return this.seatersApi.admin.createFanGroupProtectionCode(fanGroupId, code, maxTimesUsed);
  }

  deleteFanGroupProtectionCode(fanGroupId: string, code: string): Promise<any> {
    return this.seatersApi.admin.deleteFanGroupProtectionCode(fanGroupId, code);
  }

  /**
   * Import protection codes into a FanGroup. This upload should be a CSV with following format:
   * - column 1: the actual code that can unlock the FG
   * - column 2: how many times the code can be used - use 0 for infinite usage
   * @param fanGroupId The FG to import codes into
   * @param data For browser an HTMLInputElement containing a file, node: not supported
   */
  importFanGroupProtectionCodes(fanGroupId: string, data: any, fileName?: string): Promise<any> {
    return this.uploadOneTimeFile(data, fileName).then(otf => {
      return this.seatersApi.admin.importFanGroupProtectionCodes(fanGroupId, otf.fileId);
    });
  }

  updateFanGroupBackgroundImage(fanGroupId: string, data: any, fileName?: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin
      .requestFanGroupBackgroundImageUpload(fanGroupId, this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data))
      .then(() => this.getFanGroup(fanGroupId));
  }

  updateFanGroupCoverImage(fanGroupId: string, data: any, fileName?: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin
      .requestFanGroupCoverImageUpload(fanGroupId, this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data))
      .then(() => this.getFanGroup(fanGroupId));
  }

  updateFanGroupProfileImage(fanGroupId: string, data: any, fileName?: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin
      .requestFanGroupProfileImageUpload(fanGroupId, this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data))
      .then(() => this.getFanGroup(fanGroupId));
  }

  updateEventImage(eventId: string, data: any, fileName?: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin
      .requestEventImageUpload(eventId, this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data))
      .then(() => this.getEvent(eventId));
  }

  // Profiling
  getCategories(options: PagingOptions): Promise<PagedResult<profiling.ProfilingCategory>> {
    return this.seatersApi.admin.getCategories(options).then(r => this.convertPagedResult(r));
  }

  getCategory(id: string): Promise<profiling.ProfilingCategory> {
    return this.seatersApi.admin.getCategory(id);
  }

  createCategory(category: profiling.ProfilingCategory): Promise<profiling.ProfilingCategory> {
    return this.seatersApi.admin.createCategory(category);
  }

  updateCategory(category: profiling.ProfilingCategory): Promise<profiling.ProfilingCategory> {
    return this.seatersApi.admin.updateCategory(category);
  }

  deleteCategory(id: string): Promise<any> {
    return this.seatersApi.admin.deleteCategory(id);
  }

  orderCategories(orderedCategoryIds: string[]): Promise<any> {
    return this.seatersApi.admin.orderCategories(orderedCategoryIds);
  }

  getInterests(options: PagingOptions): Promise<PagedResult<profiling.ProfilingCategory>> {
    return this.seatersApi.admin.getInterests(options).then(r => this.convertPagedResult(r));
  }

  getInterest(id: string): Promise<profiling.ProfilingInterest> {
    return this.seatersApi.admin.getInterest(id);
  }

  createInterest(interest: profiling.ProfilingInterest): Promise<profiling.ProfilingInterest> {
    return this.seatersApi.admin.createInterest(interest);
  }

  updateInterest(interest: profiling.ProfilingInterest): Promise<profiling.ProfilingInterest> {
    return this.seatersApi.admin.updateInterest(interest);
  }

  deleteInterest(id: string): Promise<any> {
    return this.seatersApi.admin.deleteInterest(id);
  }

  getFanAttributes(options: PagingOptions): Promise<PagedResult<profiling.ProfilingFanAttribute>> {
    return this.seatersApi.admin.getFanAttributes(options).then(r => this.convertPagedResult(r));
  }

  getFanAttribute(id: string): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.getFanAttribute(id);
  }

  createFanAttribute(fanAttribute: profiling.ProfilingFanAttribute): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.createFanAttribute(fanAttribute);
  }

  updateFanAttribute(fanAttribute: profiling.ProfilingFanAttribute): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.updateFanAttribute(fanAttribute);
  }

  deleteFanAttribute(id: string): Promise<any> {
    return this.seatersApi.admin.deleteFanAttribute(id);
  }

  // Validates fan attribute and updates with data if given
  validateFanAttribute(
    id: string,
    updatedFanAttribute?: profiling.ProfilingFanAttribute
  ): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.validateFanAttribute(id, updatedFanAttribute);
  }

  unvalidateFanAttribute(id: string): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.unvalidateFanAttribute(id);
  }

  addAliases(id: string, idsToConvert: string[]): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.addAliases(id, idsToConvert);
  }


  // Badge

  getAllBadges(status?: BADGE_STATUS, options?: PagingOptions) : Promise<PagedSortedResult<Badge>> {
    return this.seatersApi.admin.getAllBadges(status, options);
  }

  getBadge(badgeId: string) : Promise<Badge> {
    return this.seatersApi.admin.getBadge(badgeId);
  }

  createBadge(badge: Badge) : Promise<Badge> {
    return this.seatersApi.admin.createBadge(badge);
  }

  deleteBadge(badgeId: string) : Promise<any> {
    return this.seatersApi.admin.deleteBadge(badgeId);
  }

  updateBadge(badgeId: string, badge: Badge) : Promise<Badge> { 
    return this.seatersApi.admin.updateBadge(badgeId, badge);
  }


  // Badge : FanGroup Context

  linkBadgeToFg(fanGroupId: string, badgeId: string) : Promise<any> {
    return this.seatersApi.admin.linkBadgeToFg(fanGroupId, badgeId);
  }

  unlinkBadgeToFg(fanGroupId: string, badgeId: string) : Promise<any> {
    return this.seatersApi.admin.unlinkBadgeToFg(fanGroupId, badgeId);
  }

  getBadges(fanGroupId: string) : Promise<PagedSortedResult<Badge>> {
    return this.seatersApi.admin.getBadges(fanGroupId);
  }


  //BADGE : Category

  getBadgeCategories (status?: BADGE_STATUS, options?: PagingOptions, ) : Promise<PagedSortedResult<Category>> {
    return this.seatersApi.admin.getBadgeCategories(status, options);
  }

  createBadgeCategory (category: Category) : Promise<Category> {
    return this.seatersApi.admin.createBadgeCategory(category);
  }

  updateBadgeCategory (categoryId: string, category: Category) : Promise<Category> {
    return this.seatersApi.admin.updateBadgeCategory(categoryId, category);
  }

  deleteBadgeCategory (categoryId: string) : Promise<any> {
    return this.seatersApi.admin.deleteBadgeCategory(categoryId);
  }


  // Survey
  getSurvey(id: string): Promise<survey.Survey> {
    return this.seatersApi.admin.getSurvey(id);
  }

  getSurveys(options: PagingOptions): Promise<PagedResult<survey.Survey>> {
    return this.seatersApi.admin.getSurveys(options);
  }

  createSurvey(data: survey.Survey): Promise<survey.Survey> {
    return this.seatersApi.admin.createSurvey(data);
  }

  updateSurvey(data: survey.Survey): Promise<survey.Survey> {
    return this.seatersApi.admin.updateSurvey(data);
  }

  // Survey : Instances
  getSurveyInstance(id: string): Promise<survey.Survey> {
    return this.seatersApi.admin.getSurveyInstance(id);
  }

  getSurveyInstances(options: PagingOptions): Promise<PagedResult<survey.SurveyInstance>> {
    return this.seatersApi.admin.getSurveyInstances(options);
  }

  createSurveyInstances(surveyInstance: survey.SurveyInstance): Promise<survey.SurveyInstance> {
    return this.seatersApi.admin.createSurveyInstances(surveyInstance);
  }

  updateSurveyInstances(surveyInstance: survey.SurveyInstance): Promise<survey.SurveyInstance> {
    return this.seatersApi.admin.updateSurveyInstances(surveyInstance);
  }

  // Survey : Answer Semantic
  getAnswerSemantic(id: string): Promise<survey.AnswerSemantic> {
    return this.seatersApi.admin.getAnswerSemantic(id);
  }

  getAnswerSemantics(options: PagingOptions): Promise<PagedResult<survey.AnswerSemantic>> {
    return this.seatersApi.admin.getAnswerSemantics(options);
  }

  createAnswerSemantic(answerSemantic: survey.AnswerSemantic): Promise<survey.AnswerSemantic> {
    return this.seatersApi.admin.createAnswerSemantic(answerSemantic);
  }

  updateAnswerSemantic(answerSemantic: survey.AnswerSemantic): Promise<survey.AnswerSemantic> {
    return this.seatersApi.admin.updateAnswerSemantic(answerSemantic);
  }

  // Survey : Questions
  getQuestion(id: string): Promise<survey.Question> {
    return this.seatersApi.admin.getQuestion(id);
  }

  getQuestions(options: PagingOptions): Promise<PagedResult<survey.Question>> {
    return this.seatersApi.admin.getQuestions(options);
  }

  createQuestion(question: survey.Question): Promise<survey.Question> {
    return this.seatersApi.admin.createQuestion(question);
  }

  updateQuestion(question: survey.Question): Promise<survey.Question> {
    return this.seatersApi.admin.updateQuestion(question);
  }

  getVenueConfig(venueId: string): Promise<PagedResult<VenueConfig>> {
    return this.seatersApi.admin.getVenueConfig(venueId).then(r => this.convertPagedResult(r));
  }

  createEvent(event: Event): Promise<Event> {
    return this.seatersApi.admin.createEvent(event);
  }

  createVenue(venue: any): Promise<Event> {
    return this.seatersApi.admin.createVenue(venue);
  }


  
  createWishlist(groupId: string, wishList: any): Promise<any> {
    return this.seatersApi.admin.createWishlist(groupId, wishList);
  }

  openWishlist(wishlistId: string): Promise<any> {
    return this.seatersApi.admin.openWishlist(wishlistId);
  }

  getWaitingListFull(waitingListId: string): Promise<any> {
    return this.seatersApi.admin.getWaitingListFull(waitingListId);
  }

  updateWaitingListFull(wl: any): Promise<any> {
    return this.seatersApi.admin.updateWaitingListFull(wl);
  }


  requestVoucherImageUpload(fanGroupId: string, fileName?: string): Promise<any> {
    return this.seatersApi.admin.requestVoucherImageUpload(fanGroupId, fileName);
  }

  replaySignal(bus, id) {
    return this.seatersApi.admin.replaySignal(bus, id);
  }

  updatEvent(event, eventId): any {
    return this.seatersApi.admin.updatEvent(event, eventId);
  }
  
  private uploadOneTimeFile(data: any, fileName?: string): Promise<admin.OneTimeFile> {
    return this.seatersApi.admin
      .requestOneTimeFileUpload(this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data).then(() => otf));
  }

 


  private defaultFileName(fileName?: string): string {
    if (fileName && fileName !== '') {
      return fileName;
    } else {
      return new Date().toISOString();
    }
  }
}
