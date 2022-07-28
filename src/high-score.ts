export class HighScore {

    constructor() {
        this.loadHighScore();
    }

    private loadHighScore(): void {
        const highScore = localStorage.getItem('highScore');
        if(highScore){
            this.highScore = parseInt(highScore);
        }
    }

    public highScore: number = 0;
    
    public setHighScore(score: number): HighScore {
        if(score > this.highScore){
            this.highScore = score;
            localStorage.setItem('highScore', score.toString());
        }
        return this;
    }

    public getHighScore(): number {
        return this.highScore;
    }

    public render(){
        const highScoreElement = document.querySelector('.high-score') as HTMLDivElement;
        highScoreElement.innerHTML = `High Score: ${this.highScore}`;
    }
}