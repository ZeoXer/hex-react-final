import { useEffect, useState } from "react";
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
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src={product.imageUrl}
                  className="card-img-top rounded-0 object-cover"
                  height={300}
                  alt={product.title}
                />
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-2">
                    <a href="#">{product.title}</a>
                  </h4>
                  <p className="card-text text-muted mb-0">{product.content}</p>
                  <p className="text-muted mt-3">NT$ {product.price}</p>
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
