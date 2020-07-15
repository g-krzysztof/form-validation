import './sass/index.scss';
import SimpleSelect from "react-simple-styleable-select";
import React from 'react';
import ReactDOM from 'react-dom';

const options = [
    {value: 1, label: 'Option 1'},
    {value: 'text value 2', label: 'Option 2'},
    {value: {complex: 'object', moreProps: 'hello'}, label: 'Option 3'}
]

const onChange = (event, val, fullOption) => {
    console.log(event, val, fullOption )
};

class App extends React.Component {

    state = {
    }

    render() {

        return (
            <div>
                <SimpleSelect options={options} onChange={onChange}/>
            </div>

        )
    }

}


ReactDOM.render(<App />, document.getElementById("root"));