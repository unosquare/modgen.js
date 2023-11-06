'use client';
import { useMutation } from 'react-query';
import OpenAI from 'openai';
import Examples from './components/Examples';
import Container from './components/Container';
import insertExamples from './promptTemplates';
import Inputs from './components/Inputs';
import { ShotsTypes } from '@/store/inputStore';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

async function gptQuery(input: OpenAI.Chat.Completions.ChatCompletionMessageParam[]): Promise<string | null> {
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: input,
    });

    return chatCompletion.choices[0].message.content;
}

const Home = () => {
    // react query request, error handlers and fetch trigger
    const { data, isError, isLoading, mutateAsync } = useMutation(
        ({ examples, lastPrompt }: { examples: ShotsTypes[]; lastPrompt: string }) =>
            gptQuery(insertExamples(examples, lastPrompt)),
    );

    // send request to gpt after button is pressed
    async function send(examples: ShotsTypes[], lastPrompt: string) {
        const united: { examples: ShotsTypes[]; lastPrompt: string } = {
            examples,
            lastPrompt,
        };
        await mutateAsync(united);
    }

    if (isError) {
        return <p>Error</p>;
    }

    return (
        <>
            <div className='flex flex-col justify-center h-screen pt-7'>
                <div className='basis-1/12 mx-12'>
                    <h1 className='text-3xl font-black'>ModGen.js</h1>
                </div>
                <div className='flex flex-row text-base justify-center flex-auto mx-12 basis-11/12'>
                    <Container className='mr-7 w-5/12'>
                        <Examples send={send} isLoading={isLoading} />
                    </Container>

                    <Inputs data={data} isLoading={isLoading} />
                </div>
            </div>
        </>
    );
};

export default Home;
