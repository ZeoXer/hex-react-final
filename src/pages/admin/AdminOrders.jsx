import { useRef, useState, useEffect } from "react";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";
import { getAdminOrders } from "../../api/functions";
import { LoadingFullScreen } from "../../components/Loadings";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [tempOrder, setTempOrder] = useState({});
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const orderModal = useRef();

  useEffect(() => {
    orderModal.current = new Modal("#orderModal", {
      backdrop: "static",
    });

    fetchOrders();
  }, []);

  const fetchOrders = async (page) => {
    setIsLoading(true);
    const res = await getAdminOrders(page);

    setOrders(res.data.orders);
    setPagination(res.data.pagination);
    setIsLoading(false);
  };

  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModal.current.show();
  };

  const closeOrderModal = () => {
    orderModal.current.hide();
  };

  return (
    <div className="p-3">
      {isLoading && <LoadingFullScreen />}
      <OrderModal
        closeProductModal={closeOrderModal}
        fetchOrders={fetchOrders}
        tempOrder={tempOrder}
      />
      <h3>訂單列表</h3>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">訂單 id</th>
            <th scope="col">購買用戶</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">付款日期</th>
            <th scope="col">留言訊息</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user?.name}
                  {order.user?.email}
                </td>
                <td>${order.total}</td>
                <td>
                  {order.is_paid ? (
                    <span className="text-success fw-bold">付款完成</span>
                  ) : (
                    "未付款"
                  )}
                </td>
                <td>
                  {order.paid_date
                    ? new Date(order.paid_date * 1000).toLocaleString()
                    : "未付款"}
                </td>
                <td>{order.message}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    查看
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={fetchOrders} />
    </div>
  );
};

export default AdminOrders;
