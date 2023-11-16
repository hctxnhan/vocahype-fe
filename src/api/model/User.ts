export interface User {
  id: string;
  loginName: string;
  firstName: string;
  lastName: string;
  timezone: string;
  locale: string;
  createdOn: string;
  goalSeconds: number;
  score?: number;
}
