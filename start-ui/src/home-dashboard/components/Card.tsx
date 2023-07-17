import { BqButton } from "@bee-q/react";
import { Pizza } from "../../services/pizza-service";
import { cardStyles as styles } from "../../styles/cardStyles";

interface Props {
  pizza: Pizza;
  onEdit: (pizza: Pizza) => void;
  onDelete: (pizza: Pizza) => void;
}

const Card = ({ pizza, onEdit, onDelete }: Props) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>{pizza.name}</h2>
      <ul className={styles.ul}>
        <li>Ingredients: {pizza.ingredients}</li>
        <li>Crust: {pizza.crust}</li>
        <li>Price: {pizza.price} RON</li>
        <li>Size: {pizza.size}</li>
      </ul>
      <div className={styles.divContainer}>
        <BqButton
          type="button"
          appearance="primary"
          variant="danger"
          onClick={() => onDelete(pizza)}
        >
          Delete
        </BqButton>
        <BqButton type="button" size="medium" onClick={() => onEdit(pizza)}>
          Edit
        </BqButton>
      </div>
    </div>
  );
};

export default Card;
