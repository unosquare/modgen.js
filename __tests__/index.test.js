import { render, screen } from '@testing-library/react';
import Model from '../src/app/components/Model';
import Inputs from '../src/app/components/Inputs';
import Container from '../src/app/components/Container';
import Examples from '../src/app/components/Examples';
import Toolbar from '../src/app/components/ToolBar';
import Shots from '../src/app/components/Shots';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe } from 'node:test';
 
describe('Model', () => {
  it('test textarea model button copy to clipboard', async () => {
    const user = userEvent.setup()
    render(<Model userInput={"hello"} updateUserInput={(comn) => {}} disabled={false} />);
 
    await user.click(screen.getByRole('button', {name: /Copy to clipboard/i}));
    const successText = screen.getByText(/copied!/i);

    expect(successText).toBeInTheDocument();
  });
});

describe('Toolbar', () => {
  it('example button correct mode', async () =>{
    const user = userEvent.setup()
    render(<Toolbar isLoading={false} send={async () =>{}} changeModeUp={()=>{}} modeUp={false}  />);

    await user.click(screen.getByRole('button', {name: "Example"}));
    const loadExampleText = screen.getByText(/load example/i);
    const addExampleText = screen.getByText(/add example/i);
    const sendButton = screen.queryByText(/send request/i);

    expect(loadExampleText).toBeInTheDocument();
    expect(addExampleText).toBeInTheDocument();
    expect(sendButton).toBeNull();

  });

  it('request button correct mode', async () =>{
    const user = userEvent.setup()
    render(<Toolbar isLoading={false} send={async () =>{}} changeModeUp={()=>{}} modeUp={false}  />);

    await user.click(screen.getByRole('button', {name: /request/i}));
    const sendButton = screen.getByText(/send request/i);
    const loadExampleText = screen.queryByText(/load example/i);
    const addExampleText = screen.queryByText(/add example/i);

    expect(sendButton).toBeInTheDocument();
    expect(loadExampleText).toBeNull();
    expect(addExampleText).toBeNull();
  });

});

describe('Examples', () => {
  it('adding and deleting examples', async () =>{
    var examples = [{input:"hello", result:"result no1"},{input:"hello2", result:"result no2"},{input:"hello3", result:"result no3"}];
    const {rerender} = render(<Shots examples={examples} />);

    const exampleOneText = screen.getByText('result no1');
    const exampleTwoText = screen.getByText('result no2');
    const exampleThreeText = screen.getByText('result no3');
    var noExamples = screen.queryByText(/No examples added/i);

    expect(exampleOneText).toBeInTheDocument();
    expect(exampleTwoText).toBeInTheDocument();
    expect(exampleThreeText).toBeInTheDocument();
    expect(noExamples).toBeNull();

    examples = [];
    rerender(<Shots examples={examples} />);
    noExamples = screen.queryByText(/No examples added/i);
    expect(noExamples).toBeInTheDocument();
  });
});

describe('Zustand', ()=>{

  test('testing the whole app except the gpt request', async () => {
    const user = userEvent.setup();

    render(
      <div className='flex flex-col pt-3 h-screen'>
        <div className='mx-6 mb-3 flex flex-row basis-[2%]'>
          <h1 className='text-3xl font-black place-self-center'>ModGen.js</h1>
          <Toolbar isLoading={false} send={async ()=>{}} changeModeUp={()=>{}} modeUp={false} />
        </div>
        <div className='flex flex-row text-base grow min-h-0 basis-[98%]'>
          <Inputs data={undefined} isLoading={false} modeUp={false} />

          <Container className='w-5/12'>
              <Examples modeUp={false} />
          </Container>
        </div>
      </div>
    )

    const textAreaModel = screen.getByPlaceholderText('Input some code...');
    await user.click(textAreaModel);
    await user.type(textAreaModel, "function");
    
    const textAreaResult = screen.getByPlaceholderText('Input a result...');
    await user.click(textAreaResult);
    await user.type(textAreaResult, "interface");
    
    await user.click(screen.getByRole('button', {name: /add example/i}));
    
    expect(screen.getByText("function")).toBeInTheDocument();
    expect(screen.getByText("interface")).toBeInTheDocument();
    
    await user.click(screen.getByRole('button', {name: /delete everything/i}));

    const noExamples = screen.queryByText(/No examples added/i);
    expect(noExamples).toBeInTheDocument();
  });
});