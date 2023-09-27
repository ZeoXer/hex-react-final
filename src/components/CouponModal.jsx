import { useState, useEffect } from "react";
import { addNewCoupon, editCouponById } from "../api/functions";

const CREATE_COUPON = "create-coupon";
const EDIT_COUPON = "edit-coupon";

const CouponModal = ({
  closeCouponModal,
  fetchCoupons,
  getFormalDateString,
  tempCoupon,
  type,
}) => {
  const [tempData, setTempData] = useState({
    title: "",
    is_enabled: 0,
    percent: 100,
    due_date: 0,
    code: "",
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (type === CREATE_COUPON) {
      setTempData({
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: "",
      });
      setDate(new Date())
    } else if (type === EDIT_COUPON) {
      setTempData(tempCoupon);
      setDate(new Date(tempCoupon.due_date))
    }
  }, [type, tempCoupon]);

  const submit = async () => {
    try {
      let res;
      if (type === CREATE_COUPON) {
        res = await addNewCoupon(tempData, date);
      } else if (type === EDIT_COUPON) {
        res = await editCouponById(tempCoupon.id, tempData, date);
      }
      if (res.data.success) {
        closeCouponModal();
        fetchCoupons();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["percent"].includes(name)) {
      setTempData({ ...tempData, [name]: +value });
    } else if (name === "is_enabled") {
      setTempData({ ...tempData, [name]: +e.target.checked });
    } else {
      setTempData({ ...tempData, [name]: value });
    }
  };

  return (
    <div
      className="modal fade"
      id="couponModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === CREATE_COUPON && "建立新優惠券"}
              {type === EDIT_COUPON && `編輯 ${tempCoupon.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeCouponModal}
            />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  name="title"
                  className="form-control mt-1"
                  value={tempData.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="percent">
                  折扣（%）
                  <input
                    type="number"
                    name="percent"
                    id="percent"
                    max={100}
                    placeholder="請輸入折扣（%）"
                    className="form-control mt-1"
                    value={tempData.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    min={getFormalDateString(new Date())}
                    placeholder="請輸入到期日"
                    className="form-control mt-1"
                    value={getFormalDateString(date)}
                    onChange={(e) => {
                      setDate(new Date(e.target.value));
                    }}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="請輸入優惠碼"
                    className="form-control mt-1"
                    value={tempData.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className="form-check-label" htmlFor="is_enabled">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                checked={!!tempData.is_enabled}
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeCouponModal}
            >
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
