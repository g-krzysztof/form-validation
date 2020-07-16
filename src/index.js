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
        activeCategory: 'Choose category',
        categoryList: ['category 1', 'category 2', 'category 3', 'category 4'],
        showInputDropdown: false,
    }

    handleSelect = () => {
        this.setState({
            showInputDropdown: !this.state.showInputDropdown
        })
    }

    handleClickSelect = (event) => {
        this.setState({
            activeCategory: event.target.innerHTML,
            showInputDropdown: false
        })
    }

    render() {

        const categoryList = this.state.categoryList.map((item,index)=> <div
            onClick={(event)=>this.handleClickSelect(event)}
            className="Form__categoryItem" key={index}>{item}</div>)

        return (
            <div className="Page__wrapper">
                <div className="Page__formWrapper">
                    <div className="Form__wrapper">
                        <div className="Form__column">
                            <div className="Form__title">
                                Your quiz details:
                            </div>
                            <div className="Form__subtitle Form__underTitle">
                                Quiz title
                            </div>
                            <div className="Form__inputWrapper">
                                <input className="Form__input" type="text" placeholder="Enter quiz title"/>
                            </div>
                            <div className="Form__subtitleSmall Form__underLine">
                                The title can`t be longer than 50 chars.
                            </div>
                            <div className="Form__subtitle Form__underTitle">
                                Quiz logo
                            </div>
                            <div className="Form__wrapperImage">
                                <button className="Form__uploadBtn">Upload custom logo</button>
                            </div>
                            <div className="Form__subtitleSmall Form__underLine" style={{textAlign: 'center'}}>
                                .JPG, .PNG only
                            </div>
                        </div>
                        <div className="Form__spacer">
                        </div>
                        <div className="Form__column">
                            <div className="Form__title">
                                Select your quiz topic:
                            </div>
                            <div className="Form__subtitle Form__underTitle">
                                Category
                            </div>
                            <div className="Form__inputWrapper">
                                {/*<SimpleSelect options={options} onChange={onChange}/>*/}
                                <div className="Form__input Form__flexSpace" onClick={this.handleSelect} style={{cursor: 'pointer'}}>
                                    <div>
                                        {this.state.activeCategory}
                                    </div>
                                    <div>
                                        <svg x="0px" y="0px" width="10px" height="5px" viewBox="0 0 10 5" enableBackground="new 0 0 10 5">
                                            <polygon fill="#EA4A9A" points="0,0 4.98,5 10,0 "/>
                                        </svg>
                                    </div>
                                </div>

                                    {this.state.showInputDropdown ? <div className="Form__inputDropdown">{categoryList}</div> : null}

                            </div>
                            <div className="Form__subtitle Form__underTitle">
                                Quiz entry fee
                            </div>
                            <div className="Form__inputWrapper">
                                <input className="Form__input" type="text" placeholder="£ 0"/>
                            </div>
                            <div className="Form__subtitleSmall Form__underLine">
                                Min. entry fee is £5.00.
                            </div>
                        </div>
                    </div>
                    <div className="Form__verticalSpace"></div>
                    <div className="Form__proceedBtnWrapper">
                        <button className="Form__proceedBtn">Proceed</button>
                    </div>
                </div>
            </div>

        )
    }

}


ReactDOM.render(<App />, document.getElementById("root"));