import { ShotsTypes } from '@/store/inputStore';
import OpenAI from 'openai';

const masterPrompt = (mode: boolean): string => {
    if (!mode) {
        return `You are a code generation machine, and 
        you do not return anything other than code. You must be as consistent as 
        possible and follow the conventions used in the provided examples, pay close
        attention to the assistant responses examples and try to adapt your response
        to them.
        If the provided last input does not contain code return an error message 
        between double quotation marks. Do not include any extra code that is 
        not asked for.`;
    } else {
        return `You are a helpful assistant which job is to review code. 
        Do not return text that is not in the form of a code comment. 
        I will give you some code and you will try and make corrections 
        in case of faulty, incomplete or wrong code, if possible optimize 
        it. For each correction you make you will explain the correction 
        and/or optimization in the form of a code comment. Pay close atention 
        to the data types and structures used and try to affect them as 
        little as possible.`;
    }
};

export default function insertExamples(examples: ShotsTypes[], lastPrompt: string, mode: boolean) {
    const msjs: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: masterPrompt(mode) },
    ];
    if (!mode) {
        for (let i = 0; i < examples.length; i++) {
            const element = examples[i];
            msjs.push({ role: 'user', content: element.input }, { role: 'assistant', content: element.result });
        }
    }
    msjs.push({ role: 'user', content: lastPrompt });
    console.log(msjs);
    return msjs;
}
