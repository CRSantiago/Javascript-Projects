//BUDGET CONTROLLER
var budgetController = (function(){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function(type){
        var sum = 0;
        
        data.allItems[type].forEach(function(current, index, array){
            sum += current.value;
        });
        /*
        0
        [200,400,100]
        sum = 0 + 200
        sum = 200 + 400
        */
        data.totals[type] = sum;
    };
    
   var data = {
       allItems: {
           exp: [],
           inc: []
       },
       totals: {
           exp:0,
           inc:0 
       }, 
       budget:0, 
       percentage: -1
   };
   
   return{
       addItem: function(type, des, val){
           var newItem, ID;
           
           //Create new ID, ID = last ID + 1
           if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
           
           //this test is based of the value returned from the getInput function. which returns a type of inc or exp
           if (type === 'exp'){
                newItem = new Expense(ID, des, val);
           } else if (type === 'inc'){
               newItem = new Income(ID, des, val);
           }
           
           /*since our arrays within the data object also have the names inc and exp, we can use the type to push the new item into the respected array*/
           //Push it into our data structure
           data.allItems[type].push(newItem);
           
           //Return new element
           return newItem;
       },
       
       deleteItem: function (type, id){
           var ids, index;
           //id = 3
           //ids = [1,2,4,6,8]
           //index = 3
           
           //map also has access to current element, current index and entire array.
           //map returns brand new array
           //
           ids = data.allItems[type].map(function(current) {
              return current.id; 
           });
           
           //gets index of id passed into method
           index = ids.indexOf(id);
           
           if (index !== -1){
               //splice takes two arguments. the index to start deleting and the amount. In this case onluy one. 
              data.allItems[type].splice(index, 1); 
           }
           
       },
       
       calculateBudget: function(){
         
           // calculate total income and expenses
           calculateTotal('exp');
           calculateTotal('inc');
           
           //calculate the budget: income - expenses
           //retrieves totals from data structure
           data.budget = data.totals.inc - data.totals.exp;
           
           //calculate percentage of income spent
           if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
           } else {
               data.percentage = -1;
           }
           
       },
       
       calculatePercentages: function() {
           
           /*
           a = 20
           b = 10
           c = 40
           income = 100
           a = 20 / 100 = 20%
           b = 10 / 100 = 10%
           c = 40 / 100 = 40&
           */
           
           data.allItems.exp.forEach(function(cur){
               cur.calcPercentage(data.totals.inc);
           });
           
       },
       
       getPercentages: function() {
         var allPercentages = data.allItems.exp.map(function(cur){
            return  cur.getPercentage();
         });  
           return allPercentages;
       },
       
       getBudget: function(){
         return {
           budget:data.budget,
             totalInc: data.totals.inc,
             totalExp: data.totals.exp,
             percentage: data.percentage
             
         };  
       },
       
       // --- Local Storage stuff ---
        storeData: function() {
            localStorage.setItem('data', JSON.stringify(data));
        },

        deleteData: function() {
            localStorage.removeItem('data');
        },

        getStoredData: function() {
            localData = JSON.parse(localStorage.getItem('data'));
            return localData;
        },
        
        updateData: function(StoredData) {
            data.totals = StoredData.totals;
            data.budget = StoredData.budget;
            data.percentage = StoredData.percentage;
            
        },
        // --- Local Storage stuff END ---
       
       testing: function(){
           console.log(data);
       }
       
   };
    
})();

