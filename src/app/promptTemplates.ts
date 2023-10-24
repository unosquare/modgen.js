import { ShotsTypes } from '@/store/inputStore';

const masterPrompt = (input:string):string => {
    return `You are a code generation machine 
    you do not return anything other than code.
    Based on the provided examples, you must 
    provide a result based on the provided
    input. If the provided input does
    not contain code, send an error message 
    between double quotation marks. Do not include
    any extra code that is not asked for. Try 
    to be as consistent as possible and follow 
    the conventions used in the provided code.

    input: '${input}'`;
};

export function insertExamples(examples:ShotsTypes[], lastPrompt:string){
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



