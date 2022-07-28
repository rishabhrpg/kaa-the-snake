import { Snake } from './snake.js';
import { KeyboardInput, SnakeDirection } from './keyboard-input.js';

export class SnakeGame {

    private lastRenderTimestamp = 0;
    private speed = 7;
    public fps = 0;
    public totalFrames = 0;
    private fpsCounterElement = document.querySelector('#fps_counter') as HTMLDivElement;
    public snake = new Snake();
    public snakeDirection: SnakeDirection = { x: 0, y: 0 };

    public keyboardEventController = {
        previousInputTimestamp: 0,
        currentTimestamp: 0,
    }

    private gameLoop(timestamp: number) {

        window.requestAnimationFrame((ctime) => this.gameLoop(ctime));
        this.keyboardEventController.currentTimestamp = timestamp;

        if ((timestamp / 1000) > this.lastRenderTimestamp + 1 / this.speed) {
            const snake = this.snake.run(this.snakeDirection);
            this.snakeDirection = snake.snakeDirection;
            // console.log(timestamp);        
            this.lastRenderTimestamp = timestamp / 1000;
            this.fpsUpdater(timestamp);
        }

    }

    public start() {
        new KeyboardInput().registerKeyboardInput((snakeDirection) => {
            if (this.keyboardEventController.currentTimestamp < this.keyboardEventController.previousInputTimestamp + 75) {
                return;
            }
            this.keyboardEventController.previousInputTimestamp = this.keyboardEventController.currentTimestamp;
            this.snakeDirection = this.attemptNewSnakeDirection(this.snakeDirection, snakeDirection);
        });

        // this.highScore.setHighScore(100);
        window.requestAnimationFrame((ctime) => this.gameLoop(ctime));
    }

    private fpsUpdater(timestamp: number) {
        this.totalFrames++;
        this.fps = this.totalFrames / (timestamp / 1000);
        this.fpsCounterElement.innerHTML = `FPS ${this.fps.toFixed(2)}`;
    }


    private attemptNewSnakeDirection(
        currentSnakeDirection: SnakeDirection,
        inputSnakeDirection: SnakeDirection
    ): SnakeDirection {
        console.log(currentSnakeDirection, inputSnakeDirection);

        if (this.compareCurrentDirection(currentSnakeDirection, inputSnakeDirection)) {
            return inputSnakeDirection;
        }

        return currentSnakeDirection;
    }

    compareCurrentDirection(currentSnakeDirection: SnakeDirection, inputSnakeDirection: SnakeDirection): boolean {
        return currentSnakeDirection.x + inputSnakeDirection.x !== 0 || currentSnakeDirection.y + inputSnakeDirection.y !== 0;
    }
}