import { useEffect, useState } from "react";
import { RepositoryFactory } from "@/repositories/repository-factory";
import { useToast } from "@/contexts/toastMessage";
import { useLoading } from "@/contexts/LoadingContext";
import "./style.scss";

export default function Products() {
    const products = RepositoryFactory.get("products");
    const { showToast } = useToast();
    const { setLoading } = useLoading();

    const [listproduct, setListProduct] = useState([]);
    const [productById, setProductById] = useState({});
    const [productByCate, setProductByCate] = useState([]);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                setLoading(true);
                const response = await products.getProductsByCategory("electronics");
                setProductByCate(response.data);
                showToast("Lấy danh sách sản phẩm thành công!", "success");
            } catch (error) {
                showToast(error.message, "error");
            } finally {
                setLoading(false);
            }
        }

        fetchProductsByCategory();
    }, [])

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                setLoading(true);
                const response = await products.getProductById(1);
                setProductById(response.data);
            } catch (error) {
                showToast(error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        fetchProductById();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await products.getProducts();
                setListProduct(response.data);
                showToast("Lấy sản phẩm thành công!", "success");
            } catch (error) {
                showToast(error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="product-page">
            <div className="container mx-auto">
                <h2 className="page-title mb-[20px]">Products</h2>

                <div className="mb-[20px]">
                    { productById.title } <br />
                    { productById.price }
                </div>

                <div className="mb-[20px]">
                {
                    productByCate.map((product) => {
                        return (
                            <div className="item mb mb-[10px]" key={product.id}>
                                <p className="title">{product.title}</p>
                                <p className="price">
                                    {product.price}
                                </p>
                            </div>
                        )
                    })
                }
                </div>

                {
                    listproduct.map((product) => {
                        return (
                            <div className="item mb mb-[10px]" key={product.id}>
                                <p className="title">{product.title}</p>
                                <p className="short-txt">
                                    {product.description}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
