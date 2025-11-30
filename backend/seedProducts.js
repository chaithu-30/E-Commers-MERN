import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Premium cotton t-shirt, perfect for everyday comfort. Breathable fabric with a modern fit.",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50
  },
  {
    name: "Slim Fit Denim Jeans",
    description: "Classic blue denim jeans with a contemporary slim fit. Perfect for casual outings.",
    price: 6499,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 35
  },
  {
    name: "Leather Biker Jacket",
    description: "Authentic black leather jacket with zipper details. Timeless style meets modern design.",
    price: 19999,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 12
  },
  {
    name: "Cotton Blend Hoodie",
    description: "Soft, cozy hoodie in charcoal gray. Perfect for layering in cooler weather.",
    price: 4999,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 42
  },
  {
    name: "Navy Business Blazer",
    description: "Elegant navy blazer crafted from premium wool blend. Ideal for formal occasions.",
    price: 15499,
    imageUrl: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 18
  },
  {
    name: "Striped Polo Shirt",
    description: "Classic navy and white striped polo shirt. Versatile for smart-casual occasions.",
    price: 3799,
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 28
  },
  {
    name: "Khaki Chino Trousers",
    description: "Comfortable chino pants in beige. Perfect balance of casual and refined style.",
    price: 5399,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 31
  },
  {
    name: "Crew Neck Sweater",
    description: "Warm merino wool sweater in olive green. Classic design for autumn and winter.",
    price: 7499,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 25
  },
  {
    name: "Athletic Performance T-Shirt",
    description: "Moisture-wicking athletic t-shirt perfect for workouts and sports activities.",
    price: 3499,
    imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 38
  },
  {
    name: "Cargo Shorts",
    description: "Functional cargo shorts with multiple pockets. Perfect for outdoor adventures.",
    price: 4299,
    imageUrl: "https://images.unsplash.com/photo-1624378515192-85dd52317559?w=500&auto=format&fit=crop",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 33
  },
  {
    name: "Floral Midi Dress",
    description: "Beautiful floral print midi dress. Flowing fabric perfect for spring and summer events.",
    price: 7499,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 32
  },
  {
    name: "Elegant Cocktail Dress",
    description: "Sophisticated black cocktail dress with subtle shimmer. Perfect for evening occasions.",
    price: 10799,
    imageUrl: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 20
  },
  {
    name: "Cropped Denim Jacket",
    description: "Trendy cropped denim jacket in light wash. Adds a stylish layer to any outfit.",
    price: 6199,
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 27
  },
  {
    name: "Soft Pink Cardigan",
    description: "Cozy pink cardigan with button front. Perfect for layering and transitioning seasons.",
    price: 5399,
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 30
  },
  {
    name: "Silk Blouse",
    description: "Elegant white silk blouse with ruffled details. Suitable for office or special occasions.",
    price: 7899,
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 24
  },
  {
    name: "High-Waisted Wide Leg Pants",
    description: "Chic high-waisted pants in black. Comfortable wide-leg design with a modern silhouette.",
    price: 7099,
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 29
  },
  {
    name: "Beige Trench Coat",
    description: "Classic beige trench coat with belt. Timeless outerwear for rainy days and cool weather.",
    price: 18299,
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 15
  },
  {
    name: "Maxi Summer Dress",
    description: "Flowing maxi dress with tropical print. Lightweight and perfect for beach vacations.",
    price: 6499,
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 22
  },
  {
    name: "Ribbed Knit Sweater",
    description: "Cozy ribbed sweater in camel color. Perfect for autumn and winter styling.",
    price: 5799,
    imageUrl: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 26
  },
  {
    name: "Pleated Midi Skirt",
    description: "Elegant pleated skirt in navy blue. Versatile piece that pairs with any top.",
    price: 4599,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 33
  },
  {
    name: "Wrap Front Blouse",
    description: "Stylish wrap-front blouse in cream color. Flattering design that suits all body types.",
    price: 6299,
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 28
  },
  {
    name: "Leather Ankle Boots",
    description: "Classic black leather ankle boots with comfortable heel. Perfect for everyday wear.",
    price: 12499,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 19
  },
  {
    name: "Superhero Graphic Tee",
    description: "Fun and colorful superhero t-shirt. Made from soft, kid-friendly organic cotton.",
    price: 1899,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 48
  },
  {
    name: "Denim Play Shorts",
    description: "Durable denim shorts designed for active play. Comfortable fit with reinforced seams.",
    price: 2749,
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 41
  },
  {
    name: "Princess Party Dress",
    description: "Sparkly party dress in pink with tulle skirt. Perfect for special occasions and celebrations.",
    price: 3749,
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 36
  },
  {
    name: "Fleece Hooded Jacket",
    description: "Warm and soft fleece jacket with hood. Water-resistant outer shell perfect for outdoor play.",
    price: 4599,
    imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 38
  },
  {
    name: "Cotton Play Set",
    description: "Comfortable two-piece play set in cheerful colors. Easy to move in for active kids.",
    price: 3299,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 43
  },
  {
    name: "School Uniform Shirt",
    description: "Crisp white button-down shirt. Perfect for school or formal events.",
    price: 2399,
    imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&auto=format&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 52
  },
  {
    name: "Winter Puffer Coat",
    description: "Insulated puffer jacket in bright colors. Keeps kids warm during cold weather adventures.",
    price: 6199,
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 29
  },
  {
    name: "Sports Jersey Set",
    description: "Athletic jersey and shorts set. Moisture-wicking fabric perfect for sports and activities.",
    price: 2899,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 47
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
