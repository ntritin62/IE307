// export const orderData = [
//   {
//     id: "order_1",
//     order_no: "#5558760098",
//     order_date: "2 June 2023 2:40 PM",
//     status: "Đã hủy",
//     delivery_date: "8 June 2023",
//     payment_method: "khi nhận hàng",
//     items: [
//       {
//         id: "product_01",
//         name: "Laptop Asus Vivobook Go 15 E1504FA",
//         color: "White",
//         quantity: 1,
//         price: 23,
//         imgSource: {
//           uri: "https://cdn.tgdd.vn/Products/Images/44/311178/asus-vivobook-go-15-e1504fa-r5-nj776w-glr-2-750x500.jpg",
//         }, // require("../assets/images/cart1.png"), // Đảm bảo là require()
//       },
//       {
//         id: "product_02",
//         name: "Laptop Dell Inspiron 15 3520",
//         color: "Maroon",
//         quantity: 5,
//         price: 21,
//         imgSource: {
//           uri: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/325242/dell-inspiron-15-3520-i5-n5i5052w1-glr-2-638629598139234508-750x500.jpg",
//         }, // Đảm bảo là require()
//       },
//       {
//         id: "product_03",
//         name: "Laptop Lenovo Ideapad Slim 3 15IAH8",
//         color: "Black",
//         quantity: 10,
//         price: 90,
//         imgSource: {
//           uri: "https://cdn.tgdd.vn/Products/Images/44/313333/lenovo-ideapad-slim-3-15iah8-i5-83er00evn-glr-2-750x500.jpg",
//         }, // Đảm bảo là require()
//       },
//     ],
//   },
//   {
//     id: "order_2",
//     order_no: "#8958360118",
//     order_date: "2 June 2023 2:40 PM",
//     status: "Đang giao",
//     delivery_date: "12 August 2023",
//     payment_method: "Online",
//     items: [
//       {
//         id: "product_04",
//         name: "Laptop Dell Inspiron 15",
//         color: "Maroon",
//         quantity: 5,
//         price: 21,
//         imgSource: {
//           uri: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/325242/dell-inspiron-15-3520-i5-n5i5052w1-glr-2-638629598139234508-750x500.jpg",
//         }, // Đảm bảo là require()
//       },
//       {
//         id: "product_05",
//         name: "Laptop Asus Vivobook Go 15 E1504FA R5 ",
//         color: "White",
//         quantity: 1,
//         price: 23,
//         imgSource: {
//           uri: "https://cdn.tgdd.vn/Products/Images/44/311178/asus-vivobook-go-15-e1504fa-r5-nj776w-glr-2-750x500.jpg",
//         }, // Đảm bảo là require()
//       },
//       {
//         id: "product_08",
//         name: "Laptop Lenovo Ideapad Slim 3 15IAH8",
//         color: "Black",
//         quantity: 10,
//         price: 90,
//         imgSource: {
//           uri: "https://cdn.tgdd.vn/Products/Images/44/313333/lenovo-ideapad-slim-3-15iah8-i5-83er00evn-glr-2-750x500.jpg",
//         }, // Đảm bảo là require()
//       },
//     ],
//   },
// ];

// data.js

export const orders = [
  {
    _id: "order_1",
    createdAt: "2024-11-01",
    status: "pending", // Trạng thái đơn hàng: pending, paid, delivering, delivered, canceled
    total: 500000, // Tổng giá trị đơn hàng
    orderItems: [
      {
        _id: "item_1",
        name: "Laptop Asus Vivobook Go 15 E1504FA",
        price: 200000,
        imageUrl:
          "https://cdn.tgdd.vn/Products/Images/44/311178/asus-vivobook-go-15-e1504fa-r5-nj776w-glr-2-750x500.jpg",
      },
      {
        _id: "item_2",
        name: "Laptop Dell Inspiron 15 3520",
        price: 300000,
        imageUrl:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/325242/dell-inspiron-15-3520-i5-n5i5052w1-glr-2-638629598139234508-750x500.jpg",
      },
    ],
  },
  {
    _id: "order_2",
    createdAt: "2024-11-15",
    status: "delivered",
    total: 800000,
    orderItems: [
      {
        _id: "item_3",
        name: "Laptop Asus Vivobook Go 15 E1504FA R5 ",
        price: 800000,
        imageUrl:
          "https://cdn.tgdd.vn/Products/Images/44/311178/asus-vivobook-go-15-e1504fa-r5-nj776w-glr-2-750x500.jpg",
      },
    ],
  },
  {
    _id: "order_3",
    createdAt: "2024-11-20",
    status: "canceled",
    total: 450000,
    orderItems: [
      {
        _id: "item_4",
        name: "Laptop Lenovo Ideapad Slim 3 15IAH8",
        price: 450000,
        imageUrl:
          "https://cdn.tgdd.vn/Products/Images/44/313333/lenovo-ideapad-slim-3-15iah8-i5-83er00evn-glr-2-750x500.jpg",
      },
    ],
  },
  {
    _id: "order_4",
    createdAt: "2024-11-18",
    status: "paid",
    total: 1200000,
    orderItems: [
      {
        _id: "item_5",
        name: "Laptop Dell Inspiron 15",
        price: 1200000,
        imageUrl:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/325242/dell-inspiron-15-3520-i5-n5i5052w1-glr-2-638629598139234508-750x500.jpg",
      },
    ],
  },
];
