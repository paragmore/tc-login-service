import { injectable } from "inversify";
import { BusinessAdminModel } from "../models/business.admin.model";
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

  async getOrCreateBusinessAdminByPhone(phoneNumber: string) {
    try {
      const businessAdmin = await BusinessAdminModel.findOne({
        phoneNumber: phoneNumber,
      }).sort({
        createdAt: -1,
      });
      console.log(!businessAdmin);
      if (!businessAdmin) {
        const businessAdminDocument = new BusinessAdminModel({
          phoneNumber: phoneNumber,
        });
        return await businessAdminDocument.save();
      }
      return businessAdmin;
    } catch (error) {
      console.log(
        "Error caught in AuthRepo: getOrCreateBusinessAdminByPhone => ",
        error
      );
      return new ApiError(
        "Some error occurred while businessAdmin creation",
        500
      );
    }
  }

  async getOrCreateBusinessAdminByPhoneAndStoreId(phoneNumber: string, storeId: string) {
    try {
      const businessAdmin = await BusinessAdminModel.findOne({
        phoneNumber: phoneNumber,
        storeId,
      }).sort({
        createdAt: -1,
      });
      console.log(!businessAdmin);
      if (!businessAdmin) {
        const businessAdminDocument = new BusinessAdminModel({
          phoneNumber: phoneNumber,
          storeId: storeId,
        });
        return await businessAdminDocument.save();
      }
      return businessAdmin;
    } catch (error) {
      console.log(
        "Error caught in AuthRepo: getOrCreateBusinessAdminByPhone => ",
        error
      );
      return new ApiError(
        "Some error occurred while businessAdmin creation",
        500
      );
    }
  }
}
