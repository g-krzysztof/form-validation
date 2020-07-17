import './sass/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    state = {
        activeCategory: 'Choose category',
        categoryList: ['category 1', 'category 2', 'category 3', 'category 4'],
        showInputDropdown: false,
        titleValue: '',
        titleSmallError: false,
        titleBigError: false,
        categoryError: false,
        imageError: false,
        imageErrorMessage: false
    }

    handleTitle = event => {
        this.setState({
            titleValue: event.target.value
        })
    }

    handleSelect = () => {
        this.setState({
            showInputDropdown: !this.state.showInputDropdown
        })
    }

    handleClickSelect = event => {
        this.setState({
            activeCategory: event.target.innerHTML,
            showInputDropdown: false
        })
    }

    handleUpload = () => {
        document.getElementById('logo').click();
    }

    cleanErrors = () => {
        this.setState({
            titleSmallError: false,
            titleBigError: false,
            categoryError: false,
            imageErrorMessage: false
        })
    }

    handleUploadValidation = () => {
        // const name = document.getElementById('logo');
        // console.log('Selected file: ' + name.files.item(0).name);
        // console.log('Selected file: ' + name.files.item(0).type);
        this.setState({
            imageError: true
        })

    };

    handleProceed = (event) => {
        this.cleanErrors();
        if(this.state.titleValue.length < 5){
            this.setState({
                titleSmallError: true
            })
        }
        if(this.state.titleValue.length > 50){
            this.setState({
                titleBigError: true
            })
        }
        if(this.state.activeCategory === 'Choose category'){
            this.setState({
                categoryError: true
            })
        }
        if(this.state.imageError === false){
            this.setState({
                imageErrorMessage: true
            })
        }
        if(1){
            document.getElementById('quizForm').click();
        }
    }

    render() {

        const categoryList = this.state.categoryList.map((item,index)=> <div
            onClick={(event)=>this.handleClickSelect(event)}
            className="Form__categoryItem" key={index}>{item}</div>)

        return (
            <div className="Page__wrapper">
                <form action="/validation/form-validation.php" method="post" enctype="multipart/form-data" >
                    <div className="Page__formWrapper">
                        <div className="Form__wrapper">
                            <div className="Form__column">
                                <div className="Form__title">
                                    Your quiz details:
                                </div>
                                <div className="Form__subtitle Form__underTitle">
                                    Quiz title
                                </div>
                                <div className={`Form__inputWrapper ${this.state.titleSmallError || this.state.titleBigError ? 'Form__errorBorder' : null}`}>
                                    <input className="Form__input" type="text"
                                           name="title"
                                           placeholder="Enter quiz title"
                                           value={this.state.titleValue}
                                           onChange={(event)=>this.handleTitle(event)}/>
                                </div>
                                <div className="Form__subtitleSmall Form__underLine">
                                    {this.state.titleValue.length <= 5 ? 'The title must be at least 5 characters long.' : 'The title can`t be longer than 50 chars.'}
                                </div>
                                {this.state.titleSmallError ? <div className="Form__error">Please provide a name for your quiz</div> : null}
                                {this.state.titleBigError ? <div className="Form__error">Your quiz name is over 50 characters long</div> : null}
                                <div className="Form__subtitle Form__underTitle">
                                    Quiz logo
                                </div>
                                <div className="Form__wrapperImage">
                                    <input
                                        style={{display: 'none'}}
                                        type="file"
                                        id="logo" name="logo"
                                        accept="image/png, image/jpeg"
                                        onChange={this.handleUploadValidation}/>
                                    <button type="button" className="Form__uploadBtn" onClick={this.handleUpload}>Upload custom logo</button>
                                </div>
                                {this.state.imageErrorMessage ? <div className="Form__error" style={{padding: '10px 0', textAlign: 'center'}}>Please provide logo for your quiz</div> : null}
                                <div className="Form__subtitleSmall Form__underLine" style={{textAlign: 'center'}}>
                                    .JPG, .PNG only
                                </div>
                            </div>
                            <div className="Form__spacer"></div>
                            <div className="Form__column">
                                <div className="Form__title">
                                    Select your quiz topic:
                                </div>
                                <div className="Form__subtitle Form__underTitle">
                                    Category
                                </div>
                                <div className={`Form__inputWrapper ${this.state.categoryError ? 'Form__errorBorder' : null}`}>
                                    <div className="Form__input Form__flexSpace" onClick={this.handleSelect} style={{cursor: 'pointer'}}>
                                        <input className="Form__input" type="text" name="category" value={this.state.activeCategory} readOnly={true}/>
                                        <div>
                                            <svg x="0px" y="0px" width="10px" height="5px" viewBox="0 0 10 5" enableBackground="new 0 0 10 5">
                                                <polygon fill="#EA4A9A" points="0,0 4.98,5 10,0 "/>
                                            </svg>
                                        </div>
                                    </div>

                                    {this.state.showInputDropdown ? <div className="Form__inputDropdown">{categoryList}</div> : null}

                                </div>
                                {this.state.categoryError ? <div className="Form__error" style={{padding: '10px 0'}}>Please select a category</div> : null}
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
                        <div className="Form__verticalSpace">
                        </div>
                        <div className="Form__proceedBtnWrapper">
                            <button className="Form__proceedBtn" onClick={this.handleProceed}>Proceed</button>
                            <button style={{display: 'none'}} type="submit" id="quizForm">submit</button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }

}


ReactDOM.render(<App />, document.getElementById("root"));