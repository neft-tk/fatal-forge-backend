const Card = require('./Card');

const grid = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
]

class Grid {
    constructor(size = 3){
        this.slots = Array(9).fill(null);
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
        for (let i = 0; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if (grid[i][j] == index){
                    return [i,j]
                }
            }
        }
        return `index ${index} out of range`
    }

    GetAtCoordinates(i,j){
        if (this.WithinBounds(i) && this.WithinBounds(j)){
            const index = grid[i][j];
            return this.slots[index];
        }
        return null;
    }

    WithinBounds(num){
        return num >= 0 && num <3;
    }

    FindEnemyNeighbors(index){
        const activeCard = this.slots[index];
        
        const coords = this.GetCoordinates(index);
        console.log(coords);
        const neighbors = [];

        const ii = coords[0];
        const jj = coords[1];

        for (let i = 0; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                
                if (i == ii){

                    if (j == jj - 1){
                        const nIndex= grid[i][jj - 1];
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
                        const nIndex = grid[i][jj + 1];
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
                        const nIndex = grid[ii - 1][j];
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
                        const nIndex = grid[ii + 1][j];
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
        const onlyEnemies= neighbors.filter(card=>card.faction != activeCard.faction);
        this.prevNeighbors = [...neighbors]
        console.table(onlyEnemies);
        return onlyEnemies;
    }

}

module.exports = Grid;