export interface User {
  firstName: string | null | undefined;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  documentType: string;
  documentNumber: string;
  email: string;
  contactPhone: string;
  rol?: 'guest' | 'admin';
  password: string;
  uid?: string;
}
