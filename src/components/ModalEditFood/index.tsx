import { useRef, useCallback } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { FormHandles } from "@unform/core";

import { Form } from "./styles";
import { Modal } from "../Modal"; //check
import { Input } from "../Input"; //check
import { useFood } from "../../hook/useFood";

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

export const ModalEditFood = () => {
  const formRef = useRef<FormHandles>(null);
  //     this.formRef = createRef();
  const { editingFood, handleUpdateFood } = useFood();

  const handleSubmit = useCallback(
    (data: Omit<IFoodPlate, "id" | "available">) => {
      handleUpdateFood(data);
    },
    [handleUpdateFood]
  );

  //  handleSubmit = async (data) => {
  //     const { setIsOpen, handleUpdateFood } = this.props;

  //     handleUpdateFood(data);
  //     setIsOpen();
  //   };

  return (
    <Modal>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

// class ModalEditFood extends Component {
//   constructor(props) {
//     super(props);

//     this.formRef = createRef();
//   }

//   handleSubmit = async (data) => {
//     const { setIsOpen, handleUpdateFood } = this.props;

//     handleUpdateFood(data);
//     setIsOpen();
//   };

//   render() {
//     const { isOpen, setIsOpen, editingFood } = this.props;

//     return (
//       <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
//         <Form
//           ref={this.formRef}
//           onSubmit={this.handleSubmit}
//           initialData={editingFood}
//         >
//           <h1>Editar Prato</h1>
//           <Input name="image" placeholder="Cole o link aqui" />

//           <Input name="name" placeholder="Ex: Moda Italiana" />
//           <Input name="price" placeholder="Ex: 19.90" />

//           <Input name="description" placeholder="Descrição" />

//           <button type="submit" data-testid="edit-food-button">
//             <div className="text">Editar Prato</div>
//             <div className="icon">
//               <FiCheckSquare size={24} />
//             </div>
//           </button>
//         </Form>
//       </Modal>
//     );
//   }
// }

// export default ModalEditFood;
