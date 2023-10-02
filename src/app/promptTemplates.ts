import { ShotsTypes, userInputsArr, userInputStore} from '@/store/inputStore';

export function insertExamples(examples:ShotsTypes[]){
    const msjs:any[] = [];
    msjs.push({"role": "System", "content":"You are a code generator machine"});
    for (let i = 0; i < examples.length; i++) {
        const element = examples[i];
        msjs.push(
                    {"role":"user","content":element.input},
                    {"role":"assistant","content":element.result}
                );
    }
    return msjs;
}



