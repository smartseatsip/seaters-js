export interface TimeStamp {
  creation_date: string;
  deletion_date: string;
  update_date: string;
}

export interface Category {
  category_code: string;
  id: string;
  interests: string[];
  time_stamps: TimeStamp;
  version: number;
}
