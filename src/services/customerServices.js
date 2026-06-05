import { db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const createCustomer = (uid, customerData) => {
  return setDoc(doc(db, "users", uid), customerData);
};

const getCustomer = (uid) => {
  return getDoc(doc(db, "users", uid));
};

const CustomerService = {
  createCustomer,
  getCustomer,
};

export default CustomerService;