export interface Booking {
  id: string;
  ticketCode: string;
  seatNumbers: string[];
  route: {
    from: string;
    to: string;
  };
  departureDate: Date;
  departureTime: string;
  amount: number;
  paymentStatus: "paid" | "pending" | "failed";
  bookingStatus: "confirmed" | "cancelled" | "completed";
}

export interface BookingDetail {
  id: string;
  ticketCode: string;
  bookingDate: Date;
  bookingTime: string;
  status: "confirmed" | "cancelled" | "completed";
  paymentStatus: "paid" | "pending" | "failed";
  paymentMethod: string;
  totalAmount: number;
  
  passenger: {
    name: string;
    phone: string;
    email: string;
  };

  trip: {
    busCompany: string;
    busType: string;
    licensePlate: string;
    route: {
      from: string;
      to: string;
    };
    departureDate: Date;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    pickupPoint: string;
    dropoffPoint: string;
  };

  seats: Array<{
    seatNumber: string;
    price: number;
  }>;

  pricing: {
    subtotal: number;
    discount: number;
    serviceFee: number;
    total: number;
  };
}

export const mockBookings: Booking[] = [
  {
    id: "1",
    ticketCode: "VE001234",
    seatNumbers: ["A12", "A13"],
    route: {
      from: "TP. Hồ Chí Minh",
      to: "Đà Lạt",
    },
    departureDate: new Date(2024, 10, 15), // 15/11/2024
    departureTime: "08:00",
    amount: 500000,
    paymentStatus: "paid",
    bookingStatus: "confirmed",
  },
  {
    id: "2",
    ticketCode: "VE001235",
    seatNumbers: ["B05"],
    route: {
      from: "Hà Nội",
      to: "Hải Phòng",
    },
    departureDate: new Date(2024, 10, 10), // 10/11/2024
    departureTime: "14:30",
    amount: 250000,
    paymentStatus: "paid",
    bookingStatus: "completed",
  },
  {
    id: "3",
    ticketCode: "VE001236",
    seatNumbers: ["C08", "C09", "C10"],
    route: {
      from: "Đà Nẵng",
      to: "Nha Trang",
    },
    departureDate: new Date(2024, 10, 20), // 20/11/2024
    departureTime: "06:00",
    amount: 750000,
    paymentStatus: "pending",
    bookingStatus: "confirmed",
  },
  {
    id: "4",
    ticketCode: "VE001237",
    seatNumbers: ["D15"],
    route: {
      from: "TP. Hồ Chí Minh",
      to: "Vũng Tàu",
    },
    departureDate: new Date(2024, 10, 5), // 05/11/2024
    departureTime: "10:00",
    amount: 200000,
    paymentStatus: "paid",
    bookingStatus: "cancelled",
  },
  {
    id: "5",
    ticketCode: "VE001238",
    seatNumbers: ["E20", "E21"],
    route: {
      from: "Huế",
      to: "Đà Nẵng",
    },
    departureDate: new Date(2024, 10, 25), // 25/11/2024
    departureTime: "16:00",
    amount: 300000,
    paymentStatus: "failed",
    bookingStatus: "cancelled",
  },
  {
    id: "6",
    ticketCode: "VE001239",
    seatNumbers: ["F03"],
    route: {
      from: "Cần Thơ",
      to: "TP. Hồ Chí Minh",
    },
    departureDate: new Date(2024, 10, 12), // 12/11/2024
    departureTime: "07:30",
    amount: 180000,
    paymentStatus: "paid",
    bookingStatus: "completed",
  },
];

export const mockBookingDetails: { [key: string]: BookingDetail } = {
  "1": {
    id: "1",
    ticketCode: "VE001234",
    bookingDate: new Date(2024, 10, 10), // 10/11/2024
    bookingTime: "14:30",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "Thẻ tín dụng",
    totalAmount: 500000,
    
    passenger: {
      name: "Trần Hữu Nghĩa",
      phone: "0903947590",
      email: "nghiatran0309@gmail.com",
    },

    trip: {
      busCompany: "Phương Trang",
      busType: "Limousine 24 giường nằm",
      licensePlate: "51G-12345",
      route: {
        from: "TP. Hồ Chí Minh",
        to: "Đà Lạt",
      },
      departureDate: new Date(2024, 10, 15), // 15/11/2024
      departureTime: "08:00",
      arrivalTime: "14:00",
      duration: "6 giờ",
      pickupPoint: "Bến xe Miền Đông - 292 Đinh Bộ Lĩnh, Phường 26, Bình Thạnh",
      dropoffPoint: "Bến xe Đà Lạt - 01 Tô Hiến Thành, Phường 3, Đà Lạt",
    },

    seats: [
      { seatNumber: "A12", price: 250000 },
      { seatNumber: "A13", price: 250000 },
    ],

    pricing: {
      subtotal: 500000,
      discount: 0,
      serviceFee: 0,
      total: 500000,
    },
  },
  "2": {
    id: "2",
    ticketCode: "VE001235",
    bookingDate: new Date(2024, 10, 8), // 08/11/2024
    bookingTime: "10:15",
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "VNPay",
    totalAmount: 250000,
    
    passenger: {
      name: "Trần Hữu Nghĩa",
      phone: "0903947590",
      email: "nghiatran0309@gmail.com",
    },

    trip: {
      busCompany: "Mai Linh",
      busType: "Ghế ngồi 45 chỗ",
      licensePlate: "29B-67890",
      route: {
        from: "Hà Nội",
        to: "Hải Phòng",
      },
      departureDate: new Date(2024, 10, 10), // 10/11/2024
      departureTime: "14:30",
      arrivalTime: "16:30",
      duration: "2 giờ",
      pickupPoint: "Bến xe Mỹ Đình - Phạm Hùng, Nam Từ Liêm, Hà Nội",
      dropoffPoint: "Bến xe Niệm Nghĩa - Lê Lợi, Ngô Quyền, Hải Phòng",
    },

    seats: [
      { seatNumber: "B05", price: 250000 },
    ],

    pricing: {
      subtotal: 250000,
      discount: 0,
      serviceFee: 0,
      total: 250000,
    },
  },
  "3": {
    id: "3",
    ticketCode: "VE001236",
    bookingDate: new Date(2024, 10, 18), // 18/11/2024
    bookingTime: "09:45",
    status: "confirmed",
    paymentStatus: "pending",
    paymentMethod: "Tiền mặt",
    totalAmount: 750000,
    
    passenger: {
      name: "Trần Hữu Nghĩa",
      phone: "0903947590",
      email: "nghiatran0309@gmail.com",
    },

    trip: {
      busCompany: "Hùng Cường",
      busType: "Giường nằm 40 chỗ",
      licensePlate: "43C-11111",
      route: {
        from: "Đà Nẵng",
        to: "Nha Trang",
      },
      departureDate: new Date(2024, 10, 20), // 20/11/2024
      departureTime: "06:00",
      arrivalTime: "16:00",
      duration: "10 giờ",
      pickupPoint: "Bến xe Đà Nẵng - Điện Biên Phủ, Thanh Khê, Đà Nẵng",
      dropoffPoint: "Bến xe Phía Nam - 23 Tháng 10, Nha Trang",
    },

    seats: [
      { seatNumber: "C08", price: 250000 },
      { seatNumber: "C09", price: 250000 },
      { seatNumber: "C10", price: 250000 },
    ],

    pricing: {
      subtotal: 750000,
      discount: 0,
      serviceFee: 0,
      total: 750000,
    },
  },
  "4": {
    id: "4",
    ticketCode: "VE001237",
    bookingDate: new Date(2024, 10, 3), // 03/11/2024
    bookingTime: "16:20",
    status: "cancelled",
    paymentStatus: "paid",
    paymentMethod: "MoMo",
    totalAmount: 200000,
    
    passenger: {
      name: "Trần Hữu Nghĩa",
      phone: "0903947590",
      email: "nghiatran0309@gmail.com",
    },

    trip: {
      busCompany: "Phương Trang",
      busType: "Limousine 16 chỗ",
      licensePlate: "51H-22222",
      route: {
        from: "TP. Hồ Chí Minh",
        to: "Vũng Tàu",
      },
      departureDate: new Date(2024, 10, 5), // 05/11/2024
      departureTime: "10:00",
      arrivalTime: "12:00",
      duration: "2 giờ",
      pickupPoint: "Công viên 23/9 - Phạm Ngũ Lão, Quận 1, TP.HCM",
      dropoffPoint: "Bến xe Vũng Tàu - Nam Kỳ Khởi Nghĩa, Vũng Tàu",
    },

    seats: [
      { seatNumber: "D15", price: 200000 },
    ],

    pricing: {
      subtotal: 200000,
      discount: 0,
      serviceFee: 0,
      total: 200000,
    },
  },
  "5": {
    id: "5",
    ticketCode: "VE001238",
    bookingDate: new Date(2024, 10, 23), // 23/11/2024
    bookingTime: "11:30",
    status: "cancelled",
    paymentStatus: "failed",
    paymentMethod: "Thẻ ATM",
    totalAmount: 300000,
    
    passenger: {
      name: "Trần Hữu Nghĩa",
      phone: "0903947590",
      email: "nghiatran0309@gmail.com",
    },

    trip: {
      busCompany: "Thanh Bình",
      busType: "Ghế massage 34 chỗ",
      licensePlate: "49A-33333",
      route: {
        from: "Huế",
        to: "Đà Nẵng",
      },
      departureDate: new Date(2024, 10, 25), // 25/11/2024
      departureTime: "16:00",
      arrivalTime: "19:00",
      duration: "3 giờ",
      pickupPoint: "Bến xe Phía Bắc - Trường Chinh, Huế",
      dropoffPoint: "Bến xe Đà Nẵng - Điện Biên Phủ, Đà Nẵng",
    },

    seats: [
      { seatNumber: "E20", price: 150000 },
      { seatNumber: "E21", price: 150000 },
    ],

    pricing: {
      subtotal: 300000,
      discount: 0,
      serviceFee: 0,
      total: 300000,
    },
  },
  "6": {
    id: "6",
    ticketCode: "VE001239",
    bookingDate: new Date(2024, 10, 10), // 10/11/2024
    bookingTime: "08:00",
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "Chuyển khoản",
    totalAmount: 180000,
    
    passenger: {
      name: "Trần Hữu Nghĩa",
      phone: "0903947590",
      email: "nghiatran0309@gmail.com",
    },

    trip: {
      busCompany: "Phương Trang",
      busType: "Ghế ngồi 45 chỗ",
      licensePlate: "92C-44444",
      route: {
        from: "Cần Thơ",
        to: "TP. Hồ Chí Minh",
      },
      departureDate: new Date(2024, 10, 12), // 12/11/2024
      departureTime: "07:30",
      arrivalTime: "11:00",
      duration: "3.5 giờ",
      pickupPoint: "Bến xe Cần Thơ - Nguyễn Trãi, Ninh Kiều, Cần Thơ",
      dropoffPoint: "Bến xe Miền Tây - Kinh Dương Vương, Bình Tân, TP.HCM",
    },

    seats: [
      { seatNumber: "F03", price: 180000 },
    ],

    pricing: {
      subtotal: 180000,
      discount: 0,
      serviceFee: 0,
      total: 180000,
    },
  },
};