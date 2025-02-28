export interface Result {
  title: string;
  description: string;
  image?: string;
}

export type CurrentTextValue = string | null;
export type ResultsListType = 'list' | 'grid';