import Header from "../components/Header";
import { Link } from "react-router-dom";
import ProductFilter from "../components/ProductFilter";
import useProducts from "../contexts/ProductsContext";
import AddWishlist from "../components/AddWishlist";
import AddCart from "../components/AddCart";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function ProductsListing() {
  const { filteredProducts, productLoading, productError } = useProducts();

  function printCategories(categoriesArrObj) {
    const categoriesArr = categoriesArrObj.reduce((acc, curr) => {
      acc.push(curr.name);
      return acc;
    }, []);
    return categoriesArr.join(", ");
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <Header searchBox={true} />

      <main className="container-fluid ">
        <div className="mt-3">
          <ThemeProvider theme={darkTheme}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Filters</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <ProductFilter />
              </AccordionDetails>
            </Accordion>
          </ThemeProvider>
        </div>

        <div className="mx-1 z-1">
          <div className="row">
            <div className="col mt-2">
              {/* page heading  */}
              <p className="fs-4 col-12 text-left">Showing All Products</p>{" "}
              {filteredProducts.length != 0 && (
                <p className="col-12">
                  ( showing {filteredProducts.length} products )
                </p>
              )}
              {productLoading && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "100%", height: "80vh" }}
                >
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {/* products */}
              {filteredProducts.length != 0 ? (
                <>
                  <div className="row">
                    {filteredProducts.map((product) => (
                      <div className="col-md-3" key={product._id}>
                        <div className="card shadow mb-4 bg-body-tertiary">
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
                            <AddCart product={product} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                productError && <p>{productError}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
