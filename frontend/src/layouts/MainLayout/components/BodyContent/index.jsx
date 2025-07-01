import "./BodyContent.css";
import PropTypes from "prop-types";

const BodyContent = ({ children }) => {
  return <div className="body-content">{children}</div>;
};

BodyContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BodyContent;
