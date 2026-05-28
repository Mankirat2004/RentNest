import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const createVendor = async (vendorId, vendorData) => {
  return await setDoc(doc(db, "vendors", vendorId), vendorData);
};

const getVendor = async (vendorId) => {
  return await getDoc(doc(db, "vendors", vendorId));
};

const VendorService = {
  createVendor,
  getVendor,
};

export default VendorService;