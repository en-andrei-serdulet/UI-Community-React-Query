import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

let pizzas = [
  {
    id: 1, 
    name: "Margherita", 
    ingredients: "Tomato, mozzarella, basil", 
    crust: "Thin", 
    price: 24, 
    size: "large",
  },
  { 
    id: 2, 
    name: "Pepperoni", 
    ingredients: "Tomato, mozzarella, pepperoni", 
    crust: "Regular", 
    price: 20, 
    size: "small",
  },
  {
    id: 3, 
    name: "Fluffy Deluxe", 
    ingredients: "Tomato, mozzarella, ham", 
    crust: "Fluffy", 
    price: 15, 
    size: "medium",
  },
];

const router = new Router();

router
  .get("/pizzas", (context) => {
    context.response.body = pizzas;
  })
  .get("/pizzas/:id", (context) => {
    if (context.params && context.params.id && pizzas.find((pizza) => pizza.id === context.params.id)) {
      context.response.body = pizzas.find((pizza) => pizza.id === context.params.id);
    } else {
      context.response.status = 404;
      context.response.body = { error: "Pizza not found" };
    }
  })
  .post("/pizzas", async (context) => {
    if (!context.request.hasBody) {
      context.throw(400, "Bad Request");
    }
  
    const body = context.request.body();
    if (body.type !== "json") {
      context.throw(400, "Invalid Body");
    }
  
    let newPizza = await body.value;
  
    newPizza.id = pizzas.length + 1;
  
    pizzas = [...pizzas, newPizza]
    context.response.body = newPizza;
    context.response.status = 201;
  })
  
  .delete("/pizzas/:id", (context) => {
    if (context.params && context.params.id) {

      const id = Number(context.params.id); 
      const index = pizzas.findIndex((pizza) => pizza.id === id); 
      if (index !== -1) {
        pizzas.splice(index, 1);
        context.response.status = 200;
        context.response.body = { message: "Pizza deleted successfully" };
      } else {
        context.response.status = 404;
        context.response.body = { error: "Pizza not found" };
      }
    }
  })
  .put("/pizzas/:id", async (context) => {
    if (context.params && context.params.id) {
            const id = Number(context.params.id);
      const index = pizzas.findIndex((pizza) => pizza.id === id);
      if (index !== -1) {
        const { value } = await context.request.body();
        const updatedPizza = value;
        switch (updatedPizza.crust) {
          case "Thin":
            updatedPizza.sizes = ["small", "medium", "large", "extra super large"];
            break;
          case "Regular":
            updatedPizza.sizes = ["medium", "large"];
            break;
          case "Fluffy":
            updatedPizza.sizes = ["small", "medium"];
            break;
          default:
            updatedPizza.sizes = [];
        }
        pizzas[index] = { ...pizzas[index], ...updatedPizza };
        context.response.body = pizzas[index];
        context.response.status = 200;
      } else {
        context.response.status = 404;
        context.response.body = { error: "Pizza not found" };
      }
    }
  })
  .get("/sizes/:crust", (context) => {
    if (context.params && context.params.crust) {
      let sizes: string[] = [];
      switch (context.params.crust) {
        case "Thin":
          sizes = ["small", "medium", "large", "extra super large"];
          break;
        case "Regular":
          sizes = ["medium", "large"];
          break;
        case "Fluffy":
          sizes = ["small", "medium"];
          break;
        default:
          sizes = [];
      }
      context.response.body = sizes;
    } else {
      context.response.status = 400;
      context.response.body = { error: "Invalid crust type" };
    }
  });

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Running on http://localhost:8000");
await app.listen({ port: 8000 });