import Header from "../components/Header";
import { Link } from "react-router-dom";
import useWishlist from "../contexts/WishlistContext";
import AddWishlist from "../components/AddWishlist";
import useCart from "../contexts/CartContext";
import { toast } from "react-toastify";

// function AddWishlist({ product }) {
//   const { wishlist, setWishlist } = useWishlist();

//   function addToWishlist(product) {
//     if (!wishlist.some((p) => p._id == product._id))
//       setWishlist((prev) => [...prev, product]);
//   }
//   function removeFromWishlist(product) {
//     setWishlist((prev) => prev.filter((p) => p._id != product._id));
//   }
//   const isWishlisted = wishlist.some((p) => p._id == product._id);
//   return (
//     <>
//       {isWishlisted ? (
//         <button
//           className="btn btn-outline-danger"
//           onClick={() => removeFromWishlist(product)}
//         >
//           Remove from Wishlist
//         </button>
//       ) : (
//         <button
//           className="btn btn-outline-warning"
//           onClick={() => addToWishlist(product)}
//         >
//           Add to Wishlist
//         </button>
//       )}
//     </>
//   );
// }

export default function Wishlist() {
  const { wishlist, setWishlist } = useWishlist();
  const { cart, setCart } = useCart();

  function printCategories(categoriesArrObj) {
    const categoriesArr = categoriesArrObj.reduce((acc, curr) => {
      acc.push(curr.name);
      return acc;
    }, []);
    return categoriesArr.join(", ");
  }

  function addToCart(product) {
    const inCart = cart.some((p) => p._id === product._id);
    if (!inCart) {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    } else {
      setCart((prev) =>
        prev.map((p) => {
          if (p._id === product._id) {
            return { ...p, quantity: p.quantity + 1 };
          }
          return p;
        })
      );
    }
  }
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row text-center">
          <h1 className="my-2">My WishList</h1>
          {wishlist.length === 0 && (
            <p className="mt-5">No products in the Wishlist.</p>
          )}
          {wishlist.map((product) => (
            <div className="col-2" key={product._id}>
              <div className="card shadow mb-5 bg-body-tertiary">
                <Link
                  to={`/products/${product._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <img
                    className="card-img-top"
                    src={product.images[0]}
                    alt={product.title}
                  />
                  <div className="card-body text-center">
                    <p className="card-title">{product.title}</p>
                    <p>
                      <small className="text-body-secondary">
                        {printCategories(product.category)}
                      </small>
                    </p>
                    <div className="d-flex align-items-baseline justify-content-center gap-2">
                      <span className="card-text fs-3 fw-bold">
                        ${product.discountedPrice}
                      </span>
                      <span className="card-text text-muted text-decoration-line-through">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="btn-group-vertical">
                  <AddWishlist product={product} />
                  <button
                    className="btn btn-outline-light"
                    onClick={() => {
                      toast.success("Product added to Cart!");
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
