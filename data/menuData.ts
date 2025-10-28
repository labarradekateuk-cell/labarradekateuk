import { Product } from '../types';

export const menuData: Omit<Product, 'owner_id' | 'created_at' | 'updated_at'>[] = [
  // --- Starters ---
  {
    id: 'p001',
    name: { es: 'Salchipapas', en: 'Salchipapas' },
    description: { es: 'Patatas fritas acompañadas de salchichas troceadas y aderezadas con salsas', en: 'French fries accompanied with chopped sausages topped with sauces' },
    price: 7.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter']
  },
  {
    id: 'p002',
    name: { es: 'Special salchipapa', en: 'Special Salchipapa' },
    description: { es: 'Cama de patatas fritas acompañadas de salchichas, pollo desmechado, carne desmechada, y queso mozzarella con salsa de tomate y mayonesa', en: 'Bed of French fries accompanied by chopped sausages, shredded chicken, shredded beef, and mozzarella cheese with tomato sauce and mayonnaise' },
    price: 10.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'chicken', 'beef', 'pork']
  },
  {
    id: 'p003',
    name: { es: 'Empanadas - Colombian pasty', en: 'Empanadas - Colombian Pasty' },
    description: { es: 'Fina masa de maíz rellena de carne de res, pollo, finamente picada, cebolla de verdeo y patatas machacadas', en: 'Thin corn dough filled with shredded beef, finely chopped spring onion, garlic and smashed potatoes' },
    price: 2.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'beef']
  },
  {
    id: 'p004',
    name: { es: 'Patacones con criolla sauce', en: 'Patacones with Criolla Sauce' },
    description: { es: '4 patacones pequeños acompañados con salsa criolla de cebolla y tomate picados finamente', en: '4 small patacones accompanied with criolla sauce of finely chopped onion and tomatoes' },
    price: 5.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'vegetarian']
  },
  {
    id: 'p005',
    name: { es: 'Fried Cassava Chips', en: 'Fried Cassava Chips' },
    description: { es: '5 dedos de yuca con ensalada', en: '5 cassava fingers with salad' },
    price: 6.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'vegetarian']
  },
  {
    id: 'p006',
    name: { es: 'Chorizo Ceviche', en: 'Chorizo Ceviche' },
    description: { es: 'Chorizo picado marinado en jugo de limón con pimiento rojo cortado en juliana, cilantro, aguacate picado y patacones "plátano verde frito"', en: 'Chopped chorizo marinated in lemon juice with red pepper cut in julienne strips, cilantro, chopped avocado, and patacones "fried green plaintain"' },
    price: 15.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'pork']
  },
  {
    id: 'p007',
    name: { es: 'Chicharron Ceviche', en: 'Chicharron Ceviche' },
    description: { es: 'Panceta de cerdo picada marinada en jugo de limón con cebolla roja cortada en juliana, cilantro, aguacate picado y patacones "plátano verde frito"', en: 'Chopped Pork belly marinated in lemon juice with red onion cut in julienne strips, cilantro, chopped avocado, and patacones "fried green plaintain"' },
    price: 16.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'pork']
  },
  {
    id: 'p008',
    name: { es: 'Chorizo con Arepa', en: 'Chorizo with Arepa' },
    description: { es: 'Chorizo colombiano servido con torta de maíz colombiana "arepa" y una pequeña porción de ensalada', en: 'Colombian chorizo served with Colombian corn cake "arepa" and a small portion of salad' },
    price: 7.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'pork']
  },
  {
    id: 'p009',
    name: { es: 'Chicharrón with Arepa', en: 'Chicharron with Arepa' },
    description: { es: 'Tiras de panceta de cerdo crujientes servidas con torta de maíz colombiana "arepa" y una pequeña porción de ensalada', en: 'Crispy pork belly rinds served with Colombian arepa "corn cake" and a small portion of salad' },
    price: 7.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'pork']
  },
  {
    id: 'p010',
    name: { es: 'Topped Patacon "Green Plantain"', en: 'Topped Patacon "Green Plantain"' },
    description: { es: 'Delicioso plátano verde frito o maduro cubierto con carne desmechada, panceta de cerdo picada, chorizo picado mezclado con exquisita salsa criolla y bañado con queso mozzarella', en: 'Delicious fried green or ripe plantain topped with shredded beef, chopped belly pork, chopped chorizo mixed with exquisite countryside sauce, and topped with mozzarella cheese' },
    price: 13.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'beef', 'pork']
  },
  {
    id: 'p011',
    name: { es: 'Topped Corn cake "Arepa"', en: 'Topped Corn Cake "Arepa"' },
    description: { es: 'Deliciosa Arepa de maíz cubierta con carne desmechada, trocitos de chicharrón, delicioso chorizo picado, mezclados con un exquisito guiso criollo y bañados con queso mozzarella', en: 'Delicious Arepa de maiz cubierta con carne desmechada, trocitos de chicharron, delicioso chorizo picado, mezclados con un exquisito guiso criollo y bañados con queso mozzarella' },
    price: 10.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'beef', 'pork']
  },
  {
    id: 'p012',
    name: { es: 'Arepa with Cheese', en: 'Arepa with Cheese' },
    description: { es: 'Torta de maíz cubierta con queso rallado', en: 'Corn arepa topped with grated cheese' },
    price: 7.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['starter', 'vegetarian']
  },
  // --- Traditional Colombian Cuisine ---
  {
    id: 'p013',
    name: { es: 'Bandeja paisa', en: 'Bandeja Paisa' },
    description: { es: 'Plato tradicional colombiano que incluye arroz blanco, frijoles, panceta de cerdo, chorizo, carne molida, huevo frito, rodaja de plátano maduro, arepa y aguacate', en: 'Traditional Colombian dish that includes white rice, beans, pork belly, chorizo, mince beef, fried egg, ripe plantain slice, arepa, and avocado' },
    price: 19.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['beef', 'pork']
  },
  {
    id: 'p014',
    name: { es: 'Cazuela paisa', en: 'Cazuela Paisa' },
    description: { es: 'Sopa de frijoles cubierta con una mezcla de chicharrones picados, chorizo, plátano maduro y cilantro, servida con una porción de arroz blanco, arepa y aguacate', en: 'Bean stew topped with a mixture of chopped pork rinds, chorizo, ripe plantain, and coriander, served with a portion of white rice, arepa, and avocado' },
    price: 16.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['pork']
  },
  {
    id: 'p015',
    name: { es: 'Cazuela montañera', en: 'Cazuela Montañera' },
    description: { es: 'Nuestra tradicional sopa de frijoles cubierta con carne de res desmechada, chicharrón picado, plátano maduro, papas fritas, cilantro, aguacate picado, servida con una porción de arroz blanco y "arepa" torta de maíz', en: 'Our traditional bean stew topped with shredded beef, chopped pork rinds, ripe plantain, chopped avocado, fried potato sticks, and coriander, served with a portion of white rice and arepa "corn cake"' },
    price: 17.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['beef', 'pork']
  },
  {
    id: 'p016',
    name: { es: 'Fiambre campesino', en: 'Fiambre Campesino' },
    description: { es: 'Plato tradicional envuelto en hoja de plátano, que incluye arroz blanco, chicharrones, chorizo, carne molida, huevo duro, rodaja de plátano maduro, arepa y ensalada de la casa', en: 'Traditional festive dish wrapped in banana leaf, including white rice, pork rinds, chorizo, minced beef, boiled egg, ripe plantain slice, arepa, and countryside sauced' },
    price: 18.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['pork', 'beef']
  },
  {
    id: 'p017',
    name: { es: 'Chuleta valluna (Chicken - Pork)', en: 'Chuleta Valluna (Chicken - Pork)' },
    description: { es: 'Delicioso filete de pollo o cerdo empanado servido con arroz blanco, patatas fritas, rodaja de plátano maduro, huevo, aguacate y una porción de ensalada', en: 'Delicious breaded chicken or pork cutlet served with white rice, chips, cassava fingers, ripe plantain slice, egg, avocado, and a portion of salad' },
    price: 18.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['chicken', 'pork']
  },
  {
    id: 'p018',
    name: { es: 'Sobrebarriga en salsa criolla', en: 'Sobrebarriga in Criolla Sauce' },
    description: { es: 'Bistec de falda jugoso preparado en una deliciosa salsa campestre, acompañado de una porción de arroz blanco, papas fritas, yuca frita, rodaja de plátano y ensalada', en: 'Juicy flank steak prepared in a delicious Countryside sauce, accompanied by a portion of white rice, French fries, cassava fingers, ripe plantain slice, and salad' },
    price: 18.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['beef']
  },
  // --- Special Rice Dishes ---
  {
    id: 'p019',
    name: { es: 'Chinese Fried Rice', en: 'Chinese Fried Rice' },
    description: { es: 'Arroz cocido salteado en un wok a fuego alto, mezclado con verduras, raíces chinas, trozos de pollo, cerdo, camarones y huevo frito en tortilla, servido con milanesa de pollo o papas fritas', en: 'Cooked rice stir-fried in a wok and soy sauce over high heat, mixed with vegetable, Chinese roots, pieces of chicken, pork, shrimp, and sliced egg omelet, served with breaded chicken or pork milanese and chips' },
    price: 19.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['chicken', 'pork', 'shrimp', 'seafood']
  },
  {
    id: 'p020',
    name: { es: 'Paisa Rice', en: 'Paisa Rice' },
    description: { es: 'Pequeños trozos de pollo, cerdo, chorizo y panceta de cerdo picada, cilantro finamente picado y pequeños trozos de plátano maduro, mezclados con arroz blanco cocido, servido con una pequeña sopa de frijoles', en: 'Small pieces of chicken, pork, chorizo and chopped pork belly, finely chopped cilantro, and small pieces of ripe plantain, mixed with cooked white rice, served with a small bean stew' },
    price: 19.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['chicken', 'pork']
  },
  {
    id: 'p021',
    name: { es: 'Shrimp Rice', en: 'Shrimp Rice' },
    description: { es: 'Arroz salteado con cebolla y salsa de tomate con verduras y camarones, servido con pequeños patacones "plátano verde frito" y ensalada', en: 'Stir-fried onion and tomato sauce with vegetables and shrimp, served with small patacones "fried green plaintain" and salad' },
    price: 18.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['shrimp', 'seafood']
  },
  // --- Seafood Dishes ---
  {
    id: 'p022',
    name: { es: 'Fried Fish', en: 'Fried Fish' },
    description: { es: 'Tilapia frita servida con arroz blanco, yuca frita, patacones "plátano verde frito" y ensalada', en: 'Fried tilapia served with white rice, cassava fingers, patacones "green plaintains" and salad' },
    price: 19.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['seafood', 'fish']
  },
  {
    id: 'p023',
    name: { es: 'Fish in Coconut Sauce', en: 'Fish in Coconut Sauce' },
    description: { es: 'Delicioso pescado ligeramente empanado y preparado en una salsa especial de coco, servido con arroz, patacones "plátano verde frito", patatas fritas y ensalada', en: 'Delicious fish lightly breaded and prepared in a special coconut sauce, served with rice, patacones "green plaintain", chips, and salad' },
    price: 20.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['seafood', 'fish']
  },
  {
    id: 'p024',
    name: { es: 'Seafood Stew', en: 'Seafood Stew' },
    description: { es: 'Mariscos cocidos en un delicioso y cremoso caldo de pescado, guiso y leche de coco, servidos con arroz blanco, patacones "plátano verde frito" y ensalada', en: 'Seafood cooked in a delicious creamy fish broth, stew, and coconut milk, served with white rice, patacones "green plaintain", and salad' },
    price: 19.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['seafood']
  },
  {
    id: 'p025',
    name: { es: 'Colombian Shrimp Ceviche', en: 'Colombian Shrimp Ceviche' },
    description: { es: 'Camarones marinados en jugo de limón, mezclados con cebolla roja finamente picada, pimiento rojo, salsa de tomate, un poco de mayonesa, chile y salsa de soja, servidos con galletas saladas o plátanos', en: 'Shrimp marinated in lemon juice, mixed with finely chopped red onion, red pepper, tomato sauce, a bit of mayonnaise, chili, and soy sauce, served with saltine crackers or plantains' },
    price: 16.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['seafood', 'shrimp']
  },
  {
    id: 'p026',
    name: { es: 'Shrimp in Coconut Sauce', en: 'Shrimp in Coconut Sauce' },
    description: { es: 'Camarones preparados en una deliciosa salsa hecha con leche de coco y salsa campestre, servidos con arroz, patacones "plátano verde frito", yuca frita y ensalada', en: 'Shrimp prepared in a delicious sauce made with coconut milk and countryside sauce, served with rice, patacones "green plaintain", cassava fingers, and salad' },
    price: 19.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['seafood', 'shrimp']
  },
  {
    id: 'p027',
    name: { es: 'Seafood in Coconut Sauce', en: 'Seafood in Coconut Sauce' },
    description: { es: 'Mariscos preparados en una deliciosa salsa con leche de coco y salsa campestre, servidos con arroz, plátanos, yuca frita y ensalada', en: 'Seafood prepared in a delicious sauce with coconut milk and countryside sauce, served with rice, plantains, cassava fingers, and salad' },
    price: 19.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['seafood']
  },
  // --- Dishes to Share ---
  {
    id: 'p028',
    name: { es: 'Mixed Grill', en: 'Mixed Grill' },
    description: { es: 'Parrillada de res, pollo, panceta de cerdo y chorizo, servida con plátano maduro frito, arepas "torta de maíz", yuca, papa hervida y ensalada', en: 'Grilled beef, chicken, belly pork, and chorizo, served with fried ripe plantain, arepas "corn cake", cassava, boiled potato, and salad' },
    price: 25.00, // One person
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['beef', 'chicken', 'pork']
  },
  {
    id: 'p029',
    name: { es: 'Colombian Platter', en: 'Colombian Platter' },
    description: { es: 'Deliciosos trozos de chorizo, panceta de cerdo picada, pollo y res, mezclados y servidos sobre una cama de papas fritas, acompañados de patacones "plátano verde frito", tomate y mazorca de maíz colombiana', en: 'Delicious pieces of chorizo, chopped pork belly, chicken, and beef, mixed together and served on a bed of chips, accompanied with patacones "green plaintain", tomato, and Colombian corn cake' },
    price: 20.00, // One person
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['pork', 'chicken', 'beef']
  },
  {
    id: 'p030',
    name: { es: 'Picapollo', en: 'Picapollo' },
    description: { es: 'Pollo marinado en jugo de limón con orégano, y luego empanado y frito, servido con panceta de cerdo picada, chorizo, patacones "plátano verde frito" y ensalada', en: 'Chicken marinated in lemon juice with oregano, and then breaded and fried, served with chopped belly pork, chorizo, patacones "green plaintain", and salad' },
    price: 20.00, // One person
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['chicken', 'pork']
  },
  {
    id: 'p031',
    name: { es: 'Mixed Chicharrón and Chorizo Ceviche', en: 'Mixed Chicharrón and Chorizo Ceviche' },
    description: { es: 'Chorizo picado y panceta de cerdo marinados en jugo de limón con cebolla roja cortada en juliana, cilantro, aguacate picado y patacones "plátano verde frito"', en: 'Chopped chorizo and pork belly marinated in lemon juice with red onion cut in julienne strips, Cilantro chopped avocado, and patacones "fried green plaintain"' },
    price: 16.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['pork', 'starter']
  },
  {
    id: 'p032',
    name: { es: 'Grilled Meat Platter', en: 'Grilled Meat Platter' },
    description: { es: 'Una selección de carne (cerdo-pollo-res) servida con arroz, rodajas de plátano maduro, papas fritas, huevo frito, yuca frita y ensalada', en: 'A choice meat served with rice, ripe plantain slices, chips, fried egg, cassava fingers, and salad' },
    price: 17.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['pork', 'chicken', 'beef']
  },
  // --- Additional Dishes ---
  {
    id: 'p033',
    name: { es: 'Vegetarian Dish', en: 'Vegetarian Dish' },
    description: { es: 'Porción de arroz, frijoles, huevo, plátano, aguacate y ensalada', en: 'Portion of rice, beans, egg, plantain slice, arepa, avocado, and salad' },
    price: 10.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['vegetarian']
  },
  {
    id: 'p034',
    name: { es: 'Calentado paisa', en: 'Calentado Paisa' },
    description: { es: 'Frijoles salteados con arroz blanco, servidos con huevo revuelto, chorizo, rodaja de plátano y arepa frita', en: 'stir-fried beans with white rice, serve with schambrón-belly pork, chorizo, plantain slice, and fried egg' },
    price: 12.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['pork']
  },
  {
    id: 'p035',
    name: { es: 'Colombian Egg Stew', en: 'Colombian Egg Stew' },
    description: { es: 'Huevos revueltos cocidos con cebolla y tomate, servidos con arroz o arepa "torta de maíz"', en: 'scrambled eggs cooked with onion and tomato, served with rice or arepa "corn cake"' },
    price: 7.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['vegetarian']
  },
  // --- Bebidas Frias ---
  {
    id: 'd001',
    name: { es: 'Limonada Natural', en: 'Natural Lemonade' },
    description: { es: 'Limonada recién exprimida.', en: 'Freshly squeezed lemonade.' },
    price: 4.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd002',
    name: { es: 'Limonada de Cereza o Coco', en: 'Cherry or Coconut Lemonade' },
    description: { es: 'Limonada con un toque de cereza o coco.', en: 'Lemonade with a twist of cherry or coconut.' },
    price: 5.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd003',
    name: { es: 'Jugos Naturales con Agua', en: 'Natural Juices With Water' },
    description: { es: 'Lulo, Mora, Maracuyá, Guayaba', en: 'Lulo, Blackberry, Passion fruit, Guava' },
    price: 4.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd004',
    name: { es: 'Jugos Naturales con Leche', en: 'Natural Juices With Milk' },
    description: { es: 'Lulo, Mora, Maracuyá, Guayaba', en: 'Lulo, Blackberry, Passion fruit, Guava' },
    price: 5.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd005',
    name: { es: 'Refrescos colombianos', en: 'Colombian soft drinks' },
    description: { es: 'Manzana, Colombiana, uva', en: 'Apple, Colombiana, grape fruit' },
    price: 2.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd006',
    name: { es: 'Milo shake', en: 'Milo Shake' },
    description: { es: 'Batido de chocolate Milo.', en: 'Milo chocolate milkshake.' },
    price: 2.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd007',
    name: { es: 'Ponymalta', en: 'Ponymalta' },
    description: { es: 'Bebida de malta sin alcohol.', en: 'Non-alcoholic malt beverage.' },
    price: 2.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd008',
    name: { es: 'Colombian Juice Hit', en: 'Colombian Juice Hit' },
    description: { es: 'Mango, Lulo, Mora', en: 'Mango, Lulo, Blackberry' },
    price: 2.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd009',
    name: { es: 'Bebida de caña de azúcar', en: 'Sugarcane drink' },
    description: { es: 'Bebida refrescante de caña de azúcar.', en: 'Refreshing sugarcane drink.' },
    price: 3.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd010',
    name: { es: 'Botella de agua', en: 'Bottle of water' },
    description: { es: 'Natural, con gas', en: 'Natural, sparkling' },
    price: 2.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  {
    id: 'd011',
    name: { es: 'Coca Cola, Fanta, Sprite', en: 'Coca Cola, Fanta, Sprite' },
    description: { es: 'Refrescos carbonatados.', en: 'Carbonated soft drinks.' },
    price: 2.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink']
  },
  // --- Bebidas Calientes ---
  {
    id: 'd012',
    name: { es: 'Latte', en: 'Latte' },
    description: { es: 'Café con leche.', en: 'Coffee with milk.' },
    price: 2.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'hot-drink']
  },
  {
    id: 'd013',
    name: { es: 'American Coffee', en: 'American Coffee' },
    description: { es: 'Café negro.', en: 'Black coffee.' },
    price: 2.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'hot-drink']
  },
  {
    id: 'd014',
    name: { es: 'Capuccino', en: 'Cappuccino' },
    description: { es: 'Café con espuma de leche.', en: 'Coffee with milk foam.' },
    price: 2.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'hot-drink']
  },
  {
    id: 'd015',
    name: { es: 'Hot Milo', en: 'Hot Milo' },
    description: { es: 'Bebida de chocolate Milo caliente.', en: 'Hot Milo chocolate drink.' },
    price: 2.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'hot-drink']
  },
  {
    id: 'd016',
    name: { es: 'Hot cholocale', en: 'Hot chocolate' },
    description: { es: 'Chocolate caliente tradicional.', en: 'Traditional hot chocolate.' },
    price: 2.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'hot-drink']
  },
  {
    id: 'd017',
    name: { es: 'Tea', en: 'Tea' },
    description: { es: 'Té caliente.', en: 'Hot tea.' },
    price: 2.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'hot-drink']
  },
  // --- Alcoholic Beverages ---
  {
    id: 'd018',
    name: { es: 'Desperado', en: 'Desperado' },
    description: { es: 'Cerveza con sabor a tequila.', en: 'Tequila flavoured beer.' },
    price: 4.50,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd019',
    name: { es: 'Cerveza Corona', en: 'Corona Beer' },
    description: { es: 'Cerveza lager mexicana.', en: 'Mexican lager beer.' },
    price: 4.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd020',
    name: { es: 'Budweiser', en: 'Budweiser' },
    description: { es: 'Cerveza lager americana.', en: 'American lager beer.' },
    price: 4.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd021',
    name: { es: 'Heineken', en: 'Heineken' },
    description: { es: 'Cerveza lager holandesa.', en: 'Dutch lager beer.' },
    price: 4.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd022',
    name: { es: 'Club Colombia', en: 'Club Colombia' },
    description: { es: 'Cerveza premium colombiana.', en: 'Premium Colombian beer.' },
    price: 4.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd023',
    name: { es: 'Aguardiente Antioqueño', en: 'Aguardiente Antioqueño' },
    description: { es: 'Licor de anís colombiano.', en: 'Colombian anise-flavoured liqueur.' },
    price: 2.50, // Short
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd024',
    name: { es: 'Aguardiente Amarillo', en: 'Aguardiente Amarillo' },
    description: { es: 'Licor de anís colombiano.', en: 'Colombian anise-flavoured liqueur.' },
    price: 2.50, // Short
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd025',
    name: { es: 'Gin and Tónic', en: 'Gin and Tonic' },
    description: { es: 'Cóctel clásico.', en: 'Classic cocktail.' },
    price: 4.00,
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd026',
    name: { es: 'Wisky', en: 'Whisky' },
    description: { es: 'Selección de whiskies.', en: 'Selection of whiskies.' },
    price: 4.00, // Short
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  // --- Bottle of wine ---
  {
    id: 'd027',
    name: { es: 'Vino Tinto', en: 'Red Wine' },
    description: { es: 'Copa o botella.', en: 'Glass or bottle.' },
    price: 5.00, // Short
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd028',
    name: { es: 'Vino Blanco', en: 'White Wine' },
    description: { es: 'Copa o botella.', en: 'Glass or bottle.' },
    price: 5.00, // Short
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  },
  {
    id: 'd029',
    name: { es: 'Prosecco', en: 'Prosecco' },
    description: { es: 'Vino espumoso italiano.', en: 'Italian sparkling wine.' },
    price: 22.00, // Bottle
    currency: 'GBP',
    images: [],
    is_visible: true,
    tags: ['drink', 'alcoholic']
  }
];
