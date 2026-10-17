import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// ---------------------------------------------------------------------------
// Bootstrap client (mirrors src/prisma/db.ts but without the global singleton
// so this script can be run standalone via `prisma db seed`).
// ---------------------------------------------------------------------------

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set in environment.')

console.log('DATABASE_URL first 30 chars:', DATABASE_URL.slice(0, 30))
console.log('DATABASE_URL length:', DATABASE_URL.length)

const adapter = new PrismaPg({ connectionString: DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// ---------------------------------------------------------------------------
// Helper: pick random items from an array
// ---------------------------------------------------------------------------
function pick<T>(arr: T[], n: number): T[] {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

// ---------------------------------------------------------------------------
// Seed data definitions
// ---------------------------------------------------------------------------

const COURSES = [
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
    { label: 'Snack', value: 'snack' },
    { label: 'Dessert', value: 'dessert' },
    { label: 'Appetizer', value: 'appetizer' },
    { label: 'Drinks', value: 'drinks' },
]

const CUISINES = [
    { label: 'Indian', value: 'indian' },
    { label: 'Italian', value: 'italian' },
    { label: 'Mexican', value: 'mexican' },
    { label: 'Chinese', value: 'chinese' },
    { label: 'American', value: 'american' },
    { label: 'Mediterranean', value: 'mediterranean' },
    { label: 'Japanese', value: 'japanese' },
    { label: 'Thai', value: 'thai' },
    { label: 'French', value: 'french' },
    { label: 'Middle Eastern', value: 'middle-eastern' },
]

const INGREDIENTS = [
    { label: 'Chicken', value: 'chicken' },
    { label: 'Paneer', value: 'paneer' },
    { label: 'Tomato', value: 'tomato' },
    { label: 'Onion', value: 'onion' },
    { label: 'Garlic', value: 'garlic' },
    { label: 'Ginger', value: 'ginger' },
    { label: 'Olive Oil', value: 'olive-oil' },
    { label: 'Butter', value: 'butter' },
    { label: 'Flour', value: 'flour' },
    { label: 'Rice', value: 'rice' },
    { label: 'Pasta', value: 'pasta' },
    { label: 'Eggs', value: 'eggs' },
    { label: 'Milk', value: 'milk' },
    { label: 'Cream', value: 'cream' },
    { label: 'Salt', value: 'salt' },
    { label: 'Black Pepper', value: 'black-pepper' },
    { label: 'Cumin', value: 'cumin' },
    { label: 'Turmeric', value: 'turmeric' },
    { label: 'Coriander Powder', value: 'coriander-powder' },
    { label: 'Garam Masala', value: 'garam-masala' },
    { label: 'Lemon', value: 'lemon' },
    { label: 'Spinach', value: 'spinach' },
    { label: 'Mushroom', value: 'mushroom' },
    { label: 'Bell Pepper', value: 'bell-pepper' },
    { label: 'Coconut Milk', value: 'coconut-milk' },
    { label: 'Soy Sauce', value: 'soy-sauce' },
    { label: 'Chili Flakes', value: 'chili-flakes' },
    { label: 'Basil', value: 'basil' },
    { label: 'Mozzarella', value: 'mozzarella' },
    { label: 'Parmesan', value: 'parmesan' },
]

const TAGS = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten-Free', value: 'gluten-free' },
    { label: 'Spicy', value: 'spicy' },
    { label: 'Quick & Easy', value: 'quick-and-easy' },
    { label: 'High Protein', value: 'high-protein' },
    { label: 'Low Carb', value: 'low-carb' },
    { label: 'Comfort Food', value: 'comfort-food' },
    { label: 'Healthy', value: 'healthy' },
    { label: 'Kid Friendly', value: 'kid-friendly' },
    { label: 'Date Night', value: 'date-night' },
    { label: 'Meal Prep', value: 'meal-prep' },
]

const TOOLS = [
    { label: "Chef's Knife", value: 'chefs-knife' },
    { label: 'Cutting Board', value: 'cutting-board' },
    { label: 'Frying Pan', value: 'frying-pan' },
    { label: 'Saucepan', value: 'saucepan' },
    { label: 'Blender', value: 'blender' },
    { label: 'Food Processor', value: 'food-processor' },
    { label: 'Mixing Bowl', value: 'mixing-bowl' },
    { label: 'Oven', value: 'oven' },
    { label: 'Baking Tray', value: 'baking-tray' },
    { label: 'Wok', value: 'wok' },
    { label: 'Pressure Cooker', value: 'pressure-cooker' },
    { label: 'Spatula', value: 'spatula' },
    { label: 'Whisk', value: 'whisk' },
    { label: 'Grater', value: 'grater' },
    { label: 'Colander', value: 'colander' },
]

// ---------------------------------------------------------------------------
// Recipe definitions
// Image URLs from Unsplash (free, no auth required for static images).
// ---------------------------------------------------------------------------

// IMPORTANT: Replace this with a real Clerk user ID before running the seed!
// The user must already exist in the `users` table (synced via Clerk webhook).
const PLACEHOLDER_AUTHOR_ID = 'user_3HOyOuI392GAWTaLWUhuFjYEDyi'

interface RecipeSeed {
    title: string
    description: string
    imageUrl: string
    prepTime: number
    cookTime: number
    passiveTime: number | null
    servings: number
    viewCount: number
    steps: string[]
    tips: string[]
    isAdminRecipe: boolean
    isPublished: boolean
    publishedDate: Date | null
    courseValue: string
    cuisineValues: string[]
    ingredientQuantities: { value: string; quantity: string }[]
    tagValues: string[]
    toolValues: string[]
}

const RECIPES: RecipeSeed[] = [
    // -----------------------------------------------------------------------
    // 1. Margherita Pizza
    // -----------------------------------------------------------------------
    {
        title: 'Margherita Pizza',
        description:
            'Classic Neapolitan pizza with San Marzano tomato sauce, fresh buffalo mozzarella, and fragrant basil on a hand-stretched thin crust.',
        imageUrl:
            'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop',
        prepTime: 20,
        cookTime: 12,
        passiveTime: 60,
        servings: 2,
        viewCount: 5420,
        steps: [
            'Mix flour, yeast, salt, and olive oil with warm water. Knead for 8 minutes until smooth.',
            'Place dough in an oiled bowl, cover, and let rise for 1 hour.',
            'Preheat oven to its maximum temperature with a baking stone or heavy tray inside.',
            'Punch down dough and stretch into a thin round on a floured surface.',
            'Spread crushed tomatoes over the base and scatter torn mozzarella.',
            'Bake for 10-12 minutes until the crust is charred and cheese is bubbling.',
            'Finish with fresh basil leaves and a drizzle of extra-virgin olive oil.',
        ],
        tips: [
            'Use "00" flour for the most authentic texture.',
            'A pizza stone or steel gives a better crust than a regular tray.',
            'Add basil after baking to keep it vibrant green.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-03-15'),
        courseValue: 'dinner',
        cuisineValues: ['italian'],
        ingredientQuantities: [
            { value: 'flour', quantity: '300g' },
            { value: 'tomato', quantity: '200g crushed' },
            { value: 'mozzarella', quantity: '150g' },
            { value: 'basil', quantity: '10 leaves' },
            { value: 'olive-oil', quantity: '2 tbsp' },
            { value: 'salt', quantity: '1 tsp' },
        ],
        tagValues: ['vegetarian', 'comfort-food'],
        toolValues: ['oven', 'baking-tray', 'cutting-board'],
    },

    // -----------------------------------------------------------------------
    // 2. Chicken Tikka Masala
    // -----------------------------------------------------------------------
    {
        title: 'Chicken Tikka Masala',
        description:
            'Juicy grilled chicken pieces simmered in a velvety, spiced tomato-cream sauce. A British-Indian classic that never goes out of style.',
        imageUrl:
            'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop',
        prepTime: 25,
        cookTime: 30,
        passiveTime: 120,
        servings: 4,
        viewCount: 9800,
        steps: [
            'Marinate chicken in yogurt, lemon juice, garlic, ginger, turmeric, and garam masala for 2 hours.',
            'Grill or pan-sear chicken until charred on the outside. Set aside.',
            'Saute onions in butter until golden. Add garlic and ginger paste; cook for 2 minutes.',
            'Stir in tomatoes and cook down for 10 minutes. Blend smooth.',
            'Return to heat, add cream and grilled chicken. Simmer 10 minutes.',
            'Season, garnish with fresh coriander, and serve with naan or rice.',
        ],
        tips: [
            'Marinating overnight delivers the deepest flavour.',
            'Char the chicken properly before adding to the sauce for a smoky edge.',
            'Adjust cream for a richer or lighter sauce.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-04-01'),
        courseValue: 'dinner',
        cuisineValues: ['indian'],
        ingredientQuantities: [
            { value: 'chicken', quantity: '600g boneless' },
            { value: 'tomato', quantity: '400g' },
            { value: 'cream', quantity: '150ml' },
            { value: 'onion', quantity: '2 medium' },
            { value: 'garlic', quantity: '6 cloves' },
            { value: 'ginger', quantity: '2 inch piece' },
            { value: 'butter', quantity: '2 tbsp' },
            { value: 'garam-masala', quantity: '2 tsp' },
            { value: 'turmeric', quantity: '1/2 tsp' },
        ],
        tagValues: ['spicy', 'high-protein', 'comfort-food'],
        toolValues: ['frying-pan', 'blender', 'saucepan', 'chefs-knife'],
    },

    // -----------------------------------------------------------------------
    // 3. Avocado Toast
    // -----------------------------------------------------------------------
    {
        title: 'Smashed Avocado Toast',
        description:
            'Creamy smashed avocado on toasted sourdough, topped with chili flakes, lemon zest, and a perfectly poached egg.',
        imageUrl:
            'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&auto=format&fit=crop',
        prepTime: 8,
        cookTime: 5,
        passiveTime: null,
        servings: 1,
        viewCount: 4120,
        steps: [
            'Toast sourdough slices until golden and crisp.',
            'Halve and pit the avocado, scoop flesh into a bowl.',
            'Mash with lemon juice, salt, black pepper, and a pinch of chili flakes.',
            'Spread generously on toast.',
            'Optional: top with a poached or fried egg and everything bagel seasoning.',
        ],
        tips: [
            'Use ripe avocados for best creaminess.',
            'A squeeze of lemon prevents browning.',
            'Add smoked salmon or feta for a protein boost.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-05-10'),
        courseValue: 'breakfast',
        cuisineValues: ['american', 'mediterranean'],
        ingredientQuantities: [
            { value: 'eggs', quantity: '1 (optional)' },
            { value: 'lemon', quantity: '1/2, juiced' },
            { value: 'chili-flakes', quantity: 'a pinch' },
            { value: 'salt', quantity: 'to taste' },
            { value: 'black-pepper', quantity: 'to taste' },
        ],
        tagValues: ['vegetarian', 'healthy', 'quick-and-easy'],
        toolValues: ['cutting-board', 'chefs-knife', 'mixing-bowl'],
    },

    // -----------------------------------------------------------------------
    // 4. Mushroom Risotto
    // -----------------------------------------------------------------------
    {
        title: 'Creamy Mushroom Risotto',
        description:
            'Slow-stirred Arborio rice cooked with wild mushrooms, white wine, and parmesan to achieve a luscious, restaurant-quality risotto.',
        imageUrl:
            'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop',
        prepTime: 10,
        cookTime: 35,
        passiveTime: null,
        servings: 3,
        viewCount: 3700,
        steps: [
            'Warm the stock in a separate pot and keep it simmering.',
            'Saute sliced mushrooms in butter until golden. Season and set aside.',
            'In the same pan, soften onion, then add Arborio rice and toast for 2 minutes.',
            'Add a ladleful of warm stock and stir continuously. Repeat as each ladleful is absorbed.',
            'After 20 minutes, stir in the mushrooms, parmesan, and a knob of butter.',
            'Remove from heat, rest for 2 minutes, then serve immediately.',
        ],
        tips: [
            'Never stop stirring -- this is what releases the starch for creaminess.',
            'Use a good-quality stock; it defines the dish.',
            'Serve immediately; risotto waits for no one.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-02-20'),
        courseValue: 'dinner',
        cuisineValues: ['italian'],
        ingredientQuantities: [
            { value: 'rice', quantity: '250g Arborio' },
            { value: 'mushroom', quantity: '300g mixed' },
            { value: 'butter', quantity: '50g' },
            { value: 'onion', quantity: '1 medium' },
            { value: 'parmesan', quantity: '80g grated' },
            { value: 'garlic', quantity: '2 cloves' },
            { value: 'black-pepper', quantity: 'to taste' },
            { value: 'salt', quantity: 'to taste' },
        ],
        tagValues: ['vegetarian', 'comfort-food', 'date-night'],
        toolValues: ['saucepan', 'frying-pan', 'chefs-knife', 'grater'],
    },

    // -----------------------------------------------------------------------
    // 5. Paneer Butter Masala
    // -----------------------------------------------------------------------
    {
        title: 'Paneer Butter Masala',
        description:
            'Soft paneer cubes swimming in a rich, velvety cashew-tomato gravy that is mildly spiced and finished with cream. The ultimate vegetarian indulgence.',
        imageUrl:
            'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop',
        prepTime: 15,
        cookTime: 25,
        passiveTime: null,
        servings: 4,
        viewCount: 7100,
        steps: [
            'Soak cashews in warm water for 15 minutes, then blend to a smooth paste.',
            'Saute onions, tomatoes, garlic, and ginger until soft. Blend to a smooth puree.',
            'Heat butter in a pan, add the puree, and cook on medium heat for 5 minutes.',
            'Stir in cashew paste, cream, salt, garam masala, and a pinch of sugar.',
            'Add paneer cubes and simmer for 5 minutes.',
            'Finish with dried fenugreek leaves and serve with naan or roti.',
        ],
        tips: [
            'Pan-fry paneer before adding to the gravy for a slightly firmer texture.',
            'Soaking paneer in warm water keeps it soft.',
            'Dried fenugreek (kasuri methi) is the secret ingredient.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-06-01'),
        courseValue: 'dinner',
        cuisineValues: ['indian'],
        ingredientQuantities: [
            { value: 'paneer', quantity: '250g cubed' },
            { value: 'tomato', quantity: '3 medium' },
            { value: 'onion', quantity: '2 large' },
            { value: 'butter', quantity: '3 tbsp' },
            { value: 'cream', quantity: '100ml' },
            { value: 'garlic', quantity: '4 cloves' },
            { value: 'ginger', quantity: '1 inch' },
            { value: 'garam-masala', quantity: '1 tsp' },
            { value: 'coriander-powder', quantity: '1 tsp' },
        ],
        tagValues: ['vegetarian', 'comfort-food', 'spicy'],
        toolValues: ['blender', 'saucepan', 'frying-pan', 'chefs-knife'],
    },

    // -----------------------------------------------------------------------
    // 6. Spaghetti Aglio e Olio
    // -----------------------------------------------------------------------
    {
        title: 'Spaghetti Aglio e Olio',
        description:
            'The simplest Italian pasta: spaghetti tossed with golden garlic-infused olive oil, chili flakes, and fresh parsley. Ready in 20 minutes.',
        imageUrl:
            'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop',
        prepTime: 5,
        cookTime: 15,
        passiveTime: null,
        servings: 2,
        viewCount: 3900,
        steps: [
            'Boil salted water and cook spaghetti until al dente. Reserve 1/2 cup pasta water.',
            'Gently heat olive oil in a wide pan. Add thinly sliced garlic and cook until golden (not burnt).',
            'Add chili flakes and stir for 30 seconds.',
            'Add drained pasta and a splash of pasta water. Toss vigorously.',
            'Remove from heat, stir in parsley, and finish with parmesan if desired.',
        ],
        tips: [
            'Pasta water is your emulsifier -- do not skip it.',
            'Garlic burns quickly; keep the heat moderate.',
            'Use high-quality extra-virgin olive oil -- it is the star of the dish.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-01-25'),
        courseValue: 'dinner',
        cuisineValues: ['italian'],
        ingredientQuantities: [
            { value: 'pasta', quantity: '200g spaghetti' },
            { value: 'garlic', quantity: '6 cloves, thinly sliced' },
            { value: 'olive-oil', quantity: '60ml' },
            { value: 'chili-flakes', quantity: '1 tsp' },
            { value: 'parmesan', quantity: '30g (optional)' },
            { value: 'salt', quantity: 'to taste' },
        ],
        tagValues: ['vegan', 'quick-and-easy', 'comfort-food'],
        toolValues: ['saucepan', 'frying-pan', 'colander', 'chefs-knife'],
    },

    // -----------------------------------------------------------------------
    // 7. Chocolate Brownies
    // -----------------------------------------------------------------------
    {
        title: 'Fudgy Dark Chocolate Brownies',
        description:
            'Ultra-fudgy, crinkle-topped brownies made with real dark chocolate and a touch of espresso powder to deepen the flavour. Impossible to eat just one.',
        imageUrl:
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop',
        prepTime: 15,
        cookTime: 25,
        passiveTime: 60,
        servings: 16,
        viewCount: 8300,
        steps: [
            'Preheat oven to 175C. Line a square tin with parchment.',
            'Melt dark chocolate and butter together over a bain-marie. Let cool slightly.',
            'Whisk eggs and sugar until pale and thick (about 4 minutes).',
            'Fold chocolate mixture into egg mixture.',
            'Sift in flour, cocoa powder, and salt. Fold until just combined.',
            'Pour into tin and bake 22-25 minutes until the top is set but the middle still wobbles.',
            'Cool completely in the tin before cutting.',
        ],
        tips: [
            'Underbake slightly -- residual heat will finish cooking.',
            'Espresso powder amplifies chocolate without adding coffee flavour.',
            'Refrigerating overnight makes cutting cleaner and intensifies the fudginess.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-07-04'),
        courseValue: 'dessert',
        cuisineValues: ['american'],
        ingredientQuantities: [
            { value: 'butter', quantity: '120g' },
            { value: 'eggs', quantity: '3 large' },
            { value: 'flour', quantity: '80g' },
            { value: 'salt', quantity: '1/2 tsp' },
            { value: 'milk', quantity: '2 tbsp (for ganache, optional)' },
        ],
        tagValues: ['comfort-food', 'kid-friendly'],
        toolValues: ['oven', 'baking-tray', 'mixing-bowl', 'whisk'],
    },

    // -----------------------------------------------------------------------
    // 8. Palak Paneer
    // -----------------------------------------------------------------------
    {
        title: 'Palak Paneer',
        description:
            'Velvety spiced spinach gravy with golden paneer cubes -- a north Indian classic that is as nutritious as it is delicious.',
        imageUrl:
            'https://images.unsplash.com/photo-1708782345205-94e1d1c54005?w=800&auto=format&fit=crop',
        prepTime: 15,
        cookTime: 20,
        passiveTime: null,
        servings: 4,
        viewCount: 5800,
        steps: [
            'Blanch spinach in boiling water for 2 minutes, then transfer to ice water. Blend to a smooth puree.',
            'Saute garlic and ginger in oil until fragrant. Add onions and cook until soft.',
            'Add turmeric, coriander powder, and garam masala. Cook for a minute.',
            'Pour in the spinach puree and season with salt. Simmer for 5 minutes.',
            'Add paneer cubes and cream. Cook for 3 more minutes.',
            'Serve with phulka or jeera rice.',
        ],
        tips: [
            'Ice bath after blanching keeps the spinach bright green.',
            'Do not over-cook once spinach is added or it loses colour.',
            'A tiny grating of nutmeg adds warmth to the gravy.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-05-22'),
        courseValue: 'dinner',
        cuisineValues: ['indian'],
        ingredientQuantities: [
            { value: 'paneer', quantity: '250g' },
            { value: 'spinach', quantity: '400g fresh' },
            { value: 'onion', quantity: '1 large' },
            { value: 'garlic', quantity: '4 cloves' },
            { value: 'ginger', quantity: '1 inch' },
            { value: 'cream', quantity: '50ml' },
            { value: 'turmeric', quantity: '1/2 tsp' },
            { value: 'garam-masala', quantity: '1 tsp' },
        ],
        tagValues: ['vegetarian', 'healthy', 'high-protein'],
        toolValues: ['blender', 'saucepan', 'frying-pan'],
    },

    // -----------------------------------------------------------------------
    // 9. Greek Salad
    // -----------------------------------------------------------------------
    {
        title: 'Classic Greek Salad',
        description:
            'A refreshing, no-cook salad of tomatoes, cucumbers, kalamata olives, red onion, and thick feta, dressed with olive oil, oregano, and lemon.',
        imageUrl:
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop',
        prepTime: 12,
        cookTime: 0,
        passiveTime: null,
        servings: 2,
        viewCount: 2900,
        steps: [
            'Roughly chop tomatoes and cucumbers into chunky pieces.',
            'Slice red onion and separate into rings.',
            'Combine tomatoes, cucumber, onion, and olives in a bowl.',
            'Lay a thick slab of feta on top (or crumble over the salad).',
            'Drizzle generously with olive oil, squeeze lemon, and sprinkle oregano.',
            'Season with salt and pepper. Toss lightly and serve.',
        ],
        tips: [
            'Use ripe, in-season tomatoes for maximum flavour.',
            'Traditional Greek salad does NOT toss the feta in -- it goes on top.',
            'Chill before serving for a more refreshing result.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-06-20'),
        courseValue: 'lunch',
        cuisineValues: ['mediterranean'],
        ingredientQuantities: [
            { value: 'tomato', quantity: '3 medium' },
            { value: 'olive-oil', quantity: '3 tbsp' },
            { value: 'lemon', quantity: '1/2' },
            { value: 'onion', quantity: '1/2 red onion' },
            { value: 'salt', quantity: 'to taste' },
            { value: 'black-pepper', quantity: 'to taste' },
        ],
        tagValues: ['vegetarian', 'healthy', 'quick-and-easy', 'gluten-free'],
        toolValues: ['cutting-board', 'chefs-knife', 'mixing-bowl'],
    },

    // -----------------------------------------------------------------------
    // 10. Chicken Biryani
    // -----------------------------------------------------------------------
    {
        title: 'Hyderabadi Chicken Biryani',
        description:
            'Aromatic dum-cooked biryani with juicy spiced chicken layered between fragrant basmati rice, saffron, caramelised onions, and fresh herbs.',
        imageUrl:
            'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop',
        prepTime: 30,
        cookTime: 45,
        passiveTime: 120,
        servings: 6,
        viewCount: 12400,
        steps: [
            'Marinate chicken in yogurt, ginger-garlic paste, and spices for 2 hours.',
            'Par-boil Basmati rice with whole spices until 70% cooked. Drain.',
            'Fry onions until deep golden brown (birista). Set aside.',
            'Layer rice and chicken alternately in a heavy pot. Top with saffron milk, fried onions, and ghee.',
            'Seal the pot with dough or a tight lid. Cook on high for 5 minutes, then low for 25 minutes.',
            'Rest for 10 minutes before opening. Serve with raita.',
        ],
        tips: [
            'The dum (steam) cooking is essential -- do not skip it.',
            'Par-cook rice precisely; over-cooked rice will turn mushy.',
            'Use aged basmati for the best aroma and separation.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-03-28'),
        courseValue: 'dinner',
        cuisineValues: ['indian'],
        ingredientQuantities: [
            { value: 'chicken', quantity: '1kg bone-in pieces' },
            { value: 'rice', quantity: '500g basmati' },
            { value: 'onion', quantity: '3 large' },
            { value: 'garlic', quantity: '8 cloves' },
            { value: 'ginger', quantity: '2 inch' },
            { value: 'cumin', quantity: '1 tsp' },
            { value: 'garam-masala', quantity: '2 tsp' },
            { value: 'turmeric', quantity: '1/2 tsp' },
            { value: 'black-pepper', quantity: '1 tsp' },
        ],
        tagValues: ['spicy', 'high-protein', 'comfort-food'],
        toolValues: [
            'pressure-cooker',
            'frying-pan',
            'saucepan',
            'chefs-knife',
        ],
    },

    // -----------------------------------------------------------------------
    // 11. Veg Fried Rice
    // -----------------------------------------------------------------------
    {
        title: 'Restaurant-Style Veg Fried Rice',
        description:
            'Wok-tossed day-old basmati rice with mixed vegetables, soy sauce, and spring onions -- quick, smoky, and deeply satisfying.',
        imageUrl:
            'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop',
        prepTime: 10,
        cookTime: 12,
        passiveTime: null,
        servings: 3,
        viewCount: 4700,
        steps: [
            'Heat wok on high flame until smoking. Add oil and garlic.',
            'Add diced bell peppers, carrots, and spring onion whites. Stir-fry 2 minutes.',
            'Push veggies aside, scramble eggs on the other side.',
            'Add day-old rice and toss everything together on high heat.',
            'Season with soy sauce, white pepper, and a drizzle of sesame oil.',
            'Garnish with spring onion greens and serve hot.',
        ],
        tips: [
            'Day-old rice is drier and fries better than freshly cooked rice.',
            'High heat is non-negotiable for that smoky "wok hei" flavour.',
            'Add a tiny splash of vinegar at the end for brightness.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-04-15'),
        courseValue: 'lunch',
        cuisineValues: ['chinese', 'indian'],
        ingredientQuantities: [
            { value: 'rice', quantity: '2 cups cooked' },
            { value: 'eggs', quantity: '2' },
            { value: 'bell-pepper', quantity: '1 (mixed colors)' },
            { value: 'garlic', quantity: '3 cloves' },
            { value: 'soy-sauce', quantity: '2 tbsp' },
            { value: 'onion', quantity: '2 spring onions' },
        ],
        tagValues: ['vegetarian', 'quick-and-easy', 'meal-prep'],
        toolValues: ['wok', 'chefs-knife', 'cutting-board', 'spatula'],
    },

    // -----------------------------------------------------------------------
    // 12. Pancakes
    // -----------------------------------------------------------------------
    {
        title: 'Fluffy American Pancakes',
        description:
            'Thick, cloud-like buttermilk pancakes with a golden exterior and airy interior. Perfect with maple syrup and fresh berries.',
        imageUrl:
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
        prepTime: 10,
        cookTime: 15,
        passiveTime: 5,
        servings: 4,
        viewCount: 5300,
        steps: [
            'Mix flour, baking powder, salt, and sugar in a bowl.',
            'Whisk together egg, milk, and melted butter in another bowl.',
            'Pour wet into dry and stir until JUST combined (lumps are fine).',
            'Let batter rest for 5 minutes.',
            'Heat a non-stick pan over medium heat with a little butter.',
            'Pour 1/4 cup batter per pancake. Cook until bubbles form on the surface, then flip.',
            'Cook 1 more minute. Serve immediately with maple syrup.',
        ],
        tips: [
            'Do not over-mix -- lumpy batter means fluffy pancakes.',
            'Let the batter rest; this activates the baking powder.',
            'Keep finished pancakes warm in a 100C oven while cooking the rest.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-02-14'),
        courseValue: 'breakfast',
        cuisineValues: ['american'],
        ingredientQuantities: [
            { value: 'flour', quantity: '200g' },
            { value: 'eggs', quantity: '1' },
            { value: 'milk', quantity: '250ml' },
            { value: 'butter', quantity: '30g melted' },
            { value: 'salt', quantity: 'a pinch' },
        ],
        tagValues: [
            'vegetarian',
            'kid-friendly',
            'comfort-food',
            'quick-and-easy',
        ],
        toolValues: ['frying-pan', 'mixing-bowl', 'whisk', 'spatula'],
    },

    // -----------------------------------------------------------------------
    // 13. Miso Ramen
    // -----------------------------------------------------------------------
    {
        title: 'Homemade Miso Ramen',
        description:
            'A warming bowl of rich miso broth with ramen noodles, soft-boiled egg, bamboo shoots, nori, and spring onions -- comfort in a bowl.',
        imageUrl:
            'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop',
        prepTime: 20,
        cookTime: 30,
        passiveTime: null,
        servings: 2,
        viewCount: 3400,
        steps: [
            'Prepare the marinade for soft-boiled eggs: soy sauce, mirin, water. Simmer 5 minutes and cool.',
            'Soft-boil eggs (7 minutes), peel, and marinate in the soy mixture for 2 hours.',
            'Saute garlic and ginger, then add chicken or vegetable stock. Simmer 15 minutes.',
            'Whisk in white miso paste -- never boil after adding miso.',
            'Cook ramen noodles according to package instructions.',
            'Assemble bowls: noodles, broth, halved eggs, toppings of choice, and sesame oil drizzle.',
        ],
        tips: [
            'Never boil the broth after adding miso -- it destroys the live cultures and flavour.',
            'Marinated eggs (ajitsuke tamago) are even better after overnight refrigeration.',
            'Chili oil is the ultimate topping for heat lovers.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-07-18'),
        courseValue: 'dinner',
        cuisineValues: ['japanese'],
        ingredientQuantities: [
            { value: 'eggs', quantity: '2' },
            { value: 'garlic', quantity: '3 cloves' },
            { value: 'ginger', quantity: '1 inch' },
            { value: 'soy-sauce', quantity: '4 tbsp (marinade + broth)' },
            { value: 'salt', quantity: 'to taste' },
            { value: 'black-pepper', quantity: 'to taste' },
        ],
        tagValues: ['comfort-food', 'date-night', 'meal-prep'],
        toolValues: ['saucepan', 'chefs-knife', 'cutting-board', 'colander'],
    },

    // -----------------------------------------------------------------------
    // 14. Thai Green Curry
    // -----------------------------------------------------------------------
    {
        title: 'Thai Green Curry with Vegetables',
        description:
            'Fragrant coconut-milk based green curry loaded with seasonal vegetables, kaffir lime leaves, and Thai basil. Serves beautifully over jasmine rice.',
        imageUrl:
            'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop',
        prepTime: 15,
        cookTime: 20,
        passiveTime: null,
        servings: 4,
        viewCount: 4100,
        steps: [
            'Heat oil in a wok, add green curry paste and fry for 1 minute.',
            'Pour in coconut milk and bring to a gentle simmer.',
            'Add vegetables (courgette, bell pepper, baby corn, spinach) and cook until just tender.',
            'Season with fish sauce (or soy for vegan) and a pinch of sugar.',
            'Finish with Thai basil and kaffir lime leaves.',
            'Serve over steamed jasmine rice.',
        ],
        tips: [
            'Fry the paste in oil first to bloom the aromatics.',
            'Do not boil the coconut milk vigorously or it may split.',
            'Add a squeeze of lime at the end for brightness.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-08-01'),
        courseValue: 'dinner',
        cuisineValues: ['thai'],
        ingredientQuantities: [
            { value: 'coconut-milk', quantity: '400ml' },
            { value: 'bell-pepper', quantity: '2 (mixed)' },
            { value: 'spinach', quantity: '100g' },
            { value: 'basil', quantity: 'a handful' },
            { value: 'garlic', quantity: '2 cloves' },
            { value: 'ginger', quantity: '1 inch' },
            { value: 'soy-sauce', quantity: '2 tbsp' },
            { value: 'lemon', quantity: '1 lime' },
        ],
        tagValues: ['vegan', 'gluten-free', 'healthy', 'spicy'],
        toolValues: ['wok', 'chefs-knife', 'cutting-board'],
    },

    // -----------------------------------------------------------------------
    // 15. Banana Bread
    // -----------------------------------------------------------------------
    {
        title: 'Moist Banana Bread',
        description:
            'Tender, deeply flavoured banana bread made with very ripe bananas, brown sugar, and a hint of cinnamon. Freezes beautifully.',
        imageUrl:
            'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&auto=format&fit=crop',
        prepTime: 10,
        cookTime: 55,
        passiveTime: 30,
        servings: 8,
        viewCount: 6100,
        steps: [
            'Preheat oven to 175C and grease a loaf tin.',
            'Mash 3 very ripe bananas until smooth.',
            'Stir in melted butter, brown sugar, eggs, and vanilla.',
            'Fold in flour, baking soda, salt, and cinnamon until just combined.',
            'Pour into tin and bake 50-60 minutes, or until a skewer comes out clean.',
            'Cool in the tin for 10 minutes, then on a wire rack for 20 minutes before slicing.',
        ],
        tips: [
            'The riper the bananas, the sweeter and more flavourful the bread.',
            'Add chocolate chips or walnuts for a twist.',
            'Test doneness at 50 minutes -- ovens vary.',
        ],
        isAdminRecipe: true,
        isPublished: true,
        publishedDate: new Date('2024-05-05'),
        courseValue: 'snack',
        cuisineValues: ['american'],
        ingredientQuantities: [
            { value: 'flour', quantity: '200g' },
            { value: 'butter', quantity: '80g melted' },
            { value: 'eggs', quantity: '2' },
            { value: 'milk', quantity: '2 tbsp' },
            { value: 'salt', quantity: '1/2 tsp' },
        ],
        tagValues: ['vegetarian', 'kid-friendly', 'comfort-food'],
        toolValues: ['oven', 'baking-tray', 'mixing-bowl', 'whisk'],
    },
]

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------
async function main() {
    console.log('Starting database seed...\n')

    // --- Courses ---
    console.log('  Seeding Courses...')
    const createdCourses: Record<string, string> = {}
    for (const c of COURSES) {
        const record = await prisma.course.upsert({
            where: { value: c.value },
            update: { label: c.label },
            create: c,
        })
        createdCourses[c.value] = record.id
    }
    console.log(`     ${COURSES.length} courses done`)

    // --- Cuisines ---
    console.log('  Seeding Cuisines...')
    const createdCuisines: Record<string, string> = {}
    for (const c of CUISINES) {
        const record = await prisma.cuisine.upsert({
            where: { value: c.value },
            update: { label: c.label },
            create: c,
        })
        createdCuisines[c.value] = record.id
    }
    console.log(`     ${CUISINES.length} cuisines done`)

    // --- Ingredients ---
    console.log('  Seeding Ingredients...')
    const createdIngredients: Record<string, string> = {}
    for (const i of INGREDIENTS) {
        const record = await prisma.ingredient.upsert({
            where: { value: i.value },
            update: { label: i.label },
            create: i,
        })
        createdIngredients[i.value] = record.id
    }
    console.log(`     ${INGREDIENTS.length} ingredients done`)

    // --- Tags ---
    console.log('  Seeding Tags...')
    const createdTags: Record<string, string> = {}
    for (const t of TAGS) {
        const record = await prisma.tag.upsert({
            where: { value: t.value },
            update: { label: t.label },
            create: t,
        })
        createdTags[t.value] = record.id
    }
    console.log(`     ${TAGS.length} tags done`)

    // --- Tools ---
    console.log('  Seeding Tools...')
    const createdTools: Record<string, string> = {}
    for (const t of TOOLS) {
        const record = await prisma.tool.upsert({
            where: { value: t.value },
            update: { label: t.label },
            create: t,
        })
        createdTools[t.value] = record.id
    }
    console.log(`     ${TOOLS.length} tools done`)

    // --- Recipes ---
    console.log('\n  Seeding Recipes...')
    console.log(`     WARNING: Using authorId "${PLACEHOLDER_AUTHOR_ID}".`)
    console.log(
        '     Replace PLACEHOLDER_AUTHOR_ID at the top of seed.ts with a real Clerk user ID.\n'
    )

    let recipeCount = 0

    for (const r of RECIPES) {
        const courseId = createdCourses[r.courseValue]
        if (!courseId) {
            console.warn(
                `     SKIP: Unknown course "${r.courseValue}" for recipe "${r.title}"`
            )
            continue
        }

        try {
            const recipe = await prisma.recipe.create({
                data: {
                    title: r.title,
                    description: r.description,
                    imageUrl: r.imageUrl,
                    prepTime: r.prepTime,
                    cookTime: r.cookTime,
                    passiveTime: r.passiveTime ?? undefined,
                    servings: r.servings,
                    viewCount: r.viewCount,
                    steps: r.steps,
                    tips: r.tips,
                    isAdminRecipe: r.isAdminRecipe,
                    isPublished: r.isPublished,
                    publishedDate: r.publishedDate ?? undefined,
                    authorId: PLACEHOLDER_AUTHOR_ID,
                    courseId,
                },
            })

            // Cuisines
            for (const cv of r.cuisineValues) {
                const cuisineId = createdCuisines[cv]
                if (cuisineId) {
                    await prisma.recipeCuisine.create({
                        data: { recipeId: recipe.id, cuisineId },
                    })
                }
            }

            // Ingredients
            for (const { value, quantity } of r.ingredientQuantities) {
                const ingredientId = createdIngredients[value]
                if (ingredientId) {
                    await prisma.recipeIngredient.create({
                        data: { recipeId: recipe.id, ingredientId, quantity },
                    })
                }
            }

            // Tags
            for (const tv of r.tagValues) {
                const tagId = createdTags[tv]
                if (tagId) {
                    await prisma.recipeTag.create({
                        data: { recipeId: recipe.id, tagId },
                    })
                }
            }

            // Tools
            for (const tv of r.toolValues) {
                const toolId = createdTools[tv]
                if (toolId) {
                    await prisma.recipeTool.create({
                        data: { recipeId: recipe.id, toolId },
                    })
                }
            }

            console.log(`     OK: "${r.title}"`)
            recipeCount++
        } catch (err) {
            console.error(`     FAIL: "${r.title}"`, err)
        }
    }

    console.log(`\nSeed complete!`)
    console.log(`   Courses:     ${COURSES.length}`)
    console.log(`   Cuisines:    ${CUISINES.length}`)
    console.log(`   Ingredients: ${INGREDIENTS.length}`)
    console.log(`   Tags:        ${TAGS.length}`)
    console.log(`   Tools:       ${TOOLS.length}`)
    console.log(`   Recipes:     ${recipeCount}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
