import './sass/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    state = {
        activeCategory: 'Choose category',
        categoryList: ['category 1', 'category 2', 'category 3', 'category 4'],
        showInputDropdown: false,
        titleValue: '',
        currency: '0.0',
        currencyNumber: false,
        titleSmallError: false,
        titleBigError: false,
        categoryError: false,
        currencyError: false,
        imageError: false,
        imageErrorMessage: false,
        imagePhpError: false,
        imageTypePhpError: false,
        currencyPhpError: false,
        titlePhpError: false,
        categoryPhpError: false
    }

    componentDidMount() {

        if(window.quizData.title !== ""){
            this.setState({
                titleValue: window.quizData.title
            })
        }

        if(window.quizData.category !== ""){
            this.setState({
                activeCategory: window.quizData.category
            })
        }

        if(window.errors.image !== ""){
            this.setState({
                imagePhpError: window.errors.image
            })
        }

        if(window.errors.imageType !== "validateOk"){
            this.setState({
                imageTypePhpError: window.errors.imageType
            })
        }

        if(window.errors.title !== ""){
            this.setState({
                titlePhpError: window.errors.title
            })
        }

        if(window.errors.currency !== ""){
            this.setState({
                currencyPhpError: window.errors.currency
            })
        }
    }

    handleCurrency = event => {

        if(event.target.value.slice(-1) === ',' || event.target.value.slice(-1) === '.'){
            let currency = event.target.value.substr(2);
            currency = currency.replace(',','.');
            if(currency.length === 1){
                this.setState({
                    currency: `£ 0.`
                })
            } else {
                if((currency.split(".").length-1) === 1){

                    this.setState({
                        currency: `£ ${currency}`
                    })
                }
            }
        } else {

            if(Number.isInteger(parseInt(event.target.value.slice(-1), 10))){

                const currArray = event.target.value.split('');
                const decimalArray = event.target.value.split('.');

                if(currArray[currArray.length - 2] === '.' && currArray[currArray.length - 1] === '0'){
                    this.setState({
                        currency: `${decimalArray[0]}.0`
                    })
                }
                else{
                    let currency = event.target.value.substr(2);

                    if(currency.length > 0 && currArray[currArray.length - 1] !== '0' ){
                        currency = parseFloat(currency);
                    }

                    this.setState({
                        currency: `£ ${currency}`
                    })
                }
            } else {
                this.setState({
                    currency: `£ `
                })
            }
        }
    }

    handleCurrencyFocus = event => {

        if(this.state.currency === "0.0"){
            this.setState({
                currency: `£ `
            })
        }
    }

    handleCurrencyBlur = event => {

        let currency = event.target.value.substr(2);

        if(currency.length > 0){
            currency = parseFloat(currency);
            this.setState({
                currency: `£ ${currency.toFixed(2)}`
            })
        }

        if(currency.length === 0){
            this.setState({
                currency: `0.0`
            })
        }
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
        this.setState({
            imageError: true
        })
        document.getElementById('logo').click();
    }

    cleanErrors = () => {
        this.setState({
            titleSmallError: false,
            titleBigError: false,
            categoryError: false,
            currencyError: false,
            imageError: false,
            imageErrorMessage: false,
            imagePhpError: false,
            imageTypePhpError: false,
            currencyPhpError: false,
            titlePhpError: false,
            categoryPhpError: false
        })
    }

    handleUploadValidation = () => {
        this.setState({
            imageError: true
        })
    };

    handleProceed = () => {
        this.cleanErrors();
        if(this.state.titleValue.length < 5){
            this.setState({
                titleSmallError: true
            })
        }
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
        if(this.state.currency === '0.0'){
            this.setState({
                currencyError: true
            })
        }
        if(this.state.imageError === false){
            this.setState({
                imageErrorMessage: true
            })
        }

        setTimeout(()=>{
            const {titleSmallError, titleBigError, categoryError, imageError, currencyError} = this.state;
            if(
                titleSmallError !== true
                && titleBigError !== true
                && categoryError !== true
                && currencyError !== true
            ){
                document.getElementById('quizForm').click();
            }
        },0)

    }

    render() {

        const categoryList = this.state.categoryList.map((item,index)=> <div
            onClick={(event)=>this.handleClickSelect(event)}
            className="Form__categoryItem" key={index}>{item}</div>)

        return (
            <div className="Page__wrapper">
                <form action="/thank-you.php" method="post" enctype="multipart/form-data" >
                    <div className="Page__formWrapper">
                        <div className="Form__wrapper">
                            <div className="Form__column">
                                <div className="Form__title">
                                    Your quiz details:
                                </div>
                                <div className="Form__subtitle Form__underTitle">
                                    Quiz title
                                </div>
                                <div className={`Form__inputWrapper ${this.state.titleSmallError || this.state.titleBigError || this.state.titlePhpError ? 'Form__errorBorder' : null}`}>
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
                                {this.state.titlePhpError ? <div className="Form__error">{this.state.titlePhpError}</div> : null}
                                <div className="Form__subtitle Form__underTitle">
                                    Quiz logo
                                </div>
                                <div className="Form__wrapperImage">
                                    <input
                                        style={{display: 'none'}}
                                        type="file"
                                        id="logo" name="logo"
                                        accept="image/gif, image/jpeg"
                                        onChange={this.handleUploadValidation}/>
                                    <button type="button" className="Form__uploadBtn" onClick={this.handleUpload}>Upload custom logo</button>
                                </div>
                                {this.state.imageErrorMessage ? <div className="Form__error" style={{padding: '10px 0', textAlign: 'center'}}>Please provide logo for your quiz [FE error]</div> : null}
                                {this.state.imagePhpError ? <div className="Form__error" style={{padding: '10px 0', textAlign: 'center'}}>{this.state.imagePhpError}</div> : null}
                                {this.state.imageTypePhpError ? <div className="Form__error" style={{padding: '10px 0', textAlign: 'center'}}>{this.state.imageTypePhpError}</div> : null}
                                <div className="Form__subtitleSmall Form__underLine" style={{textAlign: 'center'}}>
                                    .JPG, .GIF only
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
                                        <input className="Form__input" style={{cursor: 'pointer'}} type="text" name="category" value={this.state.activeCategory} readOnly={true}/>
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
                                <div className={`Form__inputWrapper ${this.state.currencyError || this.state.currencyPhpError ? 'Form__errorBorder' : null}`}>
                                    <input className="Form__input" type="text" placeholder="£ 0.00"
                                           name="currency"
                                           value={this.state.currency}
                                           onChange={(event)=>this.handleCurrency(event)}
                                           onBlur={(event)=>this.handleCurrencyBlur(event)}
                                           onFocus={(event)=>this.handleCurrencyFocus(event)}

                                    />
                                </div>
                                <div className="Form__subtitleSmall Form__underLine">
                                    Min. entry fee is £5.00.
                                </div>
                                {this.state.currencyError ? <div className="Form__error">Please provide a value for quiz entry fee</div> : null}
                                {this.state.currencyPhpError ? <div className="Form__error">{this.state.currencyPhpError}</div> : null}
                            </div>
                        </div>
                        <div className="Form__verticalSpace">
                        </div>
                        <div className="Form__proceedBtnWrapper">
                            <button type="button" className="Form__proceedBtn" onClick={this.handleProceed}>Proceed</button>
                            <button style={{display: 'none'}} type="submit" id="quizForm">submit</button>
                        </div>
                        <div
                            className="Form__validationRules"
                            style={{
                                padding: '20px 0 0 0',
                                textAlign: 'center'
                            }}>
                            1. Proceed button allow send form with all type images - validation type error show from backend.<br /><br />
                            2. Quiz title: length minimum 5 required at the front, but 10 on the back. <br /><br />
                            3. Entry fee: value minimum 5 required at the front, but 10 on the back. <br /><br />

                        </div>
                    </div>
                </form>
            </div>

        )
    }

}

if(document.getElementById("root")){
    ReactDOM.render(<App />, document.getElementById("root"));
}