export interface FoodType {
    food  : { x: number, y: number };
}

export class Food {
    public foodType: FoodType = {
        food: { x: 1, y: 1 }
    }
    constructor() {
        this.foodType = {
            food: { x: 16, y: 1 }
        }
    }
    public generateFood(): Food {        
        this.foodType.food = {
            x: Math.floor(Math.random() * 18),
            y: Math.floor(Math.random() * 18)
        }
        if(this.foodType.food.x === 0 || this.foodType.food.y === 0 ){
           this.foodType = this.generateFood().foodType;            
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