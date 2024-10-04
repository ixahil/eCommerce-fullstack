import { Schema, model } from "mongoose";

const addressBookSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  addressLine1: {
    required: true,
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  pincode: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
});

export const AddressBookModel = model("AddressBook", addressBookSchema);
