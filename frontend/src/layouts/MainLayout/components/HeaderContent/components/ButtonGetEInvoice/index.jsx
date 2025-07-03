import "./ButtonGetEInvoice.css";
import Button from "../../../../../../components/ui/Button";
import { FileSpreadsheet } from "lucide-react";
import PropTypes from "prop-types";

const ButtonGetEInvoice = ({ onClick }) => {
  return (
    <div className="button-get-e-invoice">
      <Button variant="contained" icon={<FileSpreadsheet />} onClick={onClick}>
        Lấy hóa đơn điện tử
      </Button>
    </div>
  );
};

ButtonGetEInvoice.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonGetEInvoice;
