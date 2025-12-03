// contexts/ToastContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Toast, { ToastProps } from "@/components/ui/toast";
import styles from "../components/Toast/Toast.module.css";

interface ToastContextType {
  showToast: (message: string, type: "success" | "error") => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<any[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  const success = (message: string) => {
    showToast(message, "success");
  };

  const error = (message: string) => {
    showToast(message, "error");
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, success, error }}>
      {children}
      <div
        id="toast-container"
        className="fixed top-4 right-4 flex flex-col gap-2 z-50"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast key={t.id} {...t} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
