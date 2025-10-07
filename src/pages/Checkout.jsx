import useCart from "../contexts/CartContext";
import useAddress from "../contexts/AddressContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { address, addressArr, setAddress, setAddressArr } = useAddress();
  const { cart, setCart } = useCart();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editHouseNo, setEditHouseNo] = useState("");
  const [editStreetAddress, setEditStreetAddress] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editCountry, setEditCountry] = useState("");

  // console.log(cart);

  const deliveryCharges = 499;
  const subTotal = cart.reduce(
    (acc, curr) => acc + curr.discountedPrice * curr.quantity,
    0
  );
  const totalToPay = subTotal + deliveryCharges;

  function addAddress() {
    if (
      name === "" ||
      houseNo === "" ||
      streetAddress === "" ||
      city === "" ||
      state === "" ||
      country === ""
    ) {
      return console.log("Please fill required fields.");
    }
    const newAddress = {
      id: addressArr.length > 0 ? addressArr[addressArr.length - 1].id + 1 : 1,
      name,
      houseNo,
      streetAddress,
      city,
      state,
      country,
      editMode: false,
    };
    setAddressArr((prev) => [...prev, newAddress]);
  }

  function deleteAddress(add) {
    setAddressArr((prev) =>
      prev.filter((addressElement) => addressElement.id !== add.id)
    );
    if (address) {
      if (address.id == add.id) {
        setAddress((prev) => undefined);
      }
    }
  }

  function enterEditAddress(add) {
    setAddressArr((prev) =>
      prev.map((address) => {
        if (address.id !== add.id) return address;
        return { ...address, editMode: true };
      })
    );

    const { name, houseNo, streetAddress, city, state, country } =
      addressArr.find((address) => address.id === add.id);

    setEditId(add.id);
    setEditName(name);
    setEditHouseNo(houseNo);
    setEditStreetAddress(streetAddress);
    setEditCity(city);
    setEditState(state);
    setEditCountry(country);
  }

  function editAddress() {
    setAddressArr((prev) =>
      prev.map((address) => {
        if (address.id !== editId) {
          return address;
        }
        return {
          id: editId,
          name: editName,
          houseNo: editHouseNo,
          streetAddress: editStreetAddress,
          city: editCity,
          state: editState,
          country: editCountry,
          editMode: false,
        };
      })
    );

    if (address && address.id === editId) {
      setAddress((prev) => ({
        ...prev,
        name: editName,
        houseNo: editHouseNo,
        streetAddress: editStreetAddress,
        city: editCity,
        state: editState,
        country: editCountry,
      }));
    }

    setEditId("");
    setEditName("");
    setEditHouseNo("");
    setEditStreetAddress("");
    setEditCity("");
    setEditState("");
    setEditCountry("");
  }

  function clearField() {
    setName("");
    setHouseNo("");
    setStreetAddress("");
    setCity("");
    setState("");
    setCountry("");
  }

  function cancelEdit(add) {
    setAddressArr((prev) =>
      prev.map((address) => {
        if (address.id !== add.id) return address;
        return { ...address, editMode: false };
      })
    );
  }

  async function placeOrder() {
    const orderDetails = {
      products: [],
      shippingAddress: {
        name: address.name,
        houseNo: address.houseNo,
        streetAddress: address.streetAddress,
        city: address.city,
        state: address.state,
        country: address.country,
      },
      subTotal: subTotal,
      delivery: deliveryCharges,
      totalToPay: totalToPay,
    };

    for (const product of cart) {
      orderDetails.products.push({
        title: product.title,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
        discountedPrice: product.discountedPrice,
      });
    }
    console.log(orderDetails);
    try {
      const response = await fetch(
        "https://backend-digi-mart.vercel.app/orders",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!response.ok) {
        throw "Order validation failed.";
      }
      const data = await response.json();
      console.log(data.message);
      setCart([]);
      setAddress(undefined);
      navigate("/orderSuccess");
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(cart)
  // placeOrder()

  // console.log(address);

  const cartProducts = cart.map((product) => (
    <div
      className="list-group-item d-flex align-items-center justify-content-between"
      key={product._id}
    >
      <div>
        <span className="fs-5">{product.title}</span>
        <br />
        <span className="text-secondary">Qty: {product.quantity}</span>
      </div>
      <div>$ {product.discountedPrice * product.quantity}</div>
    </div>
  ));

  return (
    <>
      <div className="container-fluid mb-5">
        <h1 className="text-center">Checkout</h1>
        <div className="row">
          <div className="col-6">
            {/* Address */}
            <div className="list-group">
              <div className="list-group-item bg-body-secondary text-center">
                <h1>Select Shipping Address</h1>
              </div>
              {/* Add New Address */}
              <div className="list-group-item">
                <h3>Add New Address</h3>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="houseNo"
                    placeholder="houseNo"
                    value={houseNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                  />
                  <label htmlFor="houseNo">House no. / Flat no.</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="streetAddress"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                  <label htmlFor="streetAddress">Street Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <label htmlFor="city">City</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <label htmlFor="state">State</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <label htmlFor="country">Country</label>
                </div>
                <div className="d-flex flex-column">
                  <div className="btn-group">
                    <button className="btn btn-success" onClick={addAddress}>
                      Add address
                    </button>
                    <button className="btn btn-danger" onClick={clearField}>
                      Clear Field
                    </button>
                  </div>
                </div>
              </div>

              {/* All Address */}
              {addressArr.map((add) => (
                <>
                  {add.editMode ? (
                    <div className="list-group-item">
                      {/* Edit Address */}
                      <div>
                        <h3>Edit Address</h3>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                          <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="houseNo"
                            placeholder="houseNo"
                            value={editHouseNo}
                            onChange={(e) => setEditHouseNo(e.target.value)}
                          />
                          <label htmlFor="houseNo">House no. / Flat no.</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="streetAddress"
                            placeholder="Street Address"
                            value={editStreetAddress}
                            onChange={(e) =>
                              setEditStreetAddress(e.target.value)
                            }
                          />
                          <label htmlFor="streetAddress">Street Address</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="City"
                            value={editCity}
                            onChange={(e) => setEditCity(e.target.value)}
                          />
                          <label htmlFor="city">City</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="state"
                            placeholder="State"
                            value={editState}
                            onChange={(e) => setEditState(e.target.value)}
                          />
                          <label htmlFor="state">State</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="country"
                            placeholder="Country"
                            value={editCountry}
                            onChange={(e) => setEditCountry(e.target.value)}
                          />
                          <label htmlFor="country">Country</label>
                        </div>
                        <div className="d-flex flex-column">
                          <div className="btn-group">
                            <button
                              className="btn btn-success"
                              onClick={editAddress}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => cancelEdit(add)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`list-group-item list-group-item-action ${
                        address && add.id === address.id && "bg-body-secondary"
                      } `}
                      onClick={() => setAddress(add)}
                      key={add.id}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <h3>{add.name}</h3>
                          <p className="m-0">
                            {add.houseNo}, {add.streetAddress}
                          </p>
                          <p className="m-0 text-secondary">
                            {add.city}, {add.state}, {add.country}
                          </p>
                        </div>
                        <div className="btn-group align-self-center">
                          <button
                            className="btn btn-outline-warning"
                            onClick={(e) => {
                              e.stopPropagation();
                              enterEditAddress(add);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAddress(add);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>

            <div className="mt-2 d-flex flex-column">
              <button
                className="btn btn-primary"
                onClick={placeOrder}
                disabled={!address}
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Bill  */}
          <div className="col-6">
            {/* Amount */}
            <div className="list-group bg-light-subtle shadow">
              <div className="list-group-item bg-body-secondary text-center">
                <h1>
                  {cart.length} {cart.length < 2 ? "ITEM" : "ITEMS"}
                </h1>
              </div>
              {cartProducts}

              <div className="list-group-item">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="fw-bold fs-5">Sub-Total</span>
                  <span className="fs-5">${subTotal}</span>
                </div>
                <div className="text-secondary d-flex align-items-center justify-content-between">
                  <span className="fs-6">Delivery Charges</span>
                  <span className="fs-6 text-success">
                    + ${deliveryCharges}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="fw-bold fs-4">TOTAL TO PAY</span>
                  <span className="fw-bold fs-4">${totalToPay}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {address && (
              <div className="card mt-4">
                <div className="card-header">
                  <h1 className="card-title">Shipping Address</h1>
                </div>
                <div className="card-body">
                  <p className="card-text fs-2 fw-medium">{address.name}</p>
                  <p className="card-text">
                    {address.houseNo}, {address.streetAddress}
                  </p>
                  <p className="card-text">
                    {address.city}, {address.state}, {address.country}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
