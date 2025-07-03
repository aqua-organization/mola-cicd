import PropTypes from "prop-types";
import Checkbox from "../../../../../components/ui/Checkbox";
import "./LoginActions.css";

const LoginActions = ({ register }) => {
  return (
    <div className="login-actions">
      <Checkbox {...register("rememberMe")} label="Ghi nhớ mật khẩu" />
      <a href="/auth/forgot-password" className="login-actions-forgot-password">
        Quên mật khẩu?
      </a>
    </div>
  );
};

LoginActions.propTypes = {
  register: PropTypes.func.isRequired,
};

export default LoginActions;
