var john = {
    
    fullName: "John Smith",
    johnBills: [124, 48, 268, 180, 42],
    tipCalc: function (){
        
        this.allTips = [];
        this.finalValues = [];
        
        for (var i = 0; i < this.johnBills.length; i++ ){
            
            //determine percentage based on tipping rules
            var percentage;
            var bill = this.johnBills[i];
            
            if (bill < 50 ){
                percentage = .2;
            } else if (bill >= 50 && bill < 200){
               percentage =  .15;
            } else if (bill > 200){
                percentage = .1;
            }
            
            // add result to the corresponding array
            this.allTips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
        
    }
    
    
}

var mark = {
    
    fullName: "Mark Miller",
    markBills: [77, 475, 110, 45],
    tipCalc: function (){
        
        this.allTips = [];
        this.finalValues = [];
        
        for (var i = 0; i < this.markBills.length; i++ ){
            
            //determine percentage based on tipping rules
            var percentage;
            var bill = this.markBills[i];
            
            if (bill < 100 ){
                percentage = .2;
            } else if (bill >= 100 && bill < 300){
               percentage =  .10;
            } else if (bill > 300){
                percentage = .25;
            }
            
            // add result to the corresponding array
            this.allTips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
        
    }
    
}

function calcAverage(allTips){
    var sum = 0;
    
    for (var i = 0; i < allTips.length; i++){
        sum = sum + allTips[i];
    }
    
    return sum / allTips.length;
}

//do calculations
john.tipCalc();
mark.tipCalc();
john.average = calcAverage(john.allTips);
mark.average = calcAverage(mark.allTips);

console.log(john,mark);

if (john.average > mark.average) {
    console.log(john.fullName + '\'s family pays higher tips, with an average of $' + john.average);
} else if (mark.average > john.average) {
    console.log(mark.fullName + '\'s family pays higher tips, with an average of $' + mark.average);
}
