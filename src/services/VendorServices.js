import { db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const createVendor = (uid, vendorData) => {
  return setDoc(doc(db, "users", uid), vendorData);
};

const getVendor = (uid) => {
  return getDoc(doc(db, "users", uid));
};

const VendorService = {
  createVendor,
  getVendor,
};

export default VendorService;