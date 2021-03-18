import { useRef, useCallback } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "./styles";
import { Modal } from "../Modal"; //check
import { Input } from "../Input"; //check
import { useFood } from "../../hook/useFood";

interface IFoodPlate {
  name: string;
  image: string;
  price: string;
  description: string;
}

export const ModalAddFood = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleAddFood } = useFood();

  const handleSubmit = useCallback(
    (data: IFoodPlate) => {
      handleAddFood(data);
    },
    [handleAddFood]
  );

  return (
    <Modal>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

// class ModalAddFood extends Component {
//   constructor(props) {
//     super(props);

//     this.formRef = createRef();
//   }

//   handleSubmit = async (data) => {
//     const { setIsOpen, handleAddFood } = this.props;

//     handleAddFood(data);
//     setIsOpen();
//   };

//   render() {
//     const { isOpen, setIsOpen } = this.props;

//     return (
//       <Modal isOpen={isOpen} onRequestClose={setIsOpen}>
//         <Form ref={this.formRef} onSubmit={this.handleSubmit}>
//           <h1>Novo Prato</h1>
//           <Input name="image" placeholder="Cole o link aqui" />

//           <Input name="name" placeholder="Ex: Moda Italiana" />
//           <Input name="price" placeholder="Ex: 19.90" />

//           <Input name="description" placeholder="Descrição" />
//           <button type="submit" data-testid="add-food-button">
//             <p className="text">Adicionar Prato</p>
//             <div className="icon">
//               <FiCheckSquare size={24} />
//             </div>
//           </button>
//         </Form>
//       </Modal>
//     );
//   }
// }

// export default ModalAddFood;
