export interface FoodType {
    food  : { x: number, y: number };
}

export class Food {
    public foodType: FoodType = {
        food: { x: 0, y: 0 }
    }
    constructor() {
        this.foodType = {
            food: { x: 16, y: 0 }
        }
    }
    public generateFood(): Food {        
        this.foodType.food = {
            x: Math.floor(Math.random() * 18),
            y: Math.floor(Math.random() * 18)
        }
        console.log(' New Food spawned at: ', this.foodType.food);
        return this;
    }
    public render(): void {        
        const boardElement = document.querySelector('#board') as HTMLDivElement;
        const foodDivElement = document.createElement('div');
        foodDivElement.style.gridRowStart = this.foodType.food.y.toString();
        foodDivElement.style.gridColumnStart = this.foodType.food.x.toString();
        foodDivElement.classList.add('food');        
        boardElement.appendChild(foodDivElement);
    }
}