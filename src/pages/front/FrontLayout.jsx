import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import { getCartProducts } from "../../api/functions";
import Message from "../../components/Message";
import { MessageContextProvider } from "../../store/message";

const FrontLayout = () => {
  const [cartData, setCartData] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await getCartProducts();
      setCartData(res.data.data);
      setIsEmpty(res.data.data.carts.length === 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <MessageContextProvider>
      <Message />
      <NavBar cartData={cartData} />
      <Outlet context={{ fetchCart, cartData, isEmpty }} />
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center text-white py-4">
            <p className="mb-0">© 本網站僅做學習用途，不牽涉任何商業行為</p>
          </div>
        </div>
      </div>
    </MessageContextProvider>
  );
};

export default FrontLayout;
