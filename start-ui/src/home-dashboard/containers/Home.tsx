import { useState } from "react";
import usePizzas from "../../hooks/usePizzas";
import { AxiosError } from "../../services/api-client";
import pizzaService, { Pizza } from "../../services/pizza-service";
import FormContainer from "./FormContainer";
import Card from "../components/Card";
import { BqSpinner, BqSwitch } from "@bee-q/react";

const Home = () => {
  const { pizzas, error, isLoading, setPizzas, setError } = usePizzas();
  const [editedPizza, setEditedPizza] = useState<Pizza>();
  const [showForm, setShowForm] = useState(true);

  const editPizza = (pizza: Pizza) => {
    setEditedPizza(pizza);
  };

  const deletePizza = (pizza: Pizza) => {
    const originalPizzas = [...pizzas];
    setPizzas(pizzas.filter((p) => p.id !== pizza.id));
    pizzaService.delete(pizza.id).catch((err: AxiosError) => {
      setError(err.message);
      setPizzas(originalPizzas);
    });
  };

  const updatePizza = (pizza: Pizza) => {
    const originalPizzas = [...pizzas];
    setPizzas(pizzas.map((p) => (p.id === pizza.id ? pizza : p)));

    pizzaService.update<Pizza>(pizza).catch((err: AxiosError) => {
      setError(err.message);
      setPizzas(originalPizzas);
    });
    setEditedPizza(undefined);
  };

  return (
    <>
      <div>
        {isLoading && (
          <BqSpinner size="large" textPosition="right">
            Loading..
          </BqSpinner>
        )}
        {error && <p>{error}</p>}

        <BqSwitch
          inner-label="icon"
          justify-content="start"
          name="bq-switch"
          checked={showForm}
          onBqChange={() => setShowForm(!showForm)}
        >
          Show Form
        </BqSwitch>
        {showForm && (
          <FormContainer
            pizzas={pizzas}
            setPizzas={setPizzas}
            updatePizza={updatePizza}
            defaultValues={editedPizza}
          />
        )}

        <div className="w-full flex justify-center	">
          {pizzas.map((pizza) => (
            <Card
              key={pizza.id}
              pizza={pizza}
              onDelete={deletePizza}
              onEdit={editPizza}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
