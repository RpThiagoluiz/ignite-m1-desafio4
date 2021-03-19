import {
  createContext,
  useEffect,
  ReactNode,
  useState,
  useContext,
} from "react";

import api from "../services/api";

interface FoodContextData {
  foods: FoodData[];
  editingFood: FoodData;
  modalOpen: boolean;
  editModalOpen: boolean;

  handleAddFood(food: Omit<FoodData, "id" | "available">): void;
  handleUpdateFood(food: Omit<FoodData, "id" | "available">): void;
  handleDeleteFood(id: number): void;
  toggleModal(): void;
  toggleEditModal(): void;
  handleEditFood(food: FoodData): void;
}

interface FoodProviderProps {
  children: ReactNode;
}

interface FoodData {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

const FoodProvider = ({ children }: FoodProviderProps) => {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods() {
      const foodsList = await api.get("/foods");
      setFoods(foodsList.data);
    }
    loadFoods();
  }, []);

  async function handleAddFood(food: Omit<FoodData, "id" | "available">) {
    try {
      const newFood: FoodData = {
        id: foods[foods.length - 1] ? foods[foods.length - 1].id + 1 : 1,
        name: food.name,
        image: food.image,
        price: food.price,
        description: food.description,
        available: true,
      };
      await api.post("/foods", newFood);
      setFoods([...foods, newFood]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: Omit<FoodData, "id" | "available">) {
    const newFoodList = foods.map((currentFood) => {
      if (currentFood.id !== editingFood.id) {
        return currentFood;
      }
      return {
        ...food,
        id: editingFood.id,
        available: editingFood.available,
      };
    });
    setFoods(newFoodList);
    await api.put(`/foods/${editingFood.id}`, {
      ...food,
      id: editingFood.id,
      available: editingFood.available,
    });
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    const newFoodList = foods.filter((currentFood) => currentFood.id !== id);
    setFoods(newFoodList);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodData) {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <FoodContext.Provider
      value={{
        foods,
        editingFood,
        modalOpen,
        editModalOpen,
        handleAddFood,
        handleUpdateFood,
        handleDeleteFood,
        handleEditFood,
        toggleModal,
        toggleEditModal,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

const useFood = () => {
  const context = useContext(FoodContext);
  return context;
};

export { useFood, FoodProvider };
