export enum PersonGender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O'
}

export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  gender: PersonGender;
}
