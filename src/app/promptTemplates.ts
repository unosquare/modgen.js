import { ShotsTypes } from '@/store/inputStore';

const masterPrompt = (input:string):string => {
    return `You do not return anything other than code. 
    You must be as consistent as 
    possible and follow the conventions used in 
    the provided examples and input.
    If the provided input does not contain code, 
    return an error message between double quotation
    marks. Do not include any extra code that is 
    not asked for. 
    
    input: 
    ${input}`;
};

export function insertExamples(examples:ShotsTypes[], lastPrompt:string){
    console.log(examples);
    const msjs:{"role":string, "content":string}[] = [];
    msjs.push({"role": "system", "content":"You are a code generation machine"});
    for (let i = 0; i < examples.length; i++) {
        const element = examples[i];        
        msjs.push(
            {"role":"user","content":element.input},
            {"role":"assistant","content":element.result}
        );
        if(examples.length  === (i+1)){
            msjs.push(
                {"role":"user", "content": masterPrompt(lastPrompt)}
            );
            break;
        }
    }
    return msjs;
}



