import { ACCESS_MODE } from './fan-group';

export interface FanGroupLook {
  accessMode: ACCESS_MODE;

  profileImageUrl: string;
  coverImageUrl: string;
  backgroundImageUrl: string;
  rankAndLikelihoodHidden: boolean;
  color: string;

  // Translated
  translatedWelcomeText: string;
  translatedName: string;
  translatedExperienceName: string;
  translatedDescription: string;

  // Not translated (translation map)
  welcomeText: any;
  description: any;
  name: any;
}
