import { useContext, createContext } from "react";
import { useState, useEffect } from "react";

const AddressContext = createContext();

export default function useAddress() {
  return useContext(AddressContext);
}

const defaultAddress = {
  id: 1,
  name: "Home",
  houseNo: "#7271",
  streetAddress: "St.No. 20, New Janta Nagar",
  city: "Ludhiana",
  state: "Punjab",
  country: "India",
  editMode: false,
};

export function AddressProvider({ children }) {
  const [addressArr, setAddressArr] = useState(
    JSON.parse(localStorage.getItem("addressArr")) || [defaultAddress]
  );
  const [address, setAddress] = useState();

  useEffect(() => {
    localStorage.setItem("addressArr", JSON.stringify(addressArr));
  }, [addressArr]);

  return (
    <AddressContext.Provider
      value={{ addressArr, address, setAddress, setAddressArr }}
    >
      {children}
    </AddressContext.Provider>
  );
}
