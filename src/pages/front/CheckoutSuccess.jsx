import { Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../../api/functions";

const CheckoutSuccess = () => {
  const { fetchCart } = useOutletContext();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});

  const fetchOrder = async (id) => {
    const res = await getOrderById(id);
    setOrderData(res.data.order);
  };

  useEffect(() => {
    fetchOrder(orderId);
    fetchCart();
  }, [orderId]);

  return (
    <div className="container">
      <div
        style={{
          minHeight: "400px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80)",
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="mt-5 mb-7">
        <div className="row">
          <div className="col-md-6">
            <h2>成功建立訂單</h2>
            <p>
              感謝您的選購！由於商品寄出需要 3-5
              個工作天，再麻煩您耐心等待，並留意到貨時的信箱確認郵件或是手機簡訊通知，若有任何問題，歡迎和我們聯絡，並期待您下次的光臨！
            </p>
            <Link
              to="/"
              className="btn w-100 btn-dark py-3 rounded-pill me-2 mb-4"
            >
              回到首頁
            </Link>
          </div>
          <div className="col-md-6">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>訂單明細</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <li className="list-group-item px-0" key={item.id}>
                        <div className="d-flex mt-2">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="me-2"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="w-100 d-flex flex-column">
                            <div className="d-flex justify-content-between fw-bold">
                              <h5>{item.product.title}</h5>
                              <p className="mb-0">x{item.qty}</p>
                            </div>
                            <div className="d-flex justify-content-between mt-auto">
                              <p className="text-muted mb-0">
                                <small>NT$ {item.product.price}</small>
                              </p>
                              <p className="mb-0">NT$ {item.final_total}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  <li className="list-group-item px-0 pb-0">
                    <table className="table text-muted">
                      <tbody>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 font-weight-normal"
                          >
                            商品金額
                          </th>
                          <td className="text-end border-0 px-0">
                            NT$ {orderData.total}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 pt-0 font-weight-normal"
                          >
                            付款方式
                          </th>
                          <td className="text-end border-0 px-0 pt-0">
                            ApplePay
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between mt-2">
                      <p className="mb-0 h4 fw-bold">總金額</p>
                      <p className="mb-0 h4 fw-bold">NT$ {orderData.total}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
