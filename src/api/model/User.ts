export interface User {
  id: string;
  loginName: string;
  secret: string;
  encryption: string;
  firstName: string;
  lastName: string;
  timezone: string;
  locale: string;
  status: number;
  loginCount: number;
  createdOn: string;
  goalSeconds: number;
}
