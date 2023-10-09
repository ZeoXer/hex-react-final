import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import { getCartProducts } from "../../api/functions";
import Message from "../../components/Message";
import { MessageContextProvider } from "../../store/message";

const FrontLayout = () => {
  const [cartData, setCartData] = useState({});

  const fetchCart = async () => {
    try {
      const res = await getCartProducts();
      setCartData(res.data.data);
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
      <Outlet context={{ fetchCart, cartData }} />
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white ms-3">
                  <i className="fab fa-line"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MessageContextProvider>
  );
};

export default FrontLayout;
