# modgen.js

Stack
* Typescript (https://www.typescriptlang.org/)
* Next.js (https://nextjs.org/)
* Tailwind (https://tailwindcss.com/)
* React Query (https://tanstack.com/query/v3/)
* Zustand (https://github.com/pmndrs/zustand)
* Prompt Engineering (https://www.pinecone.io/learn/series/langchain/langchain-prompt-templates/)
* Open AI API (https://www.npmjs.com/package/openai)

## ModGen.js

ModGen.js it's a web tool for code generation. It uses GPT to process the user's input and examples. The examples are provided to train GPT, this improves the returned results. This technique is called "few shots learning", this provides GPT with some understanding of what type of code the user wants, and if enough examples are provided, GPT can return similar structured code based on the examples.
The goal is to first register a couple of examples (examples are composed of 1 input and 1 result) and then, send the code snippet you want GPT to grab data from. Resulting on the return of a similar response to the results you registered, but with the data, structures and patterns of the last input.
![DemostracionModGen js ‐ Hecho con Clipchamp](https://github.com/unosquare/modgen.js/assets/99301366/aa5112f7-a4eb-4913-9d58-f8566fd372c6)

### Usage

## Mode: Example and request
As described in the past section, you must first write/copy and paste/obtain at least a couple of examples similar to the code you are trying to generate. As the name implies, you must be in example mode to input your examples. Examples are composed of; 1) a model: this input is the "first" part of your examples, is usually the code you are trying to get the data from, example:

```const numbers = [1,2,3];```

This array has some data you would probably want to pass to a structure, another array, etc.

This is your; 2) result, the "second" part of your example:

```
const arrTwo = {
    "number": numbers[2],
    "number": numbers[1],
    "number": numbers[0],
};
```
This is a very simple example. Still you can notice the result is dependant of the input. This is exactly the "grabbing" of data, the result obtains and adapts the information based on the model, let it be and example or your final model. For you to input your final model you must be in request mode, indicating GPT that code is the one you are trying to generate a result from. GPT knows what code to output thanks to the examples that showed it how to process your last model.

So... if you were to provide this code ```const fruits = ['banana', 'orange', 'apple']``` as your last model, the result would be: 
```
const fruitsTwo = {
    "fruit": fruits[2],
    "fruit": fruits[1],
    "fruit": fruits[0],
};
```

## Mode: Review
New feature! This feature aims to focus the model to review code and improve it.
This mode does not need examples or requests, the usage it's the same as if you were in ChatGPT: You have an area to input your text/code, this is the model textarea. The Result textarea is locked as you dont need it to make a review request. This area is used just to output the returned code from GPT, which depends what type of code you have inputted. 
If you code is faulty or wrong, GPT will try to improve and make it functional by chaging or removing lines, if its good and works and you are just trying to optimize it or just make it better GPT will do this too, by making changes to your already working code. Most of the times for every change it made it will write a code comment in the line above where the change was made, explaning with a few words what change was made and sometimes what was the reason for the change.
This mode has a different prompt which tries to instruct the model to review the code and make the appropiate changes, it does not need examples and the only requirement is the code you are trying to fix or improve. 

### Limitations
While the purpose of this project is to create a tool that can return correct code 100% of the time, unfortunatly it is completly possible that GPT returns an error message or incorrect code, sometimes this is because not enough examples were provided for GPT to completely adapt or "understand" the code you provided. Right now you must provide at least 2 examples before sending a request. We set it this way so it's not that restricting or difficult to use the tool, and for simple code snippets it is better this way, but it is recommended that if you want to generate some more complex code you provide more examples, this way the model will have more data to base its response and shape a better one.

For the review mode it's the same: sometimes the code comments will not appear and changes will be made to your code without an explanation. Right now the code review mode outputs functional code but it may be different from the one you expect, the structures are sometimes outputed in a strange way, example: if you have a variable that its an index, GPT may put a number in the place of the key variable for cyclable elements.

To try and fix this we've included a static prompt that helps GPT "understand" its task but also what to do when incorrect code its provided or it's missing, this prompt also tries to bring focus to some important parts of the code.
