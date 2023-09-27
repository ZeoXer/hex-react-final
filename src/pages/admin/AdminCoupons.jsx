import { useEffect, useState, useRef } from "react";
import { deleteCouponById, getAdminCoupons } from "../../api/functions";
import { Modal } from "bootstrap";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import CouponModal from "../../components/CouponModal";

const CREATE_COUPON = "create-coupon";
const EDIT_COUPON = "edit-coupon";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState(CREATE_COUPON);
  const [tempCoupon, setTempCoupon] = useState({});

  const couponModal = useRef();
  const deleteModal = useRef();

  useEffect(() => {
    couponModal.current = new Modal("#couponModal", {
      backdrop: "static",
    });

    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    fetchCoupons();
  }, []);

  const fetchCoupons = async (page) => {
    const couponRes = await getAdminCoupons(page);
    setCoupons(couponRes.data.coupons);
    setPagination(couponRes.data.pagination);
  };

  const openCouponModal = (type, coupon) => {
    setType(type);
    setTempCoupon(coupon);
    couponModal.current.show();
  };

  const closeCouponModal = () => {
    couponModal.current.hide();
  };

  const openDeleteModal = (product) => {
    setTempCoupon(product);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteCoupon = async (id) => {
    try {
      const { data } = await deleteCouponById(id);
      if (data.success) {
        closeDeleteModal();
        fetchCoupons();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFormalDateString = (date) => {
    let dates = date.toLocaleDateString().split("/");
    for (let i = 1; i <= 2; i++) {
      dates[i] = dates[i].padStart(2, "0");
    }
    return dates.reduce((a, b) => a + "-" + b);
  };

  return (
    <div className="p-3">
      <CouponModal
        closeCouponModal={closeCouponModal}
        fetchCoupons={fetchCoupons}
        getFormalDateString={getFormalDateString}
        tempCoupon={tempCoupon}
        type={type}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={tempCoupon.title}
        deleteFunc={() => deleteCoupon(tempCoupon.id)}
      />
      <h3>優惠券列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openCouponModal(CREATE_COUPON, {})}
        >
          建立新優惠券
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">名稱</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => {
            return (
              <tr key={coupon.id}>
                <td>{coupon.title}</td>
                <td>{coupon.percent}</td>
                <td>{getFormalDateString(new Date(coupon.due_date))}</td>
                <td>{coupon.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCouponModal(EDIT_COUPON, coupon)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(coupon)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={fetchCoupons} />
    </div>
  );
};

export default AdminCoupons;
