import { render, screen } from '@testing-library/react';
import Model from '../src/app/components/Model';
import Toolbar from '../src/app/components/ToolBar';
import Shots from '../src/app/components/Shots';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
 
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