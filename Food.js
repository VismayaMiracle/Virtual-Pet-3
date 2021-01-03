class Food{
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("images/Milk.png");
    }
    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(food){
        this.foodStock = food;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }

    bedroom(){
        background(bedroomImg,550,500)
    }
    garden(){
        background(gardenImg,550,500)
    }
washroom(){
    background(washroom,550,500)


}



  
    display(){
        background(46,139,87)


        fill(255,255,254)
        textSize(15)
        if(lastFed>=12){
            text("Last Feed :"+ lastFed%12+"PM",350,63);
          
          }else if(lastFed==0){
            text("Last Feed : 12AM", 415,63)
          }else{
            text("Last Feed :" +lastFed + "AM", 415,63);
          }

        var x=80,y=100;

        imageMode(CENTER);
        // image(this.image,720,220,70,70);

        if(this.foodStock!==0){
            for(var i=0; i<this.foodStock;i = i+1){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30
            }
        }
    }
        bedroom(){
            background(bedroom,550,500);
        }
        garden(){
            background(garden,550,500);
        }
        washroom(){
             background(washroom,550,500)
        }
       
    }

