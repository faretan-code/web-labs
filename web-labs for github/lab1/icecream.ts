function calculateIceCreamCost(size: string, toppings: string[], addMarshmallow: boolean = false): number {
    let basePrice = size === "large" ? 25 : 10;

    let toppingsCost = 0;
    toppings.forEach(topping => {
        switch(topping.trim().toLowerCase()) {
            case "chocolate":
                toppingsCost += 5;
                break;
            case "caramel":
                toppingsCost += 6;
                break;
            case "berries":
                toppingsCost += 10;
                break;
            default:
                console.log(`Topping "${topping}" is not recognized and won't be added to the cost.`);
                break;
        }
    });

    if (addMarshmallow) {
        toppingsCost += 5;
    }

    return basePrice + toppingsCost;
}

// Пример использования функции:
const size = prompt("Choose size (small or large):") || "small";
const toppingsInput = prompt("Choose toppings (comma separated):") || "";
const toppings = toppingsInput.split(",").map(t => t.trim().toLowerCase());
const addMarshmallow = confirm("Would you like to add marshmallow?");

const totalCost = calculateIceCreamCost(size, toppings, addMarshmallow);
console.log(`The total cost of your ice cream is: ${totalCost} UAH`);
