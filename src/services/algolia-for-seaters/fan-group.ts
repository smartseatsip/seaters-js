export type ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

export interface FanGroup {

    fanGroupId: string,
    name: Object,
    description: Object,
    categories: Object,
    statistics: Object,
    accessMode: ACCESS_MODE,
    profileImageUrl: string,
    slug: string
    
}