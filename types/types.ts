export enum USER_TYPE {
  CUSTOMER = "CUSTOMER",
  STORE_ADMIN = "STORE_ADMIN",
}
export interface CustomerI {
  phoneNumber: string;
  name?: string;
  address?: AddressI;
  storeId: string;
  photoUrl?: string;
}

export interface AddressI {
  firstLine: string;
  secondLine?: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface GenerateOTPRequestI{
    phoneNumber: string;
    userType: USER_TYPE;
}