import useCart from "../contexts/CartContext";
import useAddress from "../contexts/AddressContext";
import check from "../assets/check.png";
import { useNavigate } from "react-router-dom";
export default function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container text-center">
        <img
          src={check}
          alt="check.png"
          style={{ width: "200px", marginTop: "200px" }}
        />
        <h1 className="mt-4">Order Placed Successfully!</h1>
        <button className="mt-4 btn btn-primary" onClick={() => navigate("/")}>
          Back to Products
        </button>
      </div>
    </>
  );
}
