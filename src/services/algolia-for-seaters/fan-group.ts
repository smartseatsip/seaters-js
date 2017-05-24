export type FG_ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

export const FG_ALGOLIA_TYPE = 'FAN_GROUP';

export interface FanGroup {

  fanGroupId: string;

  type: 'FAN_GROUP';

  name: Object;
  description: Object;
  categories: Object;
  statistics: Object;
  accessMode: FG_ACCESS_MODE;
  profileImageUrl: string;
  slug: string;

}
