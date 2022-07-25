import { Snake } from './snake.js';
import { KeyboardInput, SnakeDirection } from './keyboard-input.js';


export class SnakeGame {

    private lastRenderTimestamp = 0;
    private speed = 10;
    public fps = 0;
    public totalFrames = 0;
    private fpsCounterElement = document.querySelector('#fps_counter') as HTMLDivElement;
    public snake = new Snake();
    public snakeDirection : SnakeDirection = { x: 0, y: 0 };

    private gameLoop(timestamp: number) {              
        
        window.requestAnimationFrame((ctime) => this.gameLoop(ctime));

        if((timestamp/1000) > this.lastRenderTimestamp + 1/this.speed) {
            const snake = this.snake.run(this.snakeDirection);     
            this.snakeDirection = snake.snakeDirection;
            // console.log(timestamp);        
            this.lastRenderTimestamp = timestamp/1000;
            this.fpsUpdater(timestamp);            
        }
   
    }

    public start() {
        new KeyboardInput().registerKeyboardInput((snakeDirection) => { 
            this.snakeDirection = snakeDirection;
        });        
        window.requestAnimationFrame((ctime) => this.gameLoop(ctime));
    }  
    
    private fpsUpdater(timestamp: number) {
        this.totalFrames++;
        this.fps = this.totalFrames / (timestamp/1000);                        
        this.fpsCounterElement.innerHTML = `FPS ${this.fps.toFixed(2)}`;
    }
}