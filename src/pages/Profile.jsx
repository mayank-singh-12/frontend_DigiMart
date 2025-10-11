import Header from "../components/Header";
import useFetch from "../useFetch";
import useAddress from "../contexts/AddressContext";

export default function Profile() {
  const { addressArr } = useAddress();

  const { data, loading, error } = useFetch(
    "https://backend-digi-mart.vercel.app/orders"
  );

  return (
    <>
      <Header />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-6">
            {/* User Details */}
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">User Profile</h1>
              </div>
              <div className="card-body">
                <p>
                  <strong>Name: </strong>Mayank Singh
                </p>
                <p>
                  <strong>E-mail: </strong>mayankSingh@gmail.com
                </p>
                <p>
                  <strong>Phone Number: </strong>999-999-9999
                </p>
                <p>
                  <strong>Address: </strong>New Janta Nagar
                </p>
              </div>
            </div>
            {/* All Address */}
            {addressArr.length > 0 && (
              <>
                <div className="card mt-4" style={{ height: "56.3vh" }}>
                  <div className="card-header">
                    <h1 className="card-title text-center">Address List</h1>
                  </div>
                  <div className="card-body d-flex flex-column overflow-auto">
                    {addressArr.map((address) => (
                      <div className="card mb-3">
                        <div className="card-body">
                          <p className="card-text fw-bold fs-4 m-0">
                            {address.name}
                          </p>
                          <p className="card-text m-0">
                            {address.houseNo}, {address.streetAddress}{" "}
                          </p>
                          <p className="text-secondary card-text m-0">
                            {address.city}, {address.state}, {address.country}{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="col-6">
            {/* Recent Orders */}
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">Past Orders</h1>
              </div>
              <div>
                {loading && (
                  <div
                    className="card-body d-flex overflow-auto justify-content-center align-items-center"
                    style={{ height: "80vh" }}
                  >
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {data && (
                  <div
                    className="card-body d-flex flex-column overflow-auto"
                    style={{ height: "80vh" }}
                  >
                    {data.orders.map((order) => (
                      <div className="card mb-3" key={order._id}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5>
                                <u>Items</u>
                              </h5>
                              <ol>
                                {order.products.map((product) => (
                                  <li className="mb-2" key={product.title}>
                                    <p className="m-0">{product.title}</p>
                                    <p className="m-0 text-secondary">
                                      Qty: {product.quantity}
                                    </p>
                                    <p className="m-0 text-secondary">
                                      Price: $
                                      {product.discountedPrice *
                                        product.quantity}
                                    </p>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div>
                              <div className="d-flex justify-content-between text-secondary">
                                <p className="m-0 me-2">
                                  <strong>Sub-Total: </strong>
                                </p>
                                <p className="m-0">${order.subTotal}</p>
                              </div>
                              <div className="d-flex justify-content-between text-secondary">
                                <p className="m-0 me-2">
                                  <strong>Delivery: </strong>
                                </p>
                                <p className="m-0 text-success">
                                  +${order.delivery}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="m-0 me-2 fs-5">
                                  <strong>Total Paid: </strong>
                                </p>
                                <p className="m-0 fs-5">${order.totalToPay}</p>
                              </div>
                              <hr />
                              <div>
                                <p className="fw-bold m-0">Address</p>
                                <p className="m-0">
                                  {order.shippingAddress.houseNo},{" "}
                                  {order.shippingAddress.streetAddress}
                                </p>
                                <p className="m-0 text-secondary">
                                  {order.shippingAddress.city},{" "}
                                  {order.shippingAddress.state}
                                </p>
                                <p className="m-0 text-secondary">
                                  {order.shippingAddress.country}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
