import { SeatersApi } from '../../seaters-api';
import { fan } from './fan-types';

export class FanProfilingService {

  constructor (
    private seatersApi: SeatersApi
  ) {
  }

  /**
   *  CATEGORIES
   */

  getProfilingCategories (): Promise<fan.ProfilingCategory[]> {
    return this.seatersApi.fan.getProfilingCategories();
  }

  /**
   *  CATEGORY
   */

  getProfilingCategoryById (categoryId: string): Promise<fan.ProfilingCategory> {
    return this.seatersApi.fan.getProfilingCategoryById(categoryId);
  }

  /**
   *  INTERESTS
   */

  createFanInterest (FanInterestCreateDTO: fan.FanInterestCreateDTO): Promise<fan.FanInterest> {
    return this.seatersApi.fan.createFanInterest(FanInterestCreateDTO);
  }

  updateFanInterest (FanInterestUpdateDTO: fan.FanInterestUpdateDTO): Promise<fan.FanInterest> {
    return this.seatersApi.fan.updateFanInterest(FanInterestUpdateDTO);
  }

  /**
   *  INTEREST
   */

  /**
   *  EXTERNAL IDENTIFIERS
   */

  /**
   *  EXTERNAL IDENTIFIER
   */

  /**
   *  FAN ATTRIBUTES
   */

  /**
   *  FAN ATTRIBUTE
   */

}
