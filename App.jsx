import React, { useState, useEffect } from 'react';
import { 
  Calendar, Plus, Trash2, CheckCircle, Circle, ChefHat, 
  ShoppingBag, Clock, Users, X, BookOpen, HelpCircle, Utensils, Pencil, Eye, Upload
} from 'lucide-react';

const INITIAL_RECIPES = [
  {
    id: '1',
    title: 'Avocado Toast & Poached Egg',
    category: 'Breakfast',
    prepTime: 10,
    servings: 1,
    calories: 320,
    protein: 14,
    carbs: 28,
    fat: 18,
    tags: ['Breakfast', 'High Protein', 'Quick & Easy'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Sourdough Bread', amount: 2, unit: 'slice', aisle: 'Bakery', image: '' },
      { name: 'Avocado', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Eggs', amount: 2, unit: 'pc', aisle: 'Dairy & Eggs', image: '' },
      { name: 'Chili Flakes', amount: 1, unit: 'tsp', aisle: 'Pantry', image: '' }
    ],
    instructions: [
      'Toast sourdough slices until golden.',
      'Mash avocado with a pinch of salt and lemon juice.',
      'Poach eggs in simmering water for 3 minutes.',
      'Spread avocado on toast, top with eggs and chili flakes.'
    ]
  },
  {
    id: '2',
    title: 'Grilled Salmon Quinoa Bowl',
    category: 'Lunch/Dinner',
    prepTime: 25,
    servings: 2,
    calories: 540,
    protein: 42,
    carbs: 45,
    fat: 22,
    tags: ['Lunch/Dinner', 'High Protein', 'Low Carb'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Salmon Fillet', amount: 300, unit: 'g', aisle: 'Meat & Seafood', image: '' },
      { name: 'Cooked Quinoa', amount: 1, unit: 'cup', aisle: 'Grains & Pasta', image: '' },
      { name: 'Spinach', amount: 100, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Cherry Tomatoes', amount: 10, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Olive Oil', amount: 1, unit: 'tbsp', aisle: 'Pantry', image: '' }
    ],
    instructions: [
      'Season salmon with salt, pepper, and olive oil.',
      'Grill salmon for 4 minutes per side until cooked through.',
      'Assemble bowl with quinoa base, fresh spinach, and cherry tomatoes.',
      'Top with grilled salmon fillet and serve.'
    ]
  },
  {
    id: '3',
    title: 'Greek Yogurt Berry Parfait',
    category: 'Snack',
    prepTime: 5,
    servings: 1,
    calories: 220,
    protein: 18,
    carbs: 26,
    fat: 4,
    tags: ['Snack', 'High Protein', 'Quick & Easy'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Greek Yogurt', amount: 1, unit: 'cup', aisle: 'Dairy & Eggs', image: '' },
      { name: 'Mixed Berries', amount: 100, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Honey', amount: 1, unit: 'tbsp', aisle: 'Pantry', image: '' },
      { name: 'Granola', amount: 0.5, unit: 'cup', aisle: 'Pantry', image: '' }
    ],
    instructions: [
      'Layer Greek yogurt in a glass bowl or jar.',
      'Top with mixed fresh berries and granola.',
      'Drizzle with honey before serving.'
    ]
  }
];

const INITIAL_PLAN = {
  Monday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Tuesday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Wednesday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Thursday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Friday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Saturday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Sunday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] }
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');

  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('ppp_recipes');
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  const [weeklyPlan, setWeeklyPlan] = useState(() => {
    const saved = localStorage.getItem('ppp_plan');
    return saved ? JSON.parse(saved) : INITIAL_PLAN;
  });

  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('ppp_shopping');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Custom Recipe Modal State
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    category: 'Lunch/Dinner',
    prepTime: 15,
    servings: 2,
    image: '',
    ingredients: [{ name: '', amount: 1, unit: 'cup', aisle: 'Produce', image: '' }],
    instructions: ['']
  });

  // Sync state changes to local storage
  useEffect(() => {
    localStorage.setItem('ppp_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('ppp_plan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  useEffect(() => {
    localStorage.setItem('ppp_shopping', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const estimateNutritionFromIngredients = (ingredients) => {
    let totalCals = 0;
    let totalProt = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    ingredients.forEach(ing => {
      const name = ing.name.toLowerCase();
      const amt = parseFloat(ing.amount) || 0;
      let factor = amt;

      if (ing.unit === 'mg') factor = amt / 100000;
      if (ing.unit === 'g') factor = amt / 100;
      if (ing.unit === 'kg') factor = amt * 10;
      if (ing.unit === 'ml') factor = amt / 100;
      if (ing.unit === 'l') factor = amt * 10;
      if (ing.unit === 'cup') factor = amt * 1.5;
      if (ing.unit === 'pc' || ing.unit === 'slice') factor = amt * 0.7;
      if (ing.unit === 'tbsp') factor = amt * 0.15;
      if (ing.unit === 'tsp') factor = amt * 0.05;
      if (ing.unit === 'pinch') factor = amt * 0.01;
      if (ing.unit === 'oz') factor = amt * 0.3;

      if (name.includes('chicken') || name.includes('turkey') || name.includes('salmon') || name.includes('beef')) {
        totalCals += factor * 200;
        totalProt += factor * 25;
        totalFat += factor * 8;
      } else if (name.includes('egg')) {
        totalCals += factor * 140;
        totalProt += factor * 12;
        totalFat += factor * 10;
      } else if (name.includes('cheese') || name.includes('yogurt') || name.includes('milk')) {
        totalCals += factor * 150;
        totalProt += factor * 10;
        totalCarbs += factor * 5;
        totalFat += factor * 8;
      } else if (name.includes('bread') || name.includes('rice') || name.includes('quinoa') || name.includes('pasta') || name.includes('granola')) {
        totalCals += factor * 220;
        totalProt += factor * 6;
        totalCarbs += factor * 45;
        totalFat += factor * 2;
      } else if (name.includes('avocado') || name.includes('oil') || name.includes('nut') || name.includes('butter')) {
        totalCals += factor * 400;
        totalFat += factor * 40;
      } else {
        totalCals += factor * 50;
        totalProt += factor * 2;
        totalCarbs += factor * 10;
      }
    });

    return {
      calories: Math.round(totalCals) || 250,
      protein: Math.round(totalProt) || 15,
      carbs: Math.round(totalCarbs) || 20,
      fat: Math.round(totalFat) || 8
    };
  };

  const estimateTagsFromRecipe = (recipe) => {
    const tags = [recipe.category];
    const macros = estimateNutritionFromIngredients(recipe.ingredients);

    if (macros.protein >= 25) tags.push('High Protein');
    if (macros.carbs <= 15) tags.push('Low Carb');
    if (recipe.prepTime <= 20) tags.push('Quick & Easy');

    const allIngNames = recipe.ingredients.map(i => i.name.toLowerCase()).join(' ');
    if (!allIngNames.match(/(chicken|beef|pork|salmon|tuna|turkey|bacon|fish|meat)/)) {
      tags.push('Vegetarian');
    }

    return Array.from(new Set(tags));
  };

  const handleOpenAddRecipe = () => {
    setEditingRecipeId(null);
    setNewRecipe({
      title: '',
      category: 'Lunch/Dinner',
      prepTime: 15,
      servings: 2,
      image: '',
      ingredients: [{ name: '', amount: 1, unit: 'cup', aisle: 'Produce', image: '' }],
      instructions: ['']
    });
    setIsRecipeModalOpen(true);
  };

  const handleOpenEditRecipe = (recipe) => {
    setEditingRecipeId(recipe.id);
    setNewRecipe({
      title: recipe.title || '',
      category: recipe.category || 'Lunch/Dinner',
      prepTime: recipe.prepTime || 15,
      servings: recipe.servings || 2,
      image: recipe.image || '',
      ingredients: recipe.ingredients && recipe.ingredients.length > 0
        ? recipe.ingredients.map(ing => ({ ...ing, image: ing.image || '' }))
        : [{ name: '', amount: 1, unit: 'cup', aisle: 'Produce', image: '' }],
      instructions: recipe.instructions && recipe.instructions.length > 0
        ? recipe.instructions
        : ['']
    });
    setIsRecipeModalOpen(true);
  };

  const handleDeleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    showNotification('Recipe deleted from cookbook');
  };

  const handleImageFileUpload = (e, targetField, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      if (targetField === 'cover') {
        setNewRecipe(prev => ({ ...prev, image: dataUrl }));
      } else if (targetField === 'ingredient' && index !== null) {
        setNewRecipe(prev => {
          const updatedIngs = [...prev.ingredients];
          updatedIngs[index].image = dataUrl;
          return { ...prev, ingredients: updatedIngs };
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddIngredientRow = () => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: 1, unit: 'cup', aisle: 'Produce', image: '' }]
    }));
  };

  const handleRemoveIngredientRow = (index) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setNewRecipe(prev => {
      const updatedIngs = [...prev.ingredients];
      updatedIngs[index] = { ...updatedIngs[index], [field]: value };
      return { ...prev, ingredients: updatedIngs };
    });
  };

  const handleAddInstructionRow = () => {
    setNewRecipe(prev => ({ ...prev, instructions: [...prev.instructions, ''] }));
  };

  const handleInstructionChange = (index, value) => {
    setNewRecipe(prev => {
      const updated = [...prev.instructions];
      updated[index] = value;
      return { ...prev, instructions: updated };
    });
  };

  const handleRemoveInstructionRow = (index) => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleSaveCustomRecipe = (e) => {
    e.preventDefault();
    if (!newRecipe.title.trim()) return;

    const macros = estimateNutritionFromIngredients(newRecipe.ingredients);
    const tags = estimateTagsFromRecipe(newRecipe);

    const recipeId = editingRecipeId || Date.now().toString();
    const recipeData = {
      id: recipeId,
      ...newRecipe,
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      tags,
      image:
        newRecipe.image.trim() ||
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80'
    };

    if (editingRecipeId) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === editingRecipeId ? recipeData : r))
      );
      showNotification(`Updated "${recipeData.title}"!`);
    } else {
      setRecipes((prev) => [recipeData, ...prev]);
      showNotification(`Added "${recipeData.title}" to Cookbook!`);
    }

    setIsRecipeModalOpen(false);
    setEditingRecipeId(null);
  };

  const handleMealSlotChange = (day, meal, index, field, value) => {
    setWeeklyPlan((prev) => {
      const dayPlan = { ...prev[day] };
      const currentArr = [...(dayPlan[meal] || [{ id: '', portions: 1 }])];
      if (field === 'id') {
        currentArr[index] = { ...currentArr[index], id: value };
      } else if (field === 'portions') {
        currentArr[index] = { ...currentArr[index], portions: parseInt(value) || 1 };
      }
      dayPlan[meal] = currentArr;
      return { ...prev, [day]: dayPlan };
    });
  };

  const handleAddDishToSlot = (day, meal) => {
    setWeeklyPlan((prev) => {
      const dayPlan = { ...prev[day] };
      const currentArr = [...(dayPlan[meal] || [{ id: '', portions: 1 }])];
      currentArr.push({ id: '', portions: 1 });
      dayPlan[meal] = currentArr;
      return { ...prev, [day]: dayPlan };
    });
  };

  const handleRemoveDishFromSlot = (day, meal, index) => {
    setWeeklyPlan((prev) => {
      const dayPlan = { ...prev[day] };
      let currentArr = [...(dayPlan[meal] || [{ id: '', portions: 1 }])];
      currentArr.splice(index, 1);
      if (currentArr.length === 0) currentArr = [{ id: '', portions: 1 }];
      dayPlan[meal] = currentArr;
      return { ...prev, [day]: dayPlan };
    });
  };

  const getDailyTotals = (day) => {
    const dayPlan = weeklyPlan[day] || {};
    let calories = 0;
    let protein = 0;

    Object.values(dayPlan).forEach((dishes) => {
      if (Array.isArray(dishes)) {
        dishes.forEach((item) => {
          if (!item || !item.id) return;
          const r = recipes.find((rec) => rec.id === item.id);
          if (r) {
            const defaultServings = r.servings || 1;
            const portionRatio = (item.portions || 1) / defaultServings;
            calories += (r.calories || 0) * portionRatio;
            protein += (r.protein || 0) * portionRatio;
          }
        });
      }
    });

    return { calories: Math.round(calories), protein: Math.round(protein) };
  };

  const handleSyncShoppingList = () => {
    const ingredientMap = {};

    Object.values(weeklyPlan).forEach((dayPlan) => {
      Object.values(dayPlan).forEach((dishes) => {
        if (Array.isArray(dishes)) {
          dishes.forEach((item) => {
            if (!item || !item.id) return;
            const recipe = recipes.find((r) => r.id === item.id);
            const defaultServings = recipe?.servings || 1;
            const portionRatio = (item.portions || 1) / defaultServings;

            if (recipe && recipe.ingredients) {
              recipe.ingredients.forEach((ing) => {
                const key = `${ing.name.toLowerCase()}_${ing.unit}`;
                const addedAmount = (parseFloat(ing.amount) || 1) * portionRatio;
                if (ingredientMap[key]) {
                  ingredientMap[key].amount += addedAmount;
                } else {
                  ingredientMap[key] = {
                    id: Date.now().toString() + Math.random(),
                    name: ing.name,
                    amount: addedAmount,
                    unit: ing.unit,
                    aisle: ing.aisle || 'Other',
                    image: ing.image || '',
                    checked: false
                  };
                }
              });
            }
          });
        }
      });
    });

    const syncedList = Object.values(ingredientMap).map(i => ({
      ...i,
      amount: Math.round(i.amount * 100) / 100
    }));
    setShoppingList(syncedList);
    showNotification(`Synced ${syncedList.length} items to your shopping list!`);
    setActiveTab('shopping');
  };

  const handleResetMealPlan = () => {
    const emptyPlan = {
      Monday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Tuesday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Wednesday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Thursday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Friday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Saturday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Sunday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] }
    };
    setWeeklyPlan(emptyPlan);
    showNotification('Weekly meal planner has been reset');
  };

  const filteredRecipes = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' ||
      r.category === categoryFilter ||
      (r.tags && r.tags.includes(categoryFilter));
    return matchesSearch && matchesCategory;
  });

  const estimatedModalMacros = estimateNutritionFromIngredients(newRecipe.ingredients);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          {notification}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxImage} alt="Full view" className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 p-2 text-xl font-bold"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">How to use Peculiar Pantry Plan</h3>
                <p className="text-xs text-slate-500">Quick user guide & local storage</p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Weekly Meal Planner & Portions
                </h4>
                <p>Assign recipes and adjust portion numbers (e.g. 1, 2, 3) to instantly scale your daily calorie and protein calculations!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-md">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Peculiar Pantry Plan
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  Ready
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">Smart Kitchen & Recipe Planner</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-2.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-xl transition"
              title="Help & Guide"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={handleSyncShoppingList}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Sync Shopping List
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex gap-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('planner')}
            className={`py-3 font-extrabold text-sm border-b-2 transition flex items-center gap-2 ${
              activeTab === 'planner'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" /> Meal Planner
          </button>
          <button
            onClick={() => setActiveTab('cookbook')}
            className={`py-3 font-extrabold text-sm border-b-2 transition flex items-center gap-2 ${
              activeTab === 'cookbook'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Cookbook ({recipes.length})
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`py-3 font-extrabold text-sm border-b-2 transition flex items-center gap-2 ${
              activeTab === 'shopping'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Shopping List ({shoppingList.length})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab 1: Meal Planner */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Weekly Schedule</h2>
                <p className="text-xs text-slate-500">Plan your meals from Monday to Sunday with custom portions</p>
              </div>
              <button
                onClick={handleResetMealPlan}
                className="bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-600 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <Trash2 className="w-4 h-4" /> Reset Meal Planner
              </button>
            </div>

            <div className="space-y-4">
              {daysOfWeek.map((day) => {
                const totals = getDailyTotals(day);
                return (
                  <div key={day} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-100/70 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
                      <span className="font-black text-slate-900 text-base">{day}</span>
                      <div className="flex items-center gap-4 text-xs font-extrabold text-slate-600">
                        <span>🔥 {totals.calories} kcal</span>
                        <span>💪 {totals.protein}g protein</span>
                      </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                      {mealTypes.map((meal) => {
                        const assignedDishes = weeklyPlan[day]?.[meal] || [{ id: '', portions: 1 }];
                        const allowMultiple = meal !== 'Snack';

                        return (
                          <div key={meal} className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                            <span className="text-xs font-black uppercase tracking-wider text-slate-400">{meal}</span>

                            {assignedDishes.map((dishItem, idx) => {
                              const recipeMatch = recipes.find((r) => r.id === dishItem.id);
                              const portions = dishItem.portions || 1;
                              const defaultServings = recipeMatch?.servings || 1;
                              const ratio = portions / defaultServings;

                              return (
                                <div key={idx} className="space-y-2 relative group">
                                  <div className="flex items-center gap-1.5">
                                    <select
                                      value={dishItem.id}
                                      onChange={(e) => handleMealSlotChange(day, meal, idx, 'id', e.target.value)}
                                      className="flex-1 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-wrap break-words min-w-0"
                                    >
                                      <option value="">Select a dish...</option>
                                      {recipes.map((r) => (
                                        <option key={r.id} value={r.id}>
                                          {r.title} ({r.calories} kcal)
                                        </option>
                                      ))}
                                    </select>

                                    {dishItem.id && (
                                      <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-1.5 rounded-xl shadow-sm">
                                        <span className="text-[10px] font-bold text-slate-400">Portions:</span>
                                        <input
                                          type="number"
                                          min="1"
                                          max="10"
                                          value={portions}
                                          onChange={(e) => handleMealSlotChange(day, meal, idx, 'portions', e.target.value)}
                                          className="w-10 text-xs font-bold text-slate-800 focus:outline-none text-center bg-slate-50 rounded-md"
                                        />
                                      </div>
                                    )}

                                    {assignedDishes.length > 1 && (
                                      <button
                                        onClick={() => handleRemoveDishFromSlot(day, meal, idx)}
                                        className="text-slate-400 hover:text-red-500 p-1"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>

                                  {recipeMatch && (
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
                                      <img
                                        src={recipeMatch.image}
                                        alt=""
                                        onClick={() => setLightboxImage(recipeMatch.image)}
                                        className="w-10 h-10 rounded-lg object-cover cursor-pointer hover:opacity-80 transition"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                                          <span>🔥 {Math.round((recipeMatch.calories || 0) * ratio)} kcal</span>
                                          <span>💪 {Math.round((recipeMatch.protein || 0) * ratio)}g</span>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => setSelectedRecipeDetail({
                                          ...recipeMatch,
                                          ingredients: recipeMatch.ingredients.map(ing => ({
                                            ...ing,
                                            amount: Math.round(((parseFloat(ing.amount) || 0) * ratio) * 100) / 100
                                          }))
                                        })}
                                        className="text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg"
                                      >
                                        Details
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}

                            {allowMultiple && (
                              <button
                                onClick={() => handleAddDishToSlot(day, meal)}
                                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add Another Dish
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Cookbook */}
        {activeTab === 'cookbook' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Cookbook</h2>
                <p className="text-xs text-slate-500">Saved custom recipes</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-48"
                />
                <button
                  onClick={handleOpenAddRecipe}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add Custom Recipe
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="relative h-48 bg-slate-100 cursor-pointer" onClick={() => setLightboxImage(recipe.image)}>
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditRecipe(recipe);
                        }}
                        className="p-2 bg-white/90 hover:bg-emerald-600 hover:text-white text-slate-700 rounded-full transition shadow-md"
                        title="Edit Recipe"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecipe(recipe.id);
                        }}
                        className="p-2 bg-white/90 hover:bg-red-500 hover:text-white text-slate-700 rounded-full transition shadow-md"
                        title="Delete Recipe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {recipe.tags?.map((t) => (
                          <span key={t} className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base">{recipe.title}</h3>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center py-2 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-700">
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase">Cals</span>
                        {recipe.calories}
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase">Prot</span>
                        {recipe.protein}g
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase">Carb</span>
                        {recipe.carbs}g
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase">Fat</span>
                        {recipe.fat}g
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedRecipeDetail(recipe)}
                      className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
                    >
                      View Recipe Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Shopping List */}
        {activeTab === 'shopping' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Shopping List</h2>
                <p className="text-xs text-slate-500">Grocery list compiled from your weekly plan and portions</p>
              </div>
              <button
                onClick={() => setShoppingList([])}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            {shoppingList.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-700">Your shopping list is empty</h3>
                <p className="text-xs text-slate-400">Click "Sync Shopping List" above to import your weekly meal plan ingredients.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
                {shoppingList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShoppingList(prev => prev.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i));
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer ${
                      item.checked ? 'bg-slate-50 border-slate-100 text-slate-400 line-through' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.checked ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
                      <span className="font-bold text-sm">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">
                      {item.amount} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipeDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedRecipeDetail(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex gap-4 items-center">
              <img
                src={selectedRecipeDetail.image}
                alt=""
                onClick={() => setLightboxImage(selectedRecipeDetail.image)}
                className="w-24 h-24 rounded-2xl object-cover cursor-pointer hover:opacity-90 transition"
              />
              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedRecipeDetail.title}</h3>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  ⏱️ {selectedRecipeDetail.prepTime} mins | 👥 Serves {selectedRecipeDetail.servings}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-slate-800 mb-3">Ingredients</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedRecipeDetail.ingredients?.map((ing, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {ing.image && (
                        <img
                          src={ing.image}
                          alt=""
                          onClick={() => setLightboxImage(ing.image)}
                          className="w-6 h-6 rounded-md object-cover cursor-pointer hover:opacity-80 transition"
                        />
                      )}
                      <span>{ing.name}</span>
                    </div>
                    <span className="text-slate-400">{ing.amount} {ing.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-slate-800 mb-3">Instructions</h4>
              <ol className="space-y-2 text-xs text-slate-600 font-medium">
                {selectedRecipeDetail.instructions?.map((step, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-bold text-emerald-600">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Custom Recipe Modal */}
      {isRecipeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setIsRecipeModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-lg font-extrabold text-slate-900">
              {editingRecipeId ? 'Edit Custom Recipe' : 'Add New Recipe'}
            </h2>

            <form onSubmit={handleSaveCustomRecipe} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Recipe Title</label>
                <input
                  type="text"
                  required
                  value={newRecipe.title}
                  onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                  placeholder="e.g. Garlic Butter Shrimp Bowl"
                  className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newRecipe.category}
                    onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch/Dinner">Lunch/Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prep Time (mins)</label>
                  <input
                    type="number"
                    value={newRecipe.prepTime}
                    onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: parseInt(e.target.value) || 10 })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Servings</label>
                  <input
                    type="number"
                    value={newRecipe.servings}
                    onChange={(e) => setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Recipe Cover Image</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Paste Image URL or upload below..."
                    value={newRecipe.image}
                    onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl transition border border-slate-200 flex items-center gap-1.5 shrink-0">
                    📷 Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'cover')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">Ingredients</label>
                  <button
                    type="button"
                    onClick={handleAddIngredientRow}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Ingredient
                  </button>
                </div>

                {newRecipe.ingredients.map((ing, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ingredient name..."
                        value={ing.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        className="flex-1 bg-white border border-slate-200 text-xs p-2 rounded-xl"
                      />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Amt"
                        value={ing.amount}
                        onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                        className="w-16 bg-white border border-slate-200 text-xs p-2 rounded-xl"
                      />
                      <select
                        value={ing.unit}
                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                        className="bg-white border border-slate-200 text-xs p-2 rounded-xl"
                      >
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="cup">cup</option>
                        <option value="tbsp">tbsp</option>
                        <option value="tsp">tsp</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="pc">pc</option>
                        <option value="slice">slice</option>
                        <option value="pinch">pinch</option>
                        <option value="oz">oz</option>
                      </select>
                      {newRecipe.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredientRow(index)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Ingredient picture URL..."
                        value={ing.image || ''}
                        onChange={(e) => handleIngredientChange(index, 'image', e.target.value)}
                        className="flex-1 bg-white border border-slate-200 text-xs p-2 rounded-xl"
                      />
                      <label className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 font-bold text-[10px] px-3 py-2 rounded-xl transition border border-slate-200 shrink-0">
                        📷 Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, 'ingredient', index)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructions List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">Instructions / Preparation Steps</label>
                  <button
                    type="button"
                    onClick={handleAddInstructionRow}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Step
                  </button>
                </div>

                {newRecipe.instructions.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-5">{index + 1}.</span>
                    <input
                      type="text"
                      placeholder={`Step ${index + 1} instructions...`}
                      value={step}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 text-xs p-2.5 rounded-xl"
                    />
                    {newRecipe.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveInstructionRow(index)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Auto Estimated Macro Preview */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">Auto-estimated Macros</span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-emerald-900">
                  <div>🔥 {estimatedModalMacros.calories} kcal</div>
                  <div>💪 {estimatedModalMacros.protein}g protein</div>
                  <div>🌾 {estimatedModalMacros.carbs}g carbs</div>
                  <div>🥑 {estimatedModalMacros.fat}g fat</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white font-extrabold rounded-xl hover:bg-emerald-700 shadow-md transition"
              >
                {editingRecipeId ? 'Update Recipe' : 'Save Recipe to Cookbook'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}