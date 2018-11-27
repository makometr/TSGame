export class LevelsStorageManager {
    fileName: string;
    levelsNumber: number;
    levels: LevelData[];

	constructor(){
        this.fileName = "";
        this.levelsNumber = 3;
        this.levels = [];
        this.load();
    }
    
    load() {
        console.log("Loading levels");
        // levels are loading in array in order: 1_level -> [0], 2_level -> [1], ...
        try {
            for (let i: number = 0; i < this.levelsNumber; i++){
                this.fileName = `level_${i+1}.json`;
                let fileData:LevelData = require(`./game_levels/${this.fileName}`);
                console.log("Loaded level:", fileData);   
                this.levels[i] = fileData;
            }   
		} 
		catch(e){
			console.log(e.name, e.message);
			console.log(`CRITICAL_ERROR: No "${this.fileName}" file on server in /game_levels`);
		}
    }
    
    getLevel(number: number): LevelData | null {
        if (number > this.levelsNumber || number < 1){
            console.log("Get incorrect level number!");
            return null;
        }
        return this.levels[number-1];
    }
}