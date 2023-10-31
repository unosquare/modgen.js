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

### Usage
As described in the past section, you must first write/copy and paste/obtain at least a couple of examples similar to the code you are trying to generate. Examples are composed of; 1) an input: this input is the "first" part of your examples, is usually the code you are trying to get the data from, example:

```const numbers = [1,2,3];```

This array has some data you would probably want to pass to a structure, another array, etc.

This is your result, the "second" part of your example:

```
const arrTwo = {
    "number": numbers[2],
    "number": numbers[1],
    "number": numbers[0],
};
```
This is a very simple example. Still you can notice the result is dependant of the input. This is exactly the "grabbing" of data,The result obtains and adapts the information based on the input, but knows how to do this thanks to the examples that showed GPT how to process the code.

So... if you were to provide this code ```const fruits = ['banana', 'orange', 'apple']``` as your last input, the response would be: 
```
const fruitsTwo = {
    "fruit": fruits[2],
    "fruit": fruits[1],
    "fruit": fruits[0],
};
```

### Limitations
While the purpose of this project is to create a tool that can return correct code 100% of the time, unfortunatly it is completly possible that GPT returns an error message or incorrect code, sometimes this is because not enough examples were provided for GPT to completely adapt or "understand" the code you provided. Right now you must provide at least 2 examples before sending a request. We set it this way so it's not that restricting or difficult to use the tool, and for simple code snippets it is better this way, but it is recommended that if you want to generate some more complex code you provide more examples, this way the model will have more data to base its response and shape a better one.

To try and fix this we've included a static prompt that helps GPT "understand" its task but also what to do when incorrect code its provided or it's missing, this prompt also tries to bring focus to some important parts of the code.
