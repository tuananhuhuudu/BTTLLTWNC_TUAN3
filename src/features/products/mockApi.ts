import type { Product } from './types';

function placeholderImage(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
    <rect width="300" height="300" fill="${color}" />
    <text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="#fff" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Áo thun basic',
    price: 150000,
    description: 'Áo thun cotton form rộng, thoáng mát.',
    category: 'Thời trang',
    image: placeholderImage('Áo thun', '#4f46e5'),
  },
  {
    id: 2,
    title: 'Quần jeans slim fit',
    price: 350000,
    description: 'Quần jeans co giãn, dáng slim.',
    category: 'Thời trang',
    image: placeholderImage('Quần jeans', '#0891b2'),
  },
  {
    id: 3,
    title: 'Giày sneaker trắng',
    price: 550000,
    description: 'Giày sneaker phối màu trắng basic.',
    category: 'Giày dép',
    image: placeholderImage('Sneaker', '#059669'),
  },
  {
    id: 4,
    title: 'Balo laptop 15 inch',
    price: 420000,
    description: 'Balo chống nước, ngăn đựng laptop 15 inch.',
    category: 'Phụ kiện',
    image: placeholderImage('Balo', '#d97706'),
  },
  {
    id: 5,
    title: 'Tai nghe bluetooth',
    price: 290000,
    description: 'Tai nghe không dây, chống ồn chủ động.',
    category: 'Điện tử',
    image: placeholderImage('Tai nghe', '#dc2626'),
  },
  {
    id: 6,
    title: 'Đồng hồ thông minh',
    price: 990000,
    description: 'Theo dõi sức khỏe, nhịp tim, giấc ngủ.',
    category: 'Điện tử',
    image: placeholderImage('Đồng hồ', '#7c3aed'),
  },
];

const NETWORK_DELAY_MS = 600;

/** Giả lập gọi API thật (fetch tới server) kèm độ trễ mạng. */
export function fetchProductsFromApi(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), NETWORK_DELAY_MS);
  });
}
