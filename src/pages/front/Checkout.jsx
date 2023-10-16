import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "../../components/FormComponents";
import { checkoutOrder } from "../../api/functions";
import { useState } from "react";
import { LoadingButton } from "../../components/Loadings";

const Checkout = () => {
  const { cartData } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, tel, address } = data;
    const form = {
      user: {
        name,
        email,
        tel,
        address,
      },
      message: "這是留言",
    };

    setIsLoading(true);
    const res = await checkoutOrder(form);
    setIsLoading(false);
    navigate(`/success/${res.data.orderId}`);
  };

  return (
    <div className="bg-light pt-5 pb-7">
      <div className="container">
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-4">
              <h4 className="fw-bold">填寫送貨資料</h4>
              <div className="mb-2">
                <Input
                  register={register}
                  errors={errors}
                  id="email"
                  type="email"
                  labelText="Email"
                  rules={{
                    required: "Email 為必填",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email 格式不正確",
                    },
                  }}
                />
              </div>
              <div className="mb-2">
                <Input
                  register={register}
                  errors={errors}
                  id="name"
                  type="text"
                  labelText="姓名"
                  rules={{
                    required: "姓名為必填",
                    maxLength: {
                      value: 10,
                      message: "姓名長度不得超過 10 個字元",
                    },
                  }}
                />
              </div>
              <div className="mb-2">
                <Input
                  register={register}
                  errors={errors}
                  id="tel"
                  type="tel"
                  labelText="聯絡電話"
                  rules={{
                    required: "聯絡電話為必填",
                    minLength: {
                      value: 10,
                      message: "電話請輸入 10 碼數字",
                    },
                    maxLength: {
                      value: 10,
                      message: "電話請輸入 10 碼數字",
                    },
                  }}
                />
              </div>
              <div className="mb-2">
                <Input
                  register={register}
                  errors={errors}
                  id="address"
                  type="address"
                  labelText="地址"
                  rules={{
                    required: "地址為必填",
                  }}
                />
              </div>
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link className="text-dark mt-md-0 mt-3" to="/products">
                <i className="bi bi-chevron-left me-2"></i> 繼續購物
              </Link>
              <button
                type="submit"
                className="btn btn-dark py-3 px-7 rounded-pill d-flex align-items-center"
                style={{ height: "60px" }}
              >
                {isLoading ? <LoadingButton /> : "送出訂單"}
              </button>
            </div>
          </form>
          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="mb-4 fw-bold">訂單明細</h4>
              {cartData?.carts?.map((item) => {
                return (
                  <div className="d-flex" key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="me-2"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{item.product.title}</p>
                        <p className="mb-0">x{item.qty}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          <small>NT$ {item.product.price}</small>
                        </p>
                        <p className="mb-0">NT$ {item.final_total}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">總金額</p>
                <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
