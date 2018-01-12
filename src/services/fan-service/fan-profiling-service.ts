import { SeatersApi, PagedSortedResult } from '../../seaters-api';
import { fan } from './fan-types';
import { profiling } from './profiling-types';
import { PagingOptions } from '../../index';

export class FanProfilingService {
  constructor(private seatersApi: SeatersApi) {}

  // Profiling (public)

  getProfilingCategories(pagingOptions): Promise<PagedSortedResult<profiling.ProfilingCategory>> {
    return this.seatersApi.fan.getProfilingCategories(pagingOptions);
  }

  getProfilingCategoryById(categoryId: string): Promise<profiling.ProfilingCategory> {
    return this.seatersApi.fan.getProfilingCategoryById(categoryId);
  }

  seachFanAttributes(query: string, validated: boolean): Promise<profiling.ProfilingFanAttribute[]> {
    return this.seatersApi.fan.seachFanAttributes(query, validated);
  }

  getProfilingFanAttributeById(fanAttributeId: string): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.fan.getProfilingFanAttributeById(fanAttributeId);
  }

  // User (fan)

  getUserInterests(pagingOptions): Promise<PagedSortedResult<profiling.UserInterest>> {
    return this.seatersApi.fan.getUserInterests(pagingOptions);
  }

  updateUserInterest(userInterestUpdateDTO: profiling.UserInterestUpdateDTO): Promise<profiling.UserInterest> {
    return this.seatersApi.fan.updateUserInterest(userInterestUpdateDTO);
  }

  getUserFanAttributes(pagingOptions: PagingOptions): Promise<PagedSortedResult<profiling.UserFanAttribute>> {
    pagingOptions = pagingOptions || {};
    if (!pagingOptions.filters) {
      pagingOptions.filters = {
        user_fan_attribute_status: profiling.USER_FAN_ATTRIBUTES_STATUS.LINKED
      };
    }
    return this.seatersApi.fan.getUserFanAttributes(pagingOptions);
  }

  updateUserFanAttribute(options: profiling.UserFanAttributeUpdateDTO): Promise<profiling.UserFanAttribute> {
    return this.seatersApi.fan.updateUserFanAttribute(options);
  }
}
