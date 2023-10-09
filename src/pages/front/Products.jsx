import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/functions";
import Pagination from "../../components/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const fetchProducts = async (page) => {
    const res = await getProducts(page);
    setProducts(res.data.products);
    setPagination(res.data.pagination);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-md-5 mt-3 mb-7">
      <div className="row">
        {products.map((product) => {
          return (
            <div className="col-md-3" key={product.id}>
              <div className="card border-0 mb-4 position-relative">
                <Link
                  to={`/product/${product.id}`}
                  className="zoom-in-container"
                >
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-0 object-cover zoom-in"
                    height={300}
                    alt={product.title}
                  />
                </Link>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-decoration-none"
                    >
                      {product.title}
                    </Link>
                  </h4>
                  <p className="card-text text-muted mb-0">
                    {product.description}
                  </p>
                  <p className="text-muted mt-3 fs-5 fw-bold">NT$ {product.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <nav className="d-flex justify-content-center">
        <Pagination pagination={pagination} changePage={fetchProducts} />
      </nav>
    </div>
  );
};

export default Products;
