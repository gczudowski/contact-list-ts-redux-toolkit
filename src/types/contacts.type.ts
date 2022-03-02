export interface IContact {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
}

export interface IContactStateItem extends IContact {
  isActive?: boolean;
}

export interface IContactState {
  items: IContactStateItem[];
  isLoading: boolean;
  hasMore: boolean;
  errorMessage: string;
}
