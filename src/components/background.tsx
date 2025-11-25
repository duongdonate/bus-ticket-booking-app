import Image from "next/image";
import Bus from "@/assets/school-bus.png";
import BackgroundImage from "@/assets/background.png";

function Background() {
  return (
    <div className="w-full">
      <div className="fixed inset-0 -z-20 overflow-hidden bg-gray-200">
        <Image
          src={BackgroundImage}
          alt="City Background"
          fill // Tự động full width/height của thẻ cha
          quality={100}
          priority // Load ngay lập tức
          // object-cover: Phủ kín màn hình
          // object-bottom: QUAN TRỌNG - Neo ảnh vào đáy để tòa nhà không bị cắt mất khi chỉnh height
          className="object-cover object-bottom"
        />
      </div>
      <div className="z-10 absolute bottom-0 right-0 w-full overflow-hidden">
        <div className="animation-marquee w-max">
          <Image
            src={Bus}
            alt="bus"
            className="size-[128px] object-contain object-center"
          />
        </div>
      </div>
      <div className="z-10 absolute top-0 right-0 w-full overflow-hidden">
        <div className="animation-marquee w-max"></div>
      </div>
    </div>
  );
}

export default Background;
