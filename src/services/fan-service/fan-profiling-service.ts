import { SeatersApi, PagedSortedResult } from '../../seaters-api';
import { fan } from './fan-types';
import { profiling } from './profiling-types';

export class FanProfilingService {
  constructor(private seatersApi: SeatersApi) {}

  // Profiling (public)

  getProfilingCategories(pagingOptions): Promise<PagedSortedResult<profiling.ProfilingCategory>> {
    return this.seatersApi.fan.getProfilingCategories(pagingOptions);
  }

  getProfilingCategoryById(categoryId: string): Promise<profiling.ProfilingCategory> {
    return this.seatersApi.fan.getProfilingCategoryById(categoryId);
  }

  getProfilingFanAttributes(query: string, validated: boolean): Promise<profiling.ProfilingFanAttribute[]> {
    return this.seatersApi.fan.getProfilingFanAttributes(query, validated);
  }

  getProfilingFanAttributeById(fanAttributeId: string): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.fan.getProfilingFanAttributeById(fanAttributeId);
  }

  // User (fan)

  getUserInterests(pagingOptions): Promise<PagedSortedResult<profiling.UserInterest>> {
    return this.seatersApi.fan.getUserInterests(pagingOptions);
  }

  createUserInterest(userInterestCreateDTO: profiling.UserInterestCreateDTO): Promise<profiling.UserInterest> {
    return this.seatersApi.fan.createUserInterest(userInterestCreateDTO);
  }

  updateUserInterest(userInterestUpdateDTO: profiling.UserInterestUpdateDTO): Promise<profiling.UserInterest> {
    return this.seatersApi.fan.updateUserInterest(userInterestUpdateDTO);
  }

  getUserFanAttributes(): Promise<profiling.UserFanAttribute[]> {
    return this.seatersApi.fan.getUserFanAttributes();
  }

  createUserFanAttribute(
    userFanAttributeCreateDTO: profiling.UserFanAttributeCreateDTO,
    relationsValidation: string
  ): Promise<profiling.UserFanAttribute> {
    return this.seatersApi.fan.createUserFanAttribute(userFanAttributeCreateDTO, relationsValidation);
  }

  updateUserFanAttribute(
    userFanAttributeId: string,
    userFanAttributeUpdateDTO: profiling.UserFanAttributeUpdateDTO
  ): Promise<profiling.UserFanAttribute> {
    return this.seatersApi.fan.updateUserFanAttribute(userFanAttributeId, userFanAttributeUpdateDTO);
  }

  removeUserFanAttribute(userFanAttributeId: string): Promise<profiling.UserFanAttribute> {
    return this.seatersApi.fan.removeUserFanAttribute(userFanAttributeId);
  }
}