//UICONTROLLER
var UIController = (function(){
    
    //good practice to make class and id object values in case of UI change later. Makes transition smoother and avoids bugs.
    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer:'.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
        submitBtn: '.submit__btn'
    };
    
       var formatNumber = function(num, type) {
           var numSplit, int, decimal, type;
         /*
         + or - before number
         exact;y 2 decimal points
         comma seperateing the thousands
         
         2310.4567 -> + 2,310.46
         2000 -> + 2,000.00
         */  
           
           num = Math.abs(num);
           //tofixed rounds two decimals points. The parameter will equal the number of decimal spaces.
           //num variable is now a string
           num = num.toFixed(2);
           
           //split can be used because num is now a string
           numSplit = num.split('.');
           
           int = numSplit[0];
           
           if (int.length > 3) {
               //substr takes two parameters what index to start at and how many numbers to read. 
               int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3, 3); //inpit 2310, output 2,310
           }
           
           decimal = numSplit[1]
           
           return (type === 'exp' ? '-' : '+') + " " + int + '.' + decimal;
       };
    
        var nodeListForEach =  function(list, callback) {
               //this for loop gives us access to the list elements through calling the callback function. list[i] is the current index, and i the index. 
               for (var i = 0; i < list.length; i++) {
                   callback(list[i], i);
               }
           };
    
   return {
       getInput: function(){
           return{
               type: document.querySelector(DOMstring.inputType).value,// will be either inc or exp
               description: document.querySelector(DOMstring.inputDescription).value,
               value: parseFloat(document.querySelector(DOMstring.inputValue).value)
           };
       }, 
       
       addListItem: function(obj,  type){
           var html, newHTML, element; 
           
           //create HTML string with place holder text
           if (type === 'inc'){
               
               element = DOMstring.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'
               
           } else if (type === 'exp'){
           
               element = DOMstring.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'

           }
           
           //replace the placeholder text with actual data
           newHTML = html.replace('%id%', obj.id);
           newHTML = newHTML.replace('%description%', obj.description);
           newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
           
           //insert HTML into the DOM
           document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
       
       deleteListItem: function(selectorID){
           //to delete from UI, you can only delete a child
           var el = document.getElementById(selectorID);
           //gets parant of el then removes el
           el.parentNode.removeChild(el);
       },
       
       clearFields: function(){
           var fields, fieldsArr;
           
           //assigns field variable to input description and input value
            fields = document.querySelectorAll(DOMstring.inputDescription + ', ' + DOMstring.inputValue);  
           
           //converts list returned by queryslectorAll, into an array
           fieldsArr = Array.prototype.slice.call(fields);
           
           //loops through array to clear each field
           fieldsArr.forEach(function(current, index, array){
               //sets the field to empty
               current.value = "";
           });
           
           //sets focus to first eeleent of the array
           fieldsArr[0].focus();
       },
       
       displayBudget: function(obj){
           
           var type;
           obj.budget > 0 ? type = 'inc' : type = 'exp';
           
           document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(obj.budget, type);
           document.querySelector(DOMstring.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
           document.querySelector(DOMstring.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
           
           if(obj.percentage > 0){
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage + '%';
           } else {
                document.querySelector(DOMstring.percentageLabel).textContent = '---';
           }
           
       },
       
       displayPercentages: function(percentages) {
           
           //fields is an array based on all the nodes returned by queryslectorall
           var fields = document.querySelectorAll(DOMstring.expensesPercLabel);
           
           // this function calls a callback function. 
           nodeListForEach(fields, function(current, index) {
               if (percentages[index] > 0){
                current.textContent = percentages[index] + '%';
               } else {
                   current.textContent = '---';
               }
           });
           
       },
       
       displayMonth: function() {
         var now, month,months,year;
         
           now = new Date();
           
           months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
           month = now.getMonth();
           
           year = now.getFullYear();
           document.querySelector(DOMstring.dateLabel).textContent = months[month] + ' ' +year;
       },
       
       changedType: function() {
         var fields = document.querySelectorAll(
            DOMstring.inputType + ',' +
             DOMstring.inputDescription + ',' +
             DOMstring.inputValue);
             
           nodeListForEach(fields, function(cur){
              cur.classList.toggle('red-focus'); 
           });
           
           document.querySelector(DOMstring.inputBtn).classList.toggle('red');
       },
       
       //allows for DOMstring to be available to other controllers
       getDOMstrings: function(){
           return DOMstring;
       }
   };
    
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
         //variable to allow the DOMstring to be accessable
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
           if(event.keyCode === 13 || event.which === 13){
               ctrlAddItem();
           }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        
        //send data to database
        document.querySelector(DOM.submitBtn).addEventListener('click', function() {
            var storedData = budgetCtrl.getStoredData();
           axios.post('http://localhost:5000/post', {
               data: storedData
           }) 
            .then(function(res) {
               console.log('data was sent')
           })
            .catch(function(err) {
              console.log(err); 
           });
        });
        
    };  
    
    var loadData = function() {
        
        var storedData, newIncItem, newExpItem;

        // 1. load the data from the local storage
        storedData = budgetCtrl.getStoredData();

        if(storedData){
            // 2. insert the data into the data structure
            budgetCtrl.updateData(storedData);

            // 3. Create the Income Object
            storedData.allItems.inc.forEach(function(cur){
                newIncItem = budgetCtrl.addItem('inc', cur.description, cur.value)
                UICtrl.addListItem(newIncItem, 'inc');
            });           

            // 4. Create the Expense Objects
            storedData.allItems.exp.forEach(function(cur){
                newExpItem = budgetCtrl.addItem('exp', cur.description, cur.value)
                UICtrl.addListItem(newExpItem, 'exp');
            });

            // 5. Display the Budget
            budget = budgetCtrl.getBudget();
            UICtrl.displayBudget(budget);

            // 6. Display the Percentages
            updatePercentages();
        }
    };
    
    var updatePercentages = function(){
      //calculate percentage
        budgetCtrl.calculatePercentages();
        
        // 2. read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        //3. update ui with percentages
        UICtrl.displayPercentages(percentages);
    };
    
    var updateBudget = function(){
      
        //1. calcuate the budget
        budgetCtrl.calculateBudget();
        
        //2. return budget
        var budget = budgetCtrl.getBudget();
        
        //3. display nudget on UI
        UICtrl.displayBudget(budget);
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        
        //1. Get field input data
        input = UICtrl.getInput();

        //test that UI input was not blank. if this was not present. this user would be able to put empty values
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. calculate and update budget
            updateBudget();
            
            //6. calculate and update percentages
            updatePercentages();
            
            //7. save to local storage 
            budgetCtrl.storeData();
        }
    }
    
    var ctrlDeleteItem = function(event){
       var splitID, type, ID;
        //finds parent node of the event target, in this case the icon to delete
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID){
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            //1.delete item from data structure
            budgetCtrl.deleteItem(type, ID);
            
            //2. delete item from UI
            UICtrl.deleteListItem(itemID);
            
            //3. update and show new budget
            updateBudget();
            
            //4. calculate and update percentages
            updatePercentages();
            
            //5. save to local storage
            budgetCtrl.storeData();
        }
    };
    
    //returns init function to be called outside of controller function
    return {
        init:function(){
            console.log("Application has started");
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                 budget:0,
                 totalInc: 0,
                 totalExp: 0,
                 percentage: -1

             });
            setupEventListeners();
            loadData();
        }
    }
    
})(budgetController, UIController);

//function call to start application
controller.init();
