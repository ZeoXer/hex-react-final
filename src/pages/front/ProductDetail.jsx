import { useContext, useEffect, useState } from "react";
import { addProductToCart, getProduct } from "../../api/functions";
import { useOutletContext, useParams } from "react-router-dom";
import { MessageContext } from "../../store/message";
import { LoadingButton } from "../../components/Loadings";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { fetchCart } = useOutletContext();
  const { handleSuccessMessage, handleFailMessage } =
    useContext(MessageContext);

  const fetchProduct = async (id) => {
    const res = await getProduct(id);
    setProduct(res.data.product);
  };

  const addToCart = async () => {
    const productToAdd = {
      product_id: product.id,
      qty: cartQuantity,
    };
    setIsLoading(true);

    try {
      const res = await addProductToCart(productToAdd);
      handleSuccessMessage(res);
      fetchCart();
      setIsLoading(false);
    } catch (error) {
      handleFailMessage(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return (
    <div className="container">
      <div
        style={{
          minHeight: "400px",
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="row justify-content-between mt-4 mb-7">
        <div className="col-md-7">
          <h2 className="mb-0">{product.title}</h2>
          <p className="fw-bold">NT$ {product.price}</p>
          <p>{product.content}</p>
          <div className="my-4">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="img-fluid mt-4"
            />
          </div>
          <div
            className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
            id="accordionExample"
          >
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingOne"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">Lorem ipsum</h4>
                  <i className="bi bi-dash"></i>
                </div>
              </div>
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingTwo"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">Lorem ipsum</h4>
                  <i className="bi bi-plus"></i>
                </div>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingThree"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">Lorem ipsum</h4>
                  <i className="bi bi-plus"></i>
                </div>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group mb-3 border rounded-pill mt-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-dark rounded-start-5 rounded-end-0 border-0 p-3"
                type="button"
                id="button-addon1"
                onClick={() => {
                  setCartQuantity(
                    cartQuantity > 1 ? cartQuantity - 1 : cartQuantity
                  );
                }}
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
            <input
              type="number"
              className="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="number of product"
              aria-describedby="button-addon1"
              value={cartQuantity}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark rounded-start-0 rounded-end-5 border-0 p-3"
                type="button"
                id="button-addon2"
                onClick={() => {
                  setCartQuantity(cartQuantity + 1);
                }}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <button
            className="btn btn-dark w-100 rounded-pill d-flex justify-content-center align-items-center"
            style={{ height: "60px" }}
            onClick={addToCart}
            disabled={isLoading}
          >
            {isLoading ? <LoadingButton /> : "加入購物車"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
