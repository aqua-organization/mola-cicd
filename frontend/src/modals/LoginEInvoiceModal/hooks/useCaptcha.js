import { useState, useCallback, useEffect } from "react";
import { getCaptcha } from "../../../services/eInvoiceService";

export const useCaptcha = () => {
  const [captchaData, setCaptchaData] = useState({
    content: "",
    key: "",
    type: "svg",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshCaptcha = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getCaptcha();
      setCaptchaData({
        content: response.content,
        key: response.key,
        type: "svg",
      });
    } catch (err) {
      setError("Không thể tải mã captcha");
      console.error("Error refreshing captcha:", err);

      // Fallback to mock for development
      const mockSvgCaptcha = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40" viewBox="0,0,200,40">
        <path d="M4 26 C99 20,119 29,194 39" stroke="#777" fill="none"/>
        <path fill="#111" d="M20 15 L25 25 L30 20 L35 30 L20 15 Z"/>
        <path fill="#333" d="M45 12 Q50 25 55 18 L60 28 Q52 22 45 12"/>
        <path fill="#555" d="M70 14 L80 24 Q75 30 70 20 L75 16 Z"/>
        <path fill="#777" d="M90 16 Q95 22 100 18 L105 26 Q98 24 90 16"/>
        <path fill="#222" d="M115 13 L125 23 Q120 29 115 19 L120 15 Z"/>
        <path fill="#444" d="M135 15 Q140 21 145 17 L150 25 Q143 23 135 15"/>
      </svg>`;

      setCaptchaData({
        content: mockSvgCaptcha,
        key: "mock_key_" + Date.now(),
        type: "svg",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-load captcha on mount
  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    captchaData,
    isLoading,
    error,
    refreshCaptcha,
    resetError,
  };
};
