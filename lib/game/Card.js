class Card {
    constructor(name, compass, faction, imagePath){
        this.name = name;
        this.compass = compass;
        this.faction = faction;
        this.imagePath = imagePath;
    }

    GetTop(){ return this.compass[0];}
    GetRight(){return this.compass[1];}
    GetBottom(){return this.compass[2];}
    GetLeft(){return this.compass[3];}

    Defend(card, fromSide){
        switch(fromSide){
            case "left":
                return this.GetLeft() >= card.GetRight();
            case "right":
                return this.GetRight() >= card.GetLeft();
            case "bottom":
                return this.GetBottom() >= card.GetTop();
            case "top":
                return this.GetTop() >= card.GetBottom();
        }
    }
}

module.exports = Card;