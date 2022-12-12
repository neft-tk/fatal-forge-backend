const Card = require('./Card');

const grid = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
]

class Grid {
    constructor(size = 3){
        this.size = size;
        this.slots = Array(size*size).fill(null);
        this.grid = Array(size).fill(null);
        for (let i = 0; i < size; i++){
            this.grid[i] = Array(size).fill(null);
        }
        let count = 0;

        for (let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                console.log(i,j,count)
                this.grid[i][j] = count;
                count++;
            }
        }
        console.log(this.grid);
        // this.grid = Array(size).fill(Array(size).fill(null));
        // this.size = size;
        this.prevNeighbors = [];
    }

    PlaceCard(card, index){
        this.slots[index] = new Card(card.name, card.compass,card.faction);
        console.table(this.slots);
        this.prevNeighbors = [];
        const changes = this.Battle(this.GetCard(index), index);
        return changes;
    }

    Battle(offensiveCard, offensiveIndex){

        const closeEnemies = this.FindEnemyNeighbors(offensiveIndex);

        let changes = [];

        for (let i = 0; i < closeEnemies.length; i++){

            const {card, defSide, index} = closeEnemies[i];

            if (changes.some(change => change.index == index)){
                continue;
            }
            const defend = card.Defend(offensiveCard, defSide)
            if (!defend){
                card.faction = offensiveCard.faction;
                changes.push({
                    index: index,
                    toFaction: offensiveCard.faction,
                    defSide: defSide
                })
                this.prevNeighbors.push(card);
                
                const chain = this.Battle(card, index)
                changes = [...changes, ...chain]
            }
        }
        return changes;
    }

    GetCard(index){
        return this.slots[index];
    }

    GetCoordinates(index){
        for (let i = 0; i < this.size; i ++){
            for (let j = 0; j < this.size; j++){
                if (this.grid[i][j] == index){
                    return [i,j]
                }
            }
        }
        return `index ${index} out of range`
    }

    GetAtCoordinates(i,j){
        if (this.WithinBounds(i) && this.WithinBounds(j)){
            const index = this.grid[i][j];
            return this.slots[index];
        }
        return null;
    }

    WithinBounds(num){
        return num >= 0 && num <this.size;
    }

    FindEnemyNeighbors(index){
        const activeCard = this.slots[index];
        
        const coords = this.GetCoordinates(index);
        console.log(coords);
        const neighbors = [];

        const ii = coords[0];
        const jj = coords[1];

        for (let i = 0; i < this.size; i ++){
            for (let j = 0; j < this.size; j++){
                
                if (i == ii){

                    if (j == jj - 1){
                        const nIndex= this.grid[i][jj - 1];
                        const card = this.slots[nIndex];

                        if (card && !this.prevNeighbors.some(x=>x.index == nIndex)){
                            neighbors.push({
                                index: nIndex,
                                defSide: "right",
                                card: card
                            });
                        }
                    }
                    if (j == coords[1] + 1){
                        const nIndex = this.grid[i][jj + 1];
                        const card = this.slots[nIndex];
                        if (card  && !this.prevNeighbors.some(x=>x.index == nIndex)){
                            neighbors.push({
                                index: nIndex,
                                defSide: "left",
                                card: card
                            });
                        }
                    }
                }else if (j == jj){

                    if (i == coords[0] - 1){
                        const nIndex = this.grid[ii - 1][j];
                        const card = this.slots[nIndex];
                        if (card  && !this.prevNeighbors.some(x=>x.index == nIndex)){
                            neighbors.push({
                                index: nIndex,
                                defSide: "bottom",
                                card: card
                            });
                        }
                    }
                    if (i == coords[0] + 1){
                        const nIndex = this.grid[ii + 1][j];
                        const card = this.slots[nIndex];
                        if (card  && !this.prevNeighbors.some(x=>x.index == nIndex)){
                            neighbors.push({
                                index: nIndex,
                                defSide: "top",
                                card: card
                            });
                        }
                    }
                }
            }
        }
        const onlyEnemies= neighbors.filter(n=>n.card.faction != activeCard.faction);
        console.table(onlyEnemies);
        return onlyEnemies;
    }

}

module.exports = Grid;