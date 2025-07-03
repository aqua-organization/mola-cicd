import PropTypes from "prop-types";
import Button from "../../../../components/ui/Button";

const SocialAuthButton = ({
  provider = "Google",
  action = "Đăng nhập",
  onClick,
  ...buttonProps
}) => {
  return (
    <Button variant="outlined" size="large" onClick={onClick} {...buttonProps}>
      {action} với {provider}
    </Button>
  );
};

SocialAuthButton.propTypes = {
  provider: PropTypes.string,
  action: PropTypes.string,
  onClick: PropTypes.func,
};

export default SocialAuthButton;
