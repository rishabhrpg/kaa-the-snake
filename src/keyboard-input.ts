export interface SnakeDirection {
    x: number;
    y: number;
}

export class KeyboardInput {
    public registerKeyboardInput( snakeDirection: (snakeDirection: SnakeDirection) => void ): void {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    console.log('ArrowUp');
                    snakeDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    console.log('ArrowDown');
                    snakeDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    console.log('ArrowLeft');
                    snakeDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    console.log('ArrowRight');
                    snakeDirection({ x: 1, y: 0 });
                    break;
                default:
            }
        });
    }
}