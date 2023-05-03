import { injectable } from "inversify";
import { CustomerModel } from "../models/customer.model";
import { ApiError } from "../utils/ApiHelper";

@injectable()
export class AuthRepo {
  constructor() {}
  async getOrCreateCustomerByPhone(phoneNumber: string, storeId: string) {
    try {
      const customer = await CustomerModel.findOne({
        phoneNumber: phoneNumber,
        storeId,
      }).sort({
        createdAt: -1,
      });
      if (!customer) {
        const customerDocument = new CustomerModel({
          phoneNumber: phoneNumber,
          storeId: storeId,
        });
        return await customerDocument.save();
      }
      return customer;
    } catch (error) {
      console.log(
        "Error caught in AuthRepo: getOrCreateCustomerByPhone => ",
        error
      );
      return new ApiError("Some error occurred while customer creation", 500);
    }
  }
}
