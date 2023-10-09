import { useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import {
  deleteCartProduct,
  updateCartProductAmount,
} from "../../api/functions";
import { MessageContext } from "../../store/message";

const Cart = () => {
  const { cartData, fetchCart } = useOutletContext();
  const [loadingItems, setLoadingItems] = useState([]);
  const { handleSuccessMessage, handleFailMessage } =
    useContext(MessageContext);

  const removeCartItem = async (id) => {
    try {
      const res = await deleteCartProduct(id);
      handleSuccessMessage(res)
      fetchCart();
    } catch (error) {
      handleFailMessage(error)
    }
  };

  const updateCartItem = async (item, quantity) => {
    const data = {
      product_id: item.product_id,
      qty: quantity,
    };
    setLoadingItems([...loadingItems, item.id]);

    try {
      const res = await updateCartProductAmount(item.id, data);
      console.log(res);
      setLoadingItems(
        loadingItems.filter((loadingItem) => loadingItem.id !== item.id)
      );
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-6 bg-white py-5"
          style={{ minHeight: "calc(100vh - 56px - 76px)" }}
        >
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">購物車</h2>
          </div>
          {cartData?.carts?.map((item) => {
            return (
              <div className="d-flex mt-4 bg-light" key={item.id}>
                <img
                  src={item.product.imageUrl}
                  alt={item.title}
                  className="object-cover"
                  style={{
                    width: "120px",
                  }}
                />
                <div className="w-100 p-3 position-relative">
                  <button
                    type="button"
                    className="position-absolute btn"
                    style={{ top: "5px", right: "5px" }}
                    onClick={() => {
                      removeCartItem(item.id);
                    }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <p className="mb-0 fw-bold">{item.product.title}</p>
                  <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                    {item.product.content}
                  </p>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="input-group w-50 align-items-center">
                      <select
                        className="form-select"
                        value={item.qty}
                        disabled={loadingItems.includes(item.id)}
                        onChange={(e) => {
                          updateCartItem(item, +e.target.value);
                        }}
                      >
                        {[...new Array(10)].map((_, num) => {
                          return (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <p className="mb-0 ms-auto">NT$ {item.final_total}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <table className="table mt-4 text-muted">
            <tbody>
              <tr>
                <th scope="row" className="border-0 px-0 font-weight-normal">
                  總金額
                </th>
                <td className="text-end border-0 px-0">NT$ {cartData.total}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border-0 px-0 pt-0 font-weight-normal"
                >
                  Lorem ipsum
                </th>
                <td className="text-end border-0 px-0 pt-0">-NT$500</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">Lorem ipsum</p>
            <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
          </div>
          <a className="btn btn-dark w-100 mt-4 rounded-0 py-3">前往結帳</a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
