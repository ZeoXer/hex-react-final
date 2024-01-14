import { useEffect, useState } from "react";
import { getProducts } from "../../api/functions";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (page) => {
    const res = await getProducts(page);
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1586776977607-310e9c725c37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              className="img-fluid rounded-4"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h1 className="fw-bold">KeyInLife</h1>
            <h5 className="font-weight-normal text-muted mt-2">
              A good keyboard is the key of better life.
            </h5>
            <div className="input-group mb-0 mt-4">
              <input
                type="search"
                className="form-control rounded-start-5 rounded-end-0"
                placeholder=""
              />
              <div className="input-group-append">
                <button
                  className="btn btn-dark rounded-start-0 rounded-end-5 w-100"
                  type="button"
                  id="search"
                >
                  搜尋商品
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="fw-bold">熱銷系列</h2>
        <div className="row mt-5">
          {products.map((item, idx) => {
            if (idx < 4) {
              return (
                <div key={idx} className="col-md-6 mt-md-4">
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                      src={item.imageUrl}
                      className="card-img-top rounded-0"
                      alt="..."
                    />
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-4">{item.title}</h4>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="card-text text-muted mb-0 w-75">
                          {item.description}
                        </p>
                        <Link
                          to={`/product/${item.id}`}
                          className="btn btn-outline-dark rounded-pill px-3 py-2 text-nowrap"
                        >
                          探索
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="bg-light mt-7">
        <div className="container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing
                        elitr, sed diam nonumy eirmod tempor invidunt ut labore
                        et dolore magna aliquyam erat.”
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing
                        elitr, sed diam nonumy eirmod tempor invidunt ut labore
                        et dolore magna aliquyam erat.”
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="../../src/images/logo-round.png"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing
                        elitr, sed diam nonumy eirmod tempor invidunt ut labore
                        et dolore magna aliquyam erat.”
                      </p>
                      <p className="mt-auto text-muted">--KeyInLife</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container my-7">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
              style={{ width: "48px", height: "48px", objectFit: "cover" }}
            />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
              style={{ width: "48px", height: "48px", objectFit: "cover" }}
            />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt=""
              style={{ width: "48px", height: "48px", objectFit: "cover" }}
            />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <h3>有任何問題嗎？歡迎聯繫我們！</h3>
              <ul className="list-unstyled text-muted">
                <li>
                  電話： <a href="tel:">0912345678</a>
                </li>
                <li>
                  信箱： <a href="mailto:">hexschool@gmail.com</a>
                </li>
              </ul>
              <Link to={"/products"} className="btn btn-dark mt-4 rounded-0">
                前往產品列表
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
