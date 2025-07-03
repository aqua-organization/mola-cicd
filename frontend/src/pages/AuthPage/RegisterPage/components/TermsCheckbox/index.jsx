import PropTypes from "prop-types";
import Checkbox from "../../../../../components/ui/Checkbox";
import "./TermsCheckbox.css";

const TermsCheckbox = ({ register, errors }) => {
  return (
    <div className="terms-checkbox">
      <Checkbox
        {...register("agreeToTerms", {
          required: "Bạn phải đồng ý với điều khoản sử dụng",
        })}
        label="Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật"
      />
      {errors.agreeToTerms && (
        <p className="terms-checkbox-error">{errors.agreeToTerms.message}</p>
      )}
    </div>
  );
};

TermsCheckbox.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default TermsCheckbox;
