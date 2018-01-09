import { SeatersApi, PagedSortedResult } from '../../seaters-api';
import { fan } from './fan-types';

export class FanProfilingService {
  constructor(private seatersApi: SeatersApi) {}

  // Profiling (public)

  getProfilingCategories(pagingOptions): Promise<PagedSortedResult<fan.ProfilingCategory>> {
    return this.seatersApi.fan.getProfilingCategories(pagingOptions);
  }

  getProfilingCategoryById(categoryId: string): Promise<fan.ProfilingCategory> {
    return this.seatersApi.fan.getProfilingCategoryById(categoryId);
  }

  getProfilingFanAttributes(query: string, validated: boolean): Promise<fan.ProfilingFanAttribute[]> {
    return this.seatersApi.fan.getProfilingFanAttributes(query, validated);
  }

  getProfilingFanAttributeById(fanAttributeId: string): Promise<fan.ProfilingFanAttribute> {
    return this.seatersApi.fan.getProfilingFanAttributeById(fanAttributeId);
  }

  // User (fan)

  getUserInterests(pagingOptions): Promise<PagedSortedResult<fan.UserInterest>> {
    return this.seatersApi.fan.getUserInterests(pagingOptions);
  }

  createUserInterest(userInterestCreateDTO: fan.UserInterestCreateDTO): Promise<fan.UserInterest> {
    return this.seatersApi.fan.createUserInterest(userInterestCreateDTO);
  }

  updateUserInterest(userInterestUpdateDTO: fan.UserInterestUpdateDTO): Promise<fan.UserInterest> {
    return this.seatersApi.fan.updateUserInterest(userInterestUpdateDTO);
  }

  getUserFanAttributes(): Promise<fan.UserFanAttribute[]> {
    return this.seatersApi.fan.getUserFanAttributes();
  }

  createUserFanAttribute(
    userFanAttributeCreateDTO: fan.UserFanAttributeCreateDTO,
    relationsValidation: string
  ): Promise<fan.UserFanAttribute> {
    return this.seatersApi.fan.createUserFanAttribute(userFanAttributeCreateDTO, relationsValidation);
  }

  updateUserFanAttribute(
    userFanAttributeId: string,
    userFanAttributeUpdateDTO: fan.UserFanAttributeUpdateDTO
  ): Promise<fan.UserFanAttribute> {
    return this.seatersApi.fan.updateUserFanAttribute(userFanAttributeId, userFanAttributeUpdateDTO);
  }

  removeUserFanAttribute(userFanAttributeId: string): Promise<fan.UserFanAttribute> {
    return this.seatersApi.fan.removeUserFanAttribute(userFanAttributeId);
  }
}
