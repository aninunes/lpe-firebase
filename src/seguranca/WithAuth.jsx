import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

function WithAuth(Component) {
    return function AuthenticatedComponent(props) {
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(null);
        const navigate = useNavigate();

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    setUser(user);
                } else {
                    navigate("/login");
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }, [navigate]);

        if (loading) {
            return <div>Carregando...</div>;
        }

        return user ? <Component {...props} user={user} /> : null;
    };
}

export default WithAuth;
