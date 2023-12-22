export type WordLevel = 'easy' | 'hard' | 'normal' | 'mastered' | 'ignore';
export type QuizAnswer = '0' | '1' | '2' | '3';

export type APIResponse<T, M = any> = {
  data: T[];
  meta?: M;
};

export type PaginationMeta = {
  pagination: {
    first: number;
    last: number;
    page: number;
    size: number;
    total: number;
  };
};
