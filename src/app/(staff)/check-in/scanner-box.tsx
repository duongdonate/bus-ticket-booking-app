// components/ScannerBox.tsx
import { Scanner } from "@yudiel/react-qr-scanner";

interface ScannerBoxProps {
  onSuccess: (decodedText: string) => void;
  onError?: (error: any) => void;
}

const ScannerBox = ({ onSuccess, onError }: ScannerBoxProps) => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-black">
      <Scanner
        // 1. Sự kiện khi quét thành công
        onScan={(result) => {
          if (result && result.length > 0) {
            // result trả về 1 mảng, ta lấy phần tử đầu tiên
            onSuccess(result[0].rawValue);
          }
        }}
        // 2. Sự kiện lỗi (tùy chọn, để log chơi thôi)
        onError={(error) => {
          if (onError) {
            onError(error);
          } else {
            console.error("QR Scan Error:", error);
          }
        }}
        // 3. Cấu hình giao diện
        // Tắt cái khung ngắm mặc định của thư viện đi cho clean (nếu muốn)
        // scanDelay: thời gian nghỉ giữa 2 lần quét (ms)
        scanDelay={500}
        allowMultiple={true}
        // 4. Style để ép nó lấp đầy div cha
        styles={{
          container: {
            width: "100%",
            height: "100%",
            borderRadius: "0.75rem", // tương đương rounded-xl
          },
          video: {
            width: "100%",
            height: "100%",
            objectFit: "cover", // Quan trọng: chống méo hình
          },
        }}
        // 5. Tắt âm thanh bíp nếu không cần
        components={{
          onOff: false, // Tắt nút bật đèn pin nếu không cần
          finder: false, // Tắt cái khung vuông đỏ đỏ mặc định (vì UI bạn đã có khung rồi)
        }}
      />
    </div>
  );
};

export default ScannerBox;
