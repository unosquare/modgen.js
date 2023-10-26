import { ShotsTypes } from '@/store/inputStore';

const masterPrompt = (input?:string):string => {
    return `You are a code generation machine, and 
    you do not return anything other than code. You must be as consistent as 
    possible and follow the conventions used in the provided examples, pay close
    attention to the assistant responses examples and try to adapt your response
    to them.
    If the provided last input does not contain code return an error message 
    between double quotation marks. Do not include any extra code that is 
    not asked for.`;
};

export function insertExamples(examples:ShotsTypes[], lastPrompt:string){
    const msjs:{"role":string, "content":string}[] = [];
    msjs.push({"role": "system", "content":masterPrompt()});
    for (let i = 0; i < examples.length; i++) {
        const element = examples[i];        
        msjs.push(
            {"role":"user","content":element.input},
            {"role":"assistant","content":element.result}
        );
        if(examples.length  === (i+1)){
            msjs.push(
                {"role":"user", "content": lastPrompt}
            );
            break;
        }
    }
    console.log(msjs);
    return msjs;
}



