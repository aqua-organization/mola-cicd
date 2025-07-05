import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, FileText, Calculator, Receipt } from "lucide-react";

// Components
import Button from "../../components/ui/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      {/* Floating Background Shapes */}
      <div className="not-found-page-floating-shapes">
        <div className="not-found-page-shape-1"></div>
        <div className="not-found-page-shape-2"></div>
        <div className="not-found-page-shape-3"></div>
      </div>

      {/* Wave Effect */}
      <div className="not-found-page-wave-container"></div>

      {/* Corner Accents */}
      <div className="not-found-page-corner-accent not-found-page-top-left"></div>
      <div className="not-found-page-corner-accent not-found-page-top-right"></div>
      <div className="not-found-page-corner-accent not-found-page-bottom-left"></div>
      <div className="not-found-page-corner-accent not-found-page-bottom-right"></div>

      <div className="not-found-page-container">
        <div className="not-found-page-content">
          {/* 404 Number with Invoice Icon */}
          <div className="not-found-page-number">
            <span className="not-found-page-number-4">4</span>
            <div className="not-found-page-zero-container">
              <div className="not-found-page-zero-circle">
                <Receipt className="not-found-page-search-icon" />
              </div>
            </div>
            <span className="not-found-page-number-4">4</span>
          </div>

          {/* Main Message */}
          <h1 className="not-found-page-title">Trang không tồn tại</h1>
          <p className="not-found-page-description">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di
            chuyển. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
          </p>

          {/* Professional Actions */}
          <div className="not-found-page-actions">
            <Button variant="contained" onClick={() => navigate("/")}>
              <Home size={18} />
              Về trang chủ
            </Button>
            <Button variant="outlined" onClick={() => window.history.back()}>
              <ArrowLeft size={18} />
              Quay lại
            </Button>
          </div>

          {/* Professional Footer Info */}
          <div className="not-found-page-footer">
            <div className="not-found-page-footer-info">
              <div className="not-found-page-info-item">
                <FileText size={16} />
                <span>Hệ thống quản lý hóa đơn điện tử</span>
              </div>
              <div className="not-found-page-info-item">
                <Calculator size={16} />
                <span>Phần mềm kế toán chuyên nghiệp</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="not-found-page-decoration">
            <div className="not-found-page-decoration-circle not-found-page-circle-1"></div>
            <div className="not-found-page-decoration-circle not-found-page-circle-2"></div>
            <div className="not-found-page-decoration-circle not-found-page-circle-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
