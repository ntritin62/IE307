export const formatProductSpecifications = (product) => {
  return [
    { title: 'CPU', detail: product.cpu },
    { title: 'RAM', detail: product.ram },
    { title: 'Ổ cứng', detail: product.hardDisk },
    { title: 'Card đồ họa', detail: product.graphicCard },
    { title: 'Màn hình', detail: product.screen },
    { title: 'Cổng kết nối', detail: product.connectionPort },
    { title: 'Bàn phím', detail: product.keyboard },
    { title: 'Audio', detail: product.audio },
    { title: 'Chuẩn Lan', detail: product.lan },
    { title: 'Wifi + Bluetooth', detail: product.wirelessLan },
    { title: 'Webcam', detail: product.webcam },
    { title: 'Hệ điều hành', detail: product.os },
    { title: 'Pin', detail: product.battery },
    { title: 'Trọng lượng', detail: product.weight || 'N/A' },
    { title: 'Màu sắc', detail: product.color || 'N/A' },
    { title: 'Kích thước', detail: product.size || 'N/A' },
  ];
};

export const newPrice = (price, saleOff) => {
  return price - price * (saleOff / 100);
};
