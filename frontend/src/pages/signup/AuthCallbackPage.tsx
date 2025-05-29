import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "@/components/common/LoadingSpinner";

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <div>
      <LoadingSpinner />
    </div>
  );
};

export default AuthCallbackPage;
