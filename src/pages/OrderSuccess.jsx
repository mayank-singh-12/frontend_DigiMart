import Header from "../components/Header";
import check from "../assets/check.png";
import { useNavigate } from "react-router-dom";
export default function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="container text-center">
        <img
          src={check}
          alt="check.png"
          style={{ width: "200px", marginTop: "200px" }}
        />
        <h1 className="mt-4">Order Placed Successfully!</h1>
        <button className="mt-4 btn btn-primary" onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    </>
  );
}
