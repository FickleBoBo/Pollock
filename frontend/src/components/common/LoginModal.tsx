import { useEffect, useRef } from "react";

import OAuthLoginButton from "./OAuthLoginButton";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvent = (event: MouseEvent | KeyboardEvent) => {
      if (
        event instanceof MouseEvent &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }

      if (event instanceof KeyboardEvent && event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("keydown", handleEvent);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="p-16 bg-pollock800">
        <div className="flex flex-col gap-8">
          <OAuthLoginButton provider="naver" />
          <OAuthLoginButton provider="kakao" />
          <OAuthLoginButton provider="google" />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
