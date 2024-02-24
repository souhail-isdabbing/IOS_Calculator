//DOM Elements
var numbers= document.getElementsByClassName('button num');
var AC=document.getElementById('AC')
var dot = document.getElementById('a.')
var multiplication= document.getElementById('ax')
var division=document.getElementById('ad')
var minus=document.getElementById('am')
var plus=document.getElementById('ap')
var equal=document.getElementById('ae')
var Display = document.getElementsByClassName("display");
var input = document.getElementById('area');
var negative_button=document.getElementById('at')
var Percent_button=document.getElementById('apr')

//Error Class Declaration
class DuplicateError {
    constructor(message) {
      this.name = "Error"; 
    }
}
class MathError {
    constructor(message) {
      this.name = "Error"; 
    }
}
class PercentageError {
    constructor(message) {
      this.name = "Error"; 
    }
}

//Function that handles number input (integers and decimals)
function NumberClickin(){
    //Function for digit input
    function Number_input(){
        for (let i=0; i<numbers.length;i++){
        numbers[i].addEventListener('click',function(){
        input.value=input.value+numbers[i].innerHTML
        })
    }}

    Number_input()
    //Making the AC button clear the input area
    AC.addEventListener('click',function(){
        input.value=''
    })
    //Making the dot button input '.' in the input area
    dot.addEventListener('click',function(){
        input.value=input.value+'.'     
    })
}

//function that handle operator input
function NumberProcessin(){
    multiplication.addEventListener('click',function (){
        input.value+='×'   
    });
    division.addEventListener('click',function (){
            input.value+='÷'     
    });
    minus.addEventListener('click',function (){
        input.value+='-'
    });
    plus.addEventListener('click',function (){
        input.value+='+'});
    negative_button.addEventListener('click',function(){
        var ops=['*','/','%']
        //Function that makes so that the negative button only works when there's a number that isn't followed by an operator
        function checkop(){
        for (i=0;i<ops.length;i++){
            if (input.value.includes(ops[i])){
                return 1
            }}
        if (input.value.includes('+') && input.value.charAt(0)!=='+'){
            return 1
        }
        if (input.value.includes('-') && input.value.charAt(0)!=='-'){
            return 1
        }}
        
        if (checkop()===1){
            input.value=''
            alert('syntax error')
        }else{
            input.value=+input.value*-1
        }
    
    });
    Percent_button.addEventListener('click',function(){
        input.value+='%'
    });
    equal.addEventListener('click',function equal(){
        //Function that catches syntax errors
        function syntax(){
            let divindex=input.value.indexOf('÷')
            let operators=['+','-','÷','×']
            //block that catches operator duplication like '**'
            for (i=0;i<operators.length;i++){
                let opindexs=input.value.indexOf(operators[i])
                if (input.value.charAt(opindexs+1)===operators[i]){
                    throw new DuplicateError('duplicate error')
                }}
            //Block that converts operator symbols into standard javascript operators
            if(input.value.includes('×')){
                input.value=input.value.replace(/([×])/g,'*')
            }
            //block that handles division by zero
            if(input.value.includes('÷')){if(input.value.slice(divindex+1)==='0'){
                console.log(divindex+1)
                throw new MathError('math error');
            }else{input.value=input.value.replace(/([÷])/g,'/')}}        
        }
        //function that turns percentage symbol into '*0.01' and throws an error whenever a digit is after %
        function percentage(){
            
            if(input.value.includes('%')){
                if(input.value.match(/%(\d)/g)){
                    throw new SyntaxError('syntax error')
                }else if(input.value.match(/[+,\-,/,*]+%/g)){
                    throw new SyntaxError('syntax error')
                }else{
                    input.value=input.value.replace(/([%])/g,'*0.01');
                }
            }
        }
        //Error handling
        try{syntax();percentage();input.value=eval(input.value)}
        catch(error){
            if (error instanceof MathError){
                input.value=''
                alert('matherror')
            } else if (error instanceof DuplicateError){
                input.value=''
                alert('duplicate error')
            } else if (error instanceof SyntaxError){
                input.value=''
                alert('syntax error')
            } else if (error instanceof PercentageError){
                input.value=''
                alert('percentage error')
            }}
        
        
        
    });
    

}

//Function that eliminates keyboard input
function preventKeyboardInput(event) {
    event.preventDefault();
}
NumberClickin()
NumberProcessin()