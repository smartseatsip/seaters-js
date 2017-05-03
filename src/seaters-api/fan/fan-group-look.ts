import { ACCESS_MODE } from './fan-group';

export interface FanGroupLook {
  accessMode: ACCESS_MODE;

  /**
   * Translation map
   */
  welcomeText: any;

  profileImageUrl: string;

  coverImageUrl: string;

  backgroundImageUrl: string;

  translatedWelcomeText: string;

  translatedName: string;

  translatedDescription: string;

  /**
   * Translation map
   */
  description: any;

  color: string;

  /**
   * Translation map
   */
  name: any;

}
