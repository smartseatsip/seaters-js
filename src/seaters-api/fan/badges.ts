interface TranslationItem {
    lang: string;
    text: string;
}


export interface BadgeToUser {
    userId: string;
    fanGroupId: string;
    badge: Badge;
    event?: BadgeEvent;
}

export interface Badge {
    id: string;
    name: TranslationItem[];
    description: TranslationItem[];
    categoryId?: string;
    displayedLogoImageId?: string;
    displayedLogoUrl?: string;
    displayedText?:TranslationItem[];
    mood?: BADGE_MOOD;
    status?: BADGE_STATUS;
    hidden?: boolean;
}

export interface BadgeProtection {
    state: BADGE_STATE;
    badgeFanViews: Badge[];
}

export interface BadgeEvent {
    status: BADGE_STATUS;
    expirationDate?: string;
    createdDate?: string;
}

export interface BadgeGrantOptions {
    userId: string;
    fanGroupId: string;
    badgeId: string;
    expirationDate?: string;
}

export interface BadgeWlOptions {
    badgeId: string; 
    badgeAttribute: string;
}

export interface Category {
    id?: string;
    name: TranslationItem[];
    order?: number;
    status?: BADGE_STATUS;

}


export type BADGE_STATUS = 'ACTIVE' | 'ARCHIVED';
export type BADGE_EVENT_STATUS = 'REQUESTED' | 'AWARDED' | 'REVOKED' | 'ARCHIVED';
export type BADGE_MOOD = 'GOOD' | 'NEUTRAL' | 'BAD';
export type BADGE_STATE = 'PUBLIC' | 'ACCESSIBLE' | 'RESTRICTED';
