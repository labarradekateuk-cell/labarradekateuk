export const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
] as const;

export type Language = typeof languages[number]['code'];

export const translations = {
  es: {
    header: {
      menu: 'Menú',
      contact: 'Contacto',
    },
    hero: {
      title: 'El Sabor Auténtico de Colombia',
      subtitle: 'En el corazón de Londres',
      menu_button: 'Ver Menú de Delivery',
    },
    about: {
        title: "Nuestra Historia",
        name: "Kate",
        role: "Fundadora y Chef Principal",
        since: "Desde 2023",
        story: "Con una pasión por la auténtica cocina colombiana, Kate fundó La Barra para llevar los vibrantes sabores de su tierra natal al corazón de Londres. Cada plato cuenta una historia, elaborado con amor e ingredientes tradicionales."
    },
    menu: {
      title: 'Nuestro Menú',
      add_to_cart: 'Agregar',
      view_images: 'Ver Más',
      search_placeholder: 'Buscar platos...',
      filters: {
        all: 'Todos',
        starters: 'Entrantes',
        meat: 'Carnes',
        seafood: 'Mariscos',
        vegetarian: 'Vegetariano',
        drinks: 'Bebidas',
      },
      no_results: 'No se encontraron platos que coincidan con tu búsqueda.',
      filtering_by: 'Filtrando por',
    },
    contact: {
        title: "Contáctanos",
        address: "Dirección",
        phone: "Teléfono",
        whatsapp: "WhatsApp",
        social: "Redes Sociales",
        deliveroo: "Menú Oficial - Deliveroo",
        map_link: "Ver en Google Maps",
        fsa_rating: "Calificación de Higiene Alimentaria FSA: 4 de 5 (Bueno)",
        allergens_title: "Información de Alérgenos",
        allergens_text: "ALGUNOS DE NUESTROS PLATOS CONTIENEN LECHE DE COCO, SALSA DE SOJA, HUEVO, QUESO, CAMARONES, TRIGO Y LECHE. Por favor, informe a nuestro personal antes de realizar el pedido si sufre alguna alergia alimentaria."
    },
    cart: {
        title: "Tu Pedido",
        empty: "Tu carrito está vacío.",
        total: "Total",
        checkout: "Pedir por WhatsApp",
        dine_in: "Comer Aquí",
        takeaway: "Para Llevar",
        table_number_prompt: "Selecciona tu número de mesa:",
        takeaway_notice: "Puede aplicarse un cargo adicional por el empaque.",
        complete_order_prompt: "Completa tu pedido"
    },
    carousel: {
        close: "Cerrar"
    }
  },
  en: {
    header: {
      menu: 'Menu',
      contact: 'Contact',
    },
    hero: {
      title: 'The Authentic Taste of Colombia',
      subtitle: 'In the heart of London',
      menu_button: 'View Delivery Menu',
    },
    about: {
        title: "Our Story",
        name: "Kate",
        role: "Founder & Head Chef",
        since: "Since 2023",
        story: "With a passion for authentic Colombian cuisine, Kate founded La Barra to bring the vibrant flavors of her homeland to the heart of London. Every dish tells a story, crafted with love and traditional ingredients."
    },
    menu: {
      title: 'Our Menu',
      add_to_cart: 'Add',
      view_images: 'See More',
      search_placeholder: 'Search dishes...',
      filters: {
        all: 'All',
        starters: 'Starters',
        meat: 'Meat',
        seafood: 'Seafood',
        vegetarian: 'Vegetarian',
        drinks: 'Drinks',
      },
      no_results: 'No dishes found matching your search.',
      filtering_by: 'Filtering by',
    },
    contact: {
        title: "Contact Us",
        address: "Address",
        phone: "Phone",
        whatsapp: "WhatsApp",
        social: "Social Media",
        deliveroo: "Official Menu - Deliveroo",
        map_link: "View on Google Maps",
        fsa_rating: "FSA Food Hygiene Rating: 4 out of 5 (Good)",
        allergens_title: "Allergen Information",
        allergens_text: "SOME OF OUR DISHES CONTAIN COCONUT MILK, SOY SAUCE, EGG, CHEESE, SHRIMP, WHEAT, MILK. Please inform our staff before ordering if you suffer from any food allergies."
    },
    cart: {
        title: "Your Order",
        empty: "Your cart is empty.",
        total: "Total",
        checkout: "Order via WhatsApp",
        dine_in: "Dine In",
        takeaway: "Takeaway",
        table_number_prompt: "Select your table number:",
        takeaway_notice: "An additional charge for packaging may apply.",
        complete_order_prompt: "Complete your order"
    },
    carousel: {
        close: "Close"
    }
  },
  fr: {
    header: {
        menu: "Menu",
        contact: "Contact"
    },
    hero: {
        title: "Le Goût Authentique de la Colombie",
        subtitle: "Au cœur de Londres",
        menu_button: "Voir le Menu de Livraison"
    },
    about: {
        title: "Notre Histoire",
        name: "Kate",
        role: "Fondatrice et Chef de Cuisine",
        since: "Depuis 2023",
        story: "Passionnée par la cuisine colombienne authentique, Kate a fondé La Barra pour apporter les saveurs vibrantes de sa patrie au cœur de Londres. Chaque plat raconte une histoire, élaborée avec amour et des ingrédients traditionnels."
    },
    menu: {
        title: "Notre Menu",
        add_to_cart: "Ajouter",
        view_images: "Voir Plus",
        search_placeholder: 'Rechercher des plats...',
        filters: {
            all: 'Tout',
            starters: 'Entrées',
            meat: 'Viande',
            seafood: 'Fruits de mer',
            vegetarian: 'Végétarien',
            drinks: 'Boissons',
        },
        no_results: 'Aucun plat trouvé correspondant à votre recherche.',
        filtering_by: 'Filtrage par',
    },
    contact: {
        title: "Contactez-nous",
        address: "Adresse",
        phone: "Téléphone",
        whatsapp: "WhatsApp",
        social: "Réseaux Sociaux",
        deliveroo: "Menu Officiel - Deliveroo",
        map_link: "Voir sur Google Maps",
        fsa_rating: "Note d'Hygiène Alimentaire FSA : 4 sur 5 (Bon)",
        allergens_title: "Informations sur les Allergènes",
        allergens_text: "SOME OF OUR DISHES CONTAIN COCONUT MILK, SOY SAUCE, EGG, CHEESE, SHRIMP, WHEAT, MILK. Please inform our staff before ordering if you suffer from any food allergies."
    },
    cart: {
        title: "Votre Commande",
        empty: "Votre panier est vide.",
        total: "Total",
        checkout: "Commander via WhatsApp",
        dine_in: "Sur Place",
        takeaway: "À Emporter",
        table_number_prompt: "Sélectionnez votre numéro de table :",
        takeaway_notice: "Des frais supplémentaires pour l'emballage peuvent s'appliquer.",
        complete_order_prompt: "Complétez votre commande"
    },
    carousel: {
        close: "Fermer"
    }
  },
  ru: {
    header: {
        menu: "Меню",
        contact: "Контакты"
    },
    hero: {
        title: "Аутентичный Вкус Колумбии",
        subtitle: "В сердце Лондона",
        menu_button: "Посмотреть Меню Доставки"
    },
    about: {
        title: "Наша история",
        name: "Кейт",
        role: "Основатель и шеф-повар",
        since: "С 2023 года",
        story: "Со страстью к подлинной колумбийской кухне, Кейт основала La Barra, чтобы принести яркие вкусы своей родины в самое сердце Лондона. Каждое блюдо рассказывает историю, созданную с любовью и традиционными ингредиентами."
    },
    menu: {
        title: "Наше Меню",
        add_to_cart: "Добавить",
        view_images: "Подробнее",
        search_placeholder: 'Искать блюда...',
        filters: {
            all: 'Все',
            starters: 'Закуски',
            meat: 'Мясо',
            seafood: 'Морепродукты',
            vegetarian: 'Вегетарианское',
            drinks: 'Напитки',
        },
        no_results: 'Блюд, соответствующих вашему поиску, не найдено.',
        filtering_by: 'Фильтрация по',
    },
    contact: {
        title: "Свяжитесь с нами",
        address: "Адрес",
        phone: "Телефон",
        whatsapp: "WhatsApp",
        social: "Социальные сети",
        deliveroo: "Официальное меню - Deliveroo",
        map_link: "Посмотреть на Google Maps",
        fsa_rating: "Рейтинг пищевой гигиены FSA: 4 из 5 (Хорошо)",
        allergens_title: "Информация об аллергенах",
        allergens_text: "SOME OF OUR DISHES CONTAIN COCONUT MILK, SOY SAUCE, EGG, CHEESE, SHRIMP, WHEAT, MILK. Please inform our staff before ordering if you suffer from any food allergies."
    },
    cart: {
        title: "Ваш Заказ",
        empty: "Ваша корзина пуста.",
        total: "Итого",
        checkout: "Заказать через WhatsApp",
        dine_in: "В ресторане",
        takeaway: "На вынос",
        table_number_prompt: "Выберите номер вашего столика:",
        takeaway_notice: "Может взиматься дополнительная плата за упаковку.",
        complete_order_prompt: "Завершите ваш заказ"
    },
    carousel: {
        close: "Закрыть"
    }
  },
  it: {
    header: {
        menu: "Menu",
        contact: "Contatti"
    },
    hero: {
        title: "Il Sapore Autentico della Colombia",
        subtitle: "Nel cuore di Londra",
        menu_button: "Vedi Menu Consegna"
    },
    about: {
        title: "La Nostra Storia",
        name: "Kate",
        role: "Fondatrice e Capo Chef",
        since: "Dal 2023",
        story: "Con una passione per l'autentica cucina colombiana, Kate ha fondato La Barra per portare i vivaci sapori della sua terra natale nel cuore di Londra. Ogni piatto racconta una storia, realizzato con amore e ingredienti tradizionali."
    },
    menu: {
        title: "Il Nostro Menu",
        add_to_cart: "Aggiungi",
        view_images: "Vedi di più",
        search_placeholder: 'Cerca piatti...',
        filters: {
            all: 'Tutti',
            starters: 'Antipasti',
            meat: 'Carne',
            seafood: 'Frutti di mare',
            vegetarian: 'Vegetariano',
            drinks: 'Bevande',
        },
        no_results: 'Nessun piatto trovato corrispondente alla tua ricerca.',
        filtering_by: 'Filtraggio per',
    },
    contact: {
        title: "Contattaci",
        address: "Indirizzo",
        phone: "Telefono",
        whatsapp: "WhatsApp",
        social: "Social Media",
        deliveroo: "Menu Ufficiale - Deliveroo",
        map_link: "Vedi su Google Maps",
        fsa_rating: "Valutazione Igiene Alimentare FSA: 4 su 5 (Buono)",
        allergens_title: "Informazioni Allergeni",
        allergens_text: "SOME OF OUR DISHES CONTAIN COCONUT MILK, SOY SAUCE, EGG, CHEESE, SHRIMP, WHEAT, MILK. Please inform our staff before ordering if you suffer from any food allergies."
    },
    cart: {
        title: "Il Tuo Ordine",
        empty: "Il tuo carrello è vuoto.",
        total: "Totale",
        checkout: "Ordina via WhatsApp",
        dine_in: "Sul Posto",
        takeaway: "Da Asporto",
        table_number_prompt: "Seleziona il tuo numero di tavolo:",
        takeaway_notice: "Potrebbe essere applicato un costo aggiuntivo per l'imballaggio.",
        complete_order_prompt: "Completa il tuo ordine"
    },
    carousel: {
        close: "Chiudi"
    }
  },
  zh: {
    header: {
        menu: "菜单",
        contact: "联系方式"
    },
    hero: {
        title: "哥伦比亚地道风味",
        subtitle: "在伦敦市中心",
        menu_button: "查看外送菜单"
    },
    about: {
        title: "我们的故事",
        name: "凯特",
        role: "创始人兼主厨",
        since: "自2023年以来",
        story: "凯特对正宗的哥伦比亚美食充满热情，创立了La Barra，将她家乡充满活力的风味带到伦敦市中心。每道菜都讲述着一个故事，用爱和传统食材精心制作。"
    },
    menu: {
        title: "我们的菜单",
        add_to_cart: "添加",
        view_images: "查看更多",
        search_placeholder: '搜索菜肴...',
        filters: {
            all: '全部',
            starters: '开胃菜',
            meat: '肉类',
            seafood: '海鲜',
            vegetarian: '素食',
            drinks: '饮料',
        },
        no_results: '未找到与您搜索匹配的菜肴。',
        filtering_by: '筛选条件',
    },
    contact: {
        title: "联系我们",
        address: "地址",
        phone: "电话",
        whatsapp: "WhatsApp",
        social: "社交媒体",
        deliveroo: "官方菜单 - Deliveroo",
        map_link: "在谷歌地图上查看",
        fsa_rating: "FSA食品卫生评级：4/5 (良好)",
        allergens_title: "过敏原信息",
        allergens_text: "SOME OF OUR DISHES CONTAIN COCONUT MILK, SOY SAUCE, EGG, CHEESE, SHRIMP, WHEAT, MILK. Please inform our staff before ordering if you suffer from any food allergies."
    },
    cart: {
        title: "您的订单",
        empty: "您的购物车是空的。",
        total: "总计",
        checkout: "通过WhatsApp订购",
        dine_in: "堂食",
        takeaway: "外带",
        table_number_prompt: "请选择您的桌号：",
        takeaway_notice: "包装可能会产生额外费用。",
        complete_order_prompt: "请完成您的订单"
    },
    carousel: {
        close: "关闭"
    }
  },
  ja: {
    header: {
        menu: "メニュー",
        contact: "連絡先"
    },
    hero: {
        title: "コロンビアの本物の味",
        subtitle: "ロンドンの中心で",
        menu_button: "デリバリーメニューを見る"
    },
    about: {
        title: "私たちの物語",
        name: "ケイト",
        role: "創設者兼料理長",
        since: "2023年以来",
        story: "本格的なコロンビア料理への情熱を持って、ケイトは故郷の活気に満ちた味をロンドンの中心にもたらすためにLa Barraを設立しました。すべての料理が物語を語り、愛情と伝統的な食材で作られています。"
    },
    menu: {
        title: "私たちのメニュー",
        add_to_cart: "追加",
        view_images: "詳細を見る",
        search_placeholder: '料理を検索...',
        filters: {
            all: 'すべて',
            starters: '前菜',
            meat: '肉料理',
            seafood: 'シーフード',
            vegetarian: 'ベジタリアン',
            drinks: 'ドリンク',
        },
        no_results: '検索に一致する料理が見つかりませんでした。',
        filtering_by: '絞り込み条件',
    },
    contact: {
        title: "お問い合わせ",
        address: "住所",
        phone: "電話",
        whatsapp: "WhatsApp",
        social: "ソーシャルメディア",
        deliveroo: "公式メニュー - Deliveroo",
        map_link: "Googleマップで見る",
        fsa_rating: "FSA食品衛生評価：5点中4点（良好）",
        allergens_title: "アレルゲン情報",
        allergens_text: "SOME OF OUR DISHES CONTAIN COCONUT MILK, SOY SAUCE, EGG, CHEESE, SHRIMP, WHEAT, MILK. Please inform our staff before ordering if you suffer from any food allergies."
    },
    cart: {
        title: "ご注文",
        empty: "カートは空です。",
        total: "合計",
        checkout: "WhatsAppで注文",
        dine_in: "店内飲食",
        takeaway: "テイクアウト",
        table_number_prompt: "テーブル番号を選択してください：",
        takeaway_notice: "梱包に追加料金がかかる場合があります。",
        complete_order_prompt: "ご注文を完了してください"
    },
    carousel: {
        close: "閉じる"
    }
  },
  pt: {
    header: {
        menu: "Menu",
        contact: "Contato"
    },
    hero: {
        title: "O Sabor Autêntico da Colômbia",
        subtitle: "No coração de Londres",
        menu_button: "Ver Menu de Entrega"
    },
    about: {
        title: "Nossa História",
        name: "Kate",
        role: "Fundadora e Chefe de Cozinha",
        since: "Desde 2023",
        story: "Com uma paixão pela autêntica culinária colombiana, Kate fundou o La Barra para trazer os sabores vibrantes de sua terra natal para o coração de Londres. Cada prato conta uma história, feito com amor e ingredientes tradicionais."
    },
    menu: {
        title: "Nosso Menu",
        add_to_cart: "Adicionar",
        view_images: "Ver Mais",
        search_placeholder: 'Pesquisar pratos...',
        filters: {
            all: 'Todos',
            starters: 'Entradas',
            meat: 'Carne',
            seafood: 'Frutos do mar',
            vegetarian: 'Vegetariano',
            drinks: 'Bebidas',
        },
        no_results: 'Nenhum prato encontrado para sua busca.',
        filtering_by: 'Filtrando por',
    },
    contact: {
        title: "Contate-nos",
        address: "Endereço",
        phone: "Telefone",
        whatsapp: "WhatsApp",
        social: "Redes Sociais",
        deliveroo: "Menu Oficial - Deliveroo",
        map_link: "Ver no Google Maps",
        fsa_rating: "Classificação de Higiene Alimentar da FSA: 4 de 5 (Bom)",
        allergens_title: "Informações sobre Alergênicos",
        allergens_text: "SOME OF OUR DISHES CONTAIN COCONUT MILK, SOY SAUCE, EGG, CHEESE, SHRIMP, WHEAT, MILK. Please inform our staff before ordering if you suffer from any food allergies."
    },
    cart: {
        title: "Seu Pedido",
        empty: "Seu carrinho está vazio.",
        total: "Total",
        checkout: "Pedir via WhatsApp",
        dine_in: "Comer no Local",
        takeaway: "Para Levar",
        table_number_prompt: "Selecione o número da sua mesa:",
        takeaway_notice: "Pode ser aplicada uma taxa adicional pela embalagem.",
        complete_order_prompt: "Complete seu pedido"
    },
    carousel: {
        close: "Fechar"
    }
  },
};