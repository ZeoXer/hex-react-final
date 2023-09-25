import { useEffect, useState, useRef } from "react";
import { deleteProductById, getAdminProducts } from "../../api/functions";
import { Modal } from "bootstrap";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";

const CREATE_PRODUCT = "create-product";
const EDIT_PRODUCT = "edit-product";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState(CREATE_PRODUCT);
  const [tempProduct, setTempProduct] = useState({});

  const productModal = useRef();
  const deleteModal = useRef();

  useEffect(() => {
    productModal.current = new Modal("#productModal", {
      backdrop: "static",
    });

    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    fetchProducts();
  }, []);

  const fetchProducts = async (page) => {
    const productRes = await getAdminProducts(page);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };

  const closeProductModal = () => {
    productModal.current.hide();
  };

  const openDeleteModal = (product) => {
    setTempProduct(product);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await deleteProductById(id);
      if (data.success) {
        closeDeleteModal();
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <ProductModal
        closeProductModal={closeProductModal}
        fetchProducts={fetchProducts}
        tempProduct={tempProduct}
        type={type}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={tempProduct.title}
        deleteFunc={() => deleteProduct(tempProduct.id)}
      />
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openProductModal(CREATE_PRODUCT, {})}
        >
          建立新商品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openProductModal(EDIT_PRODUCT, product)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(product)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={fetchProducts} />
    </div>
  );
};

export default AdminProducts;
