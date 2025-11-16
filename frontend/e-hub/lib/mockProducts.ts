export const mockProducts = [
    {
      _id: '1',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Latest flagship smartphone with advanced AI features and incredible camera.',
      price: 124999,
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'
      ],
      category: {
        _id: 'cat1',
        name: 'Smartphones'
      },
      rating: 4.8,
      isFeatured: true,
      stock: 50,
      brand: 'Samsung',
      specifications: {
        Display: '6.8" Dynamic AMOLED 2X',
        Processor: 'Snapdragon 8 Gen 3',
        RAM: '12GB',
        Storage: '256GB',
        Camera: '200MP Main + 12MP Ultra Wide',
        Battery: '5000mAh'
      }
    },
    {
      _id: '2',
      name: 'Apple iPhone 15 Pro Max',
      description: 'Premium iPhone with titanium design and A17 Pro chip.',
      price: 159900,
      images: [
        'https://images.unsplash.com/photo-1696446702883-39e03fe0fab3?w=500'
      ],
      category: {
        _id: 'cat1',
        name: 'Smartphones'
      },
      rating: 4.9,
      isFeatured: true,
      stock: 30,
      brand: 'Apple',
      specifications: {
        Display: '6.7" Super Retina XDR',
        Processor: 'A17 Pro',
        RAM: '8GB',
        Storage: '256GB',
        Camera: '48MP Main + 12MP Ultra Wide',
        Battery: '4422mAh'
      }
    },
    {
      _id: '3',
      name: 'Sony WH-1000XM5',
      description: 'Industry-leading noise cancelling wireless headphones.',
      price: 29990,
      images: [
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'
      ],
      category: {
        _id: 'cat2',
        name: 'Audio'
      },
      rating: 4.7,
      isFeatured: true,
      stock: 100,
      brand: 'Sony',
      specifications: {
        Type: 'Over-Ear',
        Connectivity: 'Bluetooth 5.2',
        BatteryLife: '30 hours',
        NoiseCancellation: 'Active',
        Weight: '250g'
      }
    },
    {
      _id: '4',
      name: 'MacBook Pro 14" M3',
      description: 'Powerful laptop with M3 chip for professionals.',
      price: 199900,
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
      ],
      category: {
        _id: 'cat3',
        name: 'Laptops'
      },
      rating: 4.9,
      isFeatured: true,
      stock: 25,
      brand: 'Apple',
      specifications: {
        Display: '14.2" Liquid Retina XDR',
        Processor: 'Apple M3',
        RAM: '16GB',
        Storage: '512GB SSD',
        Graphics: 'M3 10-core GPU',
        Weight: '1.55kg'
      }
    },
    {
      _id: '5',
      name: 'Samsung 65" QLED 4K TV',
      description: 'Stunning 4K QLED TV with Quantum Processor.',
      price: 89990,
      images: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'
      ],
      category: {
        _id: 'cat4',
        name: 'TVs'
      },
      rating: 4.6,
      isFeatured: false,
      stock: 15,
      brand: 'Samsung',
      specifications: {
        ScreenSize: '65 inches',
        Resolution: '4K UHD',
        DisplayType: 'QLED',
        RefreshRate: '120Hz',
        HDR: 'HDR10+',
        SmartTV: 'Tizen OS'
      }
    },
    {
      _id: '6',
      name: 'iPad Air M2',
      description: 'Versatile tablet with M2 chip and Apple Pencil support.',
      price: 59900,
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'
      ],
      category: {
        _id: 'cat5',
        name: 'Tablets'
      },
      rating: 4.8,
      isFeatured: false,
      stock: 60,
      brand: 'Apple',
      specifications: {
        Display: '10.9" Liquid Retina',
        Processor: 'Apple M2',
        RAM: '8GB',
        Storage: '128GB',
        Camera: '12MP Wide',
        Battery: 'Up to 10 hours'
      }
    },
    {
      _id: '7',
      name: 'Canon EOS R6 Mark II',
      description: 'Professional mirrorless camera with 24.2MP sensor.',
      price: 239900,
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'
      ],
      category: {
        _id: 'cat6',
        name: 'Cameras'
      },
      rating: 4.9,
      isFeatured: true,
      stock: 12,
      brand: 'Canon',
      specifications: {
        Sensor: '24.2MP Full-Frame CMOS',
        ISORange: '100-102400',
        Video: '4K 60fps',
        Autofocus: 'Dual Pixel CMOS AF II',
        ImageStabilization: '8-stop IBIS'
      }
    },
    {
      _id: '8',
      name: 'PlayStation 5',
      description: 'Next-gen gaming console with lightning-fast loading.',
      price: 49990,
      images: [
        'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'
      ],
      category: {
        _id: 'cat7',
        name: 'Gaming'
      },
      rating: 4.8,
      isFeatured: true,
      stock: 40,
      brand: 'Sony',
      specifications: {
        CPU: 'AMD Zen 2',
        GPU: 'AMD RDNA 2',
        RAM: '16GB GDDR6',
        Storage: '825GB SSD',
        Resolution: 'Up to 8K',
        FrameRate: 'Up to 120fps'
      }
    },
    {
      _id: '9',
      name: 'Google Pixel 8 Pro',
      description: 'Advanced AI features with a clean Android experience.',
      price: 89999,
      images: [
        'https://images.unsplash.com/photo-1696446703883-45e03fe0fcf3?w=500'
      ],
      category: {
        _id: 'cat1',
        name: 'Smartphones'
      },
      rating: 4.7,
      isFeatured: false,
      stock: 20,
      brand: 'Google',
      specifications: {
        Display: '6.7" OLED',
        Processor: 'Google Tensor G3',
        RAM: '12GB',
        Storage: '256GB',
        Camera: '50MP Main + 48MP Telephoto',
        Battery: '5000mAh'
      }
    },
    {
      _id: '10',
      name: 'Bose QuietComfort 45',
      description: 'Premium wireless noise cancelling headphones.',
      price: 27999,
      images: [
        'https://images.unsplash.com/photo-1548350525-27d46aaaf054?w=500'
      ],
      category: {
        _id: 'cat2',
        name: 'Audio'
      },
      rating: 4.6,
      isFeatured: false,
      stock: 60,
      brand: 'Bose',
      specifications: {
        Type: 'Over-Ear',
        Connectivity: 'Bluetooth 5.1',
        BatteryLife: '24 hours',
        NoiseCancellation: 'Active',
        Weight: '241g'
      }
    },
    {
      _id: '11',
      name: 'Dell XPS 15',
      description: 'Powerful laptop with high-resolution display and Intel i9 CPU.',
      price: 174900,
      images: [
        'https://images.unsplash.com/photo-1501436513140-755f778a1b8f?w=500'
      ],
      category: {
        _id: 'cat3',
        name: 'Laptops'
      },
      rating: 4.8,
      isFeatured: false,
      stock: 28,
      brand: 'Dell',
      specifications: {
        Display: '15.6" 4K UHD',
        Processor: 'Intel Core i9',
        RAM: '32GB',
        Storage: '1TB SSD',
        Graphics: 'NVIDIA RTX 3050'
      }
    },
    {
      _id: '12',
      name: 'LG OLED65CXPUA OLED TV',
      description: 'Top-tier OLED TV with excellent color and deep blacks.',
      price: 124999,
      images: [
        'https://images.unsplash.com/photo-1530731141654-5993c3016c77?w=500'
      ],
      category: {
        _id: 'cat4',
        name: 'TVs'
      },
      rating: 4.7,
      isFeatured: false,
      stock: 18,
      brand: 'LG',
      specifications: {
        ScreenSize: '65 inches',
        Resolution: '4K UHD',
        DisplayType: 'OLED',
        RefreshRate: '120Hz',
        HDR: 'Dolby Vision'
      }
    },
    {
      _id: '13',
      name: 'Microsoft Surface Pro 9',
      description: 'Lightweight and versatile 2-in-1 laptop/tablet.',
      price: 99900,
      images: [
        'https://images.unsplash.com/photo-1553524790-267593aa5612?w=500'
      ],
      category: {
        _id: 'cat5',
        name: 'Tablets'
      },
      rating: 4.6,
      isFeatured: false,
      stock: 35,
      brand: 'Microsoft',
      specifications: {
        Display: '13" PixelSense Flow',
        Processor: 'Intel Evo',
        RAM: '16GB',
        Storage: '512GB SSD',
        PenSupport: 'Yes'
      }
    },
    {
      _id: '14',
      name: 'Nikon Z7 II',
      description: 'Versatile Full Frame Mirrorless Camera.',
      price: 199900,
      images: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500'
      ],
      category: {
        _id: 'cat6',
        name: 'Cameras'
      },
      rating: 4.8,
      isFeatured: false,
      stock: 10,
      brand: 'Nikon',
      specifications: {
        Sensor: '45.7MP Full Frame',
        ISO: '64-25600',
        Video: '4K UHD',
        Autofocus: 'Multi-CAM 20K',
        ImageStabilization: '5-axis VR'
      }
    },
    {
      _id: '15',
      name: 'Nintendo Switch OLED',
      description: 'Popular hybrid gaming console with OLED screen.',
      price: 39990,
      images: [
        'https://images.unsplash.com/photo-1612817154997-316f84702ffe?w=500'
      ],
      category: {
        _id: 'cat7',
        name: 'Gaming'
      },
      rating: 4.7,
      isFeatured: false,
      stock: 50,
      brand: 'Nintendo',
      specifications: {
        CPU: 'NVIDIA Custom Tegra',
        Storage: '64GB',
        Display: '7" OLED Touchscreen',
        Battery: '4.5-9 hours',
        Connectivity: 'Wi-Fi, Bluetooth'
      }
    }
  ];
  
  export const mockCategories = [
    { _id: 'cat1', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
    { _id: 'cat2', name: 'Audio', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200' },
    { _id: 'cat3', name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200' },
    { _id: 'cat4', name: 'TVs', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200' },
    { _id: 'cat5', name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200' },
    { _id: 'cat6', name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200' },
    { _id: 'cat7', name: 'Gaming', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200' }
  ];
  