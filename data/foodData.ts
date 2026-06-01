export interface FoodItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  prepTime: string;
  calories: number;
  isPopular?: boolean;
  isFeatured?: boolean; // For the top recommended carousel
}

export const CATEGORIES = [
  { id: "all", name: "Todo el Menú", icon: "✨" },
  { id: "burgers", name: "Hamburguesas", icon: "🍔" },
  { id: "pizza", name: "Pizzas", icon: "🍕" },
  { id: "hotdogs", name: "Perros Calientes", icon: "🌭" },
  { id: "fries", name: "Acompañamientos", icon: "🍟" },
  { id: "combos", name: "Combos", icon: "🍱" },
  { id: "drinks", name: "Bebidas", icon: "🥤" },
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: "b1",
    title: "Truffle Umami Smash",
    description: "Doble carne premium de res Angus smash, queso suizo fundido, cebolla caramelizada y nuestra salsa alioli de trufa en pan brioche artesanal.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    category: "burgers",
    price: 34900, // COP format
    rating: 4.9,
    prepTime: "12-15 min",
    calories: 780,
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "b2",
    title: "Double Smokehouse Bacon",
    description: "Doble carne de res Angus a la parrilla, tocineta ahumada crujiente, queso cheddar maduro, aros de cebolla y salsa BBQ bourbon artesanal.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    category: "burgers",
    price: 36900,
    rating: 4.8,
    prepTime: "15 min",
    calories: 920,
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "b3",
    title: "Hot Honey Crispy Chicken",
    description: "Pechuga de pollo súper crujiente marinada en buttermilk, bañada en miel picante, ensalada de col spicy, pepinillos y mayonesa de ajo.",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
    category: "burgers",
    price: 29900,
    rating: 4.7,
    prepTime: "10-12 min",
    calories: 690,
  },
  {
    id: "p1",
    title: "Pepperoni & Hot Honey",
    description: "Masa madre madurada 48 horas, pepperoni premium, queso mozzarella fresco, salami picante, hojuelas de chile rojo y un toque de miel picante.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    category: "pizza",
    price: 38900,
    rating: 4.9,
    prepTime: "18-20 min",
    calories: 1100,
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "p2",
    title: "Truffle Mushroom Pizza",
    description: "Base de salsa blanca cremosa, champiñones silvestres salteados, mozzarella fresca, aceite de trufa, rúgula fresca y parmesano rallado.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80",
    category: "pizza",
    price: 39900,
    rating: 4.6,
    prepTime: "18 min",
    calories: 980,
  },
  {
    id: "h1",
    title: "Chili Cheese Master Dog",
    description: "Salchicha alemana de res premium en pan suave, cargada con chili con carne casero, salsa cheddar caliente, jalapeños y cebollita crujiente.",
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&auto=format&fit=crop&q=80",
    category: "hotdogs",
    price: 24900,
    rating: 4.5,
    prepTime: "8-10 min",
    calories: 620,
  },
  {
    id: "f1",
    title: "Papas Maple Bacon",
    description: "Papas rústicas doradas salpimentadas, bañadas en salsa de queso cheddar caliente, trozos de tocineta caramelizada con maple y cebollín fresco.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
    category: "fries",
    price: 18900,
    rating: 4.8,
    prepTime: "8 min",
    calories: 550,
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "f2",
    title: "Papas Trufa & Parmesano",
    description: "Papas francesas delgadas y crujientes aderezadas con aceite de trufa negra real, queso parmesano rallado y perejil picado.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop&q=80",
    category: "fries",
    price: 19900,
    rating: 4.7,
    prepTime: "7 min",
    calories: 480,
  },
  {
    id: "c1",
    title: "Combo Mega Fiesta",
    description: "Nuestra hamburguesa insignia Truffle Smash, una porción de Papas Rústicas Maple Bacon y una Limonada de Cereza bien fría.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&auto=format&fit=crop&q=80",
    category: "combos",
    price: 49900,
    rating: 4.9,
    prepTime: "15 min",
    calories: 1450,
    isPopular: true,
  },
  {
    id: "d1",
    title: "Limonada de Cereza Artesanal",
    description: "Zumo de limones frescos seleccionados, almíbar de cerezas premium, agua mineral con gas y hojas de menta fresca sobre hielo frappé.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    category: "drinks",
    price: 11900,
    rating: 4.8,
    prepTime: "3-5 min",
    calories: 120,
  },
  {
    id: "d2",
    title: "Cold Brew Shake Cream",
    description: "Helado cremoso de vainilla artesanal batido con café orgánico filtrado en frío (Cold Brew), crema batida y cacao espolvoreado.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
    category: "drinks",
    price: 13900,
    rating: 4.7,
    prepTime: "5 min",
    calories: 380,
  },
];
