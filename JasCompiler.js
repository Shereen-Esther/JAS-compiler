const fs = require('fs');
const { exit } = require('process');
const keywords = ['#','##','Fn','show','option','stop','choice'];
let space = / /g;
let numbers = /^[0-9]+$/;
let letter = /[a-zA-Z]/
let symbols = /[\(\):|{|}|,|'|;|]/
let operators = /#|[+-/\*=%]/
let input = '';
let user = '';



if(process.argv[4])
{
  user = process.argv[4];
}
else
{
  user = 'dude'
}


if(process.argv[2])
{
  input = fs.readFileSync(process.argv[2], 'utf8');
}
else
{
  console.error('Need a input JAS file 📄 dude!')
  exit;
}


let current = 0;

let tokenizer = (input) =>{
let tokens = []
while(current<input.length)
{
    let temp = input[current];
   
    if(symbols.test(temp))
    {  
        tokens.push({
          type :  'symbol',
          value :   temp
        });
        current++;
    }

    else if (space.test(temp))
    {
     current++;
     continue;
    }
  
    else if(numbers.test(temp))
    {
      
        let val = '';
        while(numbers.test(temp))
        {
            val += temp;
            temp = input[++current];
        }
        tokens.push({
            type : 'number',
            value : val
        });
        continue;
      
    }

    else if(letter.test(temp))
    {
       let val = '';
      while(letter.test(temp))
      {
          val += temp;
          temp = input[++current];
      }

      let type = (keywords.includes(val)) ? "keyword" : "identifier";
      tokens.push({
          type ,
          value : val
      });
      continue;
    }
 
    else if(operators.test(temp))
    { 
      let val = '';
      while(operators.test(temp))
      {
          val += temp;
          temp = input[++current];
      }
      tokens.push({
          type : (keywords.includes(val)) ? "keyword" : "operator",
          value : val
      });
      continue;
    }
    else{
     if(temp=='')
     continue;
     
   
    }

  current++
}

return tokens ;
}


let arr = tokenizer(input);


let arr2 =[];
let variables = [];
const jsKeywords = ['let','const','function','console.log','case','break','switch'];

for(let i =0 ; i<arr.length;i++)
{ 

  if(arr[i]["type"]=="identifier")
  {
    if(jsKeywords.includes(arr[i]["value"]))
    {
      console.error("💥 Error: We don't use js  😜",{remove:arr[i]["value"]});
      exit;
    }
  }



 if(arr[i]["type"]=="keyword")
 {
   if(['#','##'].includes(arr[i]['value']) && arr[i+1]['type']=='identifier' )
   {
    if(!variables.includes(`${arr[i]['value']+arr[i+1]['value']}`)  ) {
        if(! (variables.includes(`##${arr[i+1]['value']}`) || variables.includes(`#${arr[i+1]['value']}`)) )
         variables.push(`${arr[i]['value']+arr[i+1]['value']}`)
         else
         {
          console.error(`❌ Error:${arr[i]['value']+arr[i+1]['value']} was already declared ${user}! ` )

          exit;
         }
    }
    else
    {
      console.error(`❌ Error:${arr[i]['value']+arr[i+1]['value']} const can't re-declare ${user}! ` )
       exit;
    }    
    
   }
   
 }

  
  if(arr[i]["type"]=="symbol")
  {
    
    if(['(',')','{','}'].includes(arr[i]["value"]))
    {
      arr2.push(arr[i]["value"])
    }
  }
}
let s = '';
for(let i=0;i<arr2.length;i++)s += arr2[i];

//balancing parentheses
var map = {
  '(': ')',
  '[': ']',
  '{': '}'
}
var isValid = (s) =>
{
var stack = [];

  for (var i = 0; i < s.length; i++) {
    var item = s[i];
 
      if (map[item]) {
    
        stack.push(map[item]);
      } 
      else {
      if (item !== stack.pop()) {
     
        return false;
      }
    }
  }

  return stack.length === 0;
}

if(!isValid(s))
{
    console.error(`💥 Error: Hy ${user}! kindly check the Parenthesis ",{check:'{}()'}`);
    exit;
}


for(let i=0;i<keywords.length;i++)
{
  if(keywords[i]=='#')
    input = input.replace(keywords[i],jsKeywords[i]);
  else
  input = input.replaceAll(keywords[i],jsKeywords[i]);
}

if(process.argv[3]=='--file')
{
   let output = fs.createWriteStream('output.js')
   output.write(input)
   output.end(); 
}
let F =new Function (input);
   return(F()); 

  
