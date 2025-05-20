import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/usersSlice";
import { useToast } from "@/contexts/toastMessage";
import { useLoading } from "@/contexts/LoadingContext";

export default function Users() {
    const dispatch = useDispatch();
    const { listUser } = useSelector(state => state.users);
    const { showToast } = useToast();
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        dispatch(fetchUsers())
            .unwrap()
            .then(() => {
                showToast("Lấy danh sách người dùng thành công!", "success");
            })
            .catch((error) => {
                showToast(error.message || "Không thể lấy danh sách người dùng", "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch, showToast, setLoading]);

    return (
        <div className="user-page">
            {listUser.map(product => (
                <div key={product.id}>{product.username}</div>
            ))}
        </div>
    );
}