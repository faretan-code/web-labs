function calculateIceCreamCost(size, toppings, addMarshmallow) {
    if (addMarshmallow === void 0) { addMarshmallow = false; }
    var basePrice = size === "large" ? 25 : 10;
    var toppingsCost = 0;
    toppings.forEach(function (topping) {
        switch (topping.trim().toLowerCase()) {
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
                console.log("Topping \"".concat(topping, "\" is not recognized and won't be added to the cost."));
                break;
        }
    });
    if (addMarshmallow) {
        toppingsCost += 5;
    }
    return basePrice + toppingsCost;
}
// Пример использования функции:
var size = prompt("Choose size (small or large):") || "small";
var toppingsInput = prompt("Choose toppings (comma separated):") || "";
var toppings = toppingsInput.split(",").map(function (t) { return t.trim().toLowerCase(); });
var addMarshmallow = confirm("Would you like to add marshmallow?");
var totalCost = calculateIceCreamCost(size, toppings, addMarshmallow);
console.log("The total cost of your ice cream is: ".concat(totalCost, " UAH"));
