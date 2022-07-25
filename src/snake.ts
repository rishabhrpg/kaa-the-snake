import { SnakeDirection } from "./keyboard-input.js";
import { Food } from './food.js';

export interface SnakePartType {
    x: number;
    y: number;
}

export interface SnakeType {
    snake: SnakePartType[];
}

export class Snake {

    public snakeType: SnakeType = {
        snake: []
    }

    public snakeDirection: SnakeDirection = { x: 0, y: 0 };

    public food = new Food();

    constructor() { 
        this.snakeType = {
            snake: [
                { x: 14, y: 14 },
            ]
        };

        this.food.generateFood();
    }

    public run(snakeDirection: SnakeDirection): Snake {
        this.snakeDirection = snakeDirection;
        console.log('Moving Snake');
        
        this.move(snakeDirection);

        if(this.checkCollisionWithFood(this.food)){
            this.render()
            return this;
        }
        if(this.checkCollisionWithWall() || this.checkCollisionWithSnake()) {
            debugger;
            alert('Game Over');
            this.reset();
            return this;
        }
        this.render();
        return this;
    }

    private eat(food: Food): void {
        this.snakeType.snake.push(food.foodType.food);
        this.food.generateFood();
    }

    private checkCollisionWithFood(food: Food): boolean {
        if(this.snakeType.snake[0].x === food.foodType.food.x && this.snakeType.snake[0].y === food.foodType.food.y) {
            this.eat(food);
            return true;
        }
        return false;
    }

    private checkCollisionWithSnake(): boolean {
        console.log('Checking Collision with Snake');
    
        for (let i = 1; i < this.snakeType.snake.length; i++) {
            console.log('Checking collision', this.snakeType.snake[0], this.snakeType.snake[i]);
            if (this.snakeType.snake[0].x === this.snakeType.snake[i].x && this.snakeType.snake[0].y === this.snakeType.snake[i].y) {                
                return true;
            }
        }
        return false;
    }

    private checkCollisionWithWall(): boolean {
        if(this.snakeType.snake[0].x < 0 || this.snakeType.snake[0].x > 18 || this.snakeType.snake[0].y < 0 || this.snakeType.snake[0].y > 18) {
            return true;
        }
        return false;
    }

    private move(snakeDirection: SnakeDirection) {        
        for (let i = this.snakeType.snake.length - 2; i >= 0; i--) {
            this.snakeType.snake[i + 1] = { ...this.snakeType.snake[i] };
        }
        // console.log(snakeDirection);

        const snakeHead = this.snakeType.snake[0];
        this.snakeType.snake[0] = { x: snakeHead.x +  snakeDirection.x, y: snakeHead.y + snakeDirection.y };        
    }

    private render(): void {
        const boardElement = document.querySelector('#board') as HTMLDivElement;
        boardElement.innerHTML = '';

        this.snakeType.snake.forEach((part, index) => {
            // console.log(part);
            const snakePartDivElement = document.createElement('div');
            snakePartDivElement.style.gridRowStart = part.y.toString();
            snakePartDivElement.style.gridColumnStart = part.x.toString();
            if (index === 0) {
                snakePartDivElement.classList.add('head');                
            } else {
                snakePartDivElement.classList.add('snake');
            }
            boardElement.appendChild(snakePartDivElement);
        });

        this.food.render();
    }

    private reset(): void {
        this.snakeType = {
            snake: [
                { x: 13, y: 14 },
            ]
        };
        
        this.snakeDirection = { x: 0, y: 0 };
        this.food.generateFood();
    }
}