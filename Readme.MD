# About
JAS - JeromeJerfin Abhishek SivaShereen compiler.

The JAS compiler is used to compile the JAS language and produce a suitable output. It uses different kinds of declaration and control statements which is run through the JS engine. The JS engine converts the JAS code into JavaScript and executes it in return. The fun feature of this compiler is that it throws user-friendly errors. Here, the input given to the JAS code is a JAS file. The JAS file has the code to perform calculations replicating a calculator.

# Installation 

```
npm i jas-compiler
```

# Usage

```
node JasCompiler.js calc.jas --file[option] Abhisek[option]
```

# Features

- User-friendly errors with username.
- Arithmetic calculations.
- Conditional statement - choice 

# Options

## --file
This option gives an Java script(.js) output file
## username 
Error shown with the username
# Language

## Variables

Syntax 

Variable

```
# a = 10;
```

Constant variable
```
## b = 10;
```

## Function

```
Fn add(a,b)
{
  show(a+b);
}
add(a,b);
```

## Choice

```
choice(a)
{
    option 'add':
    add(num1,num2)
    stop;
}
```
## Tokenizer

```
#a = 10
```

```
[
  { type: 'keyword', value: '#' },
  { type: 'identifier', value: 'a' },
  { type: 'operator', value: '=' },
  { type: 'number', value: '10' }
]  
```


