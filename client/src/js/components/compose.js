import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Refresh } from 'react-router-dom';
import Syllable from 'syllable';
import firebase from 'firebase';
import 'isomorphic-fetch';
import * as actions from '../actions/index';
import '../../css/compose.css';
import Sidebar from './sidebar';
import Header from './header';
import ContentEditable from 'react-contenteditable';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Twitter } from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css';
import TwitterIcon from './twitter-icon'



export class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: 'looking at my desk: / paper, pen, water bottle, / and a grey laptop.',
      welcomeMsg: 'Write a new haiku...',
      redirectTo: false,
      line1Text: 'a a a a ',
      line2Text: 'b b b b b b ',
      line3Text: 'c c c c ',
      line1Syl: 0,
      line2Syl: 0,
      line3Syl: 0,
      syl1Classes: 'syllablesDiv',
      syl2Classes: 'syllablesDiv',
      syl3Classes: 'syllablesDiv',
      buttonsDisabled: true,
      twitterText: '',
      twitterAddOns: ' //// #Haiku via @haiku_foundry'
    };
    this.handleTextChangeLine1 = this.handleTextChangeLine1.bind(this);
    this.handleTextChangeLine2 = this.handleTextChangeLine2.bind(this);
    this.handleTextChangeLine3 = this.handleTextChangeLine3.bind(this);
    this.syllableClassGen = this.syllableClassGen.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleTextMain = this.handleTextMain.bind(this);
    this.syllableCounter = this.syllableCounter.bind(this);
    this.haikuFormat = this.haikuFormat.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.haikuSubmitFormatter = this.haikuSubmitFormatter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  haikuSubmitFormatter() {
    const line1 = this.state.line1Text;
    const line2 = this.state.line2Text;
    const line3 = this.state.line3Text;
    return `${line1} // ${line2} // ${line3}`
  }

  handleSave(event) {
    event.preventDefault();
    const haiku = this.haikuSubmitFormatter()
    this.props.dispatch(actions.saveHaiku(haiku));
    // clears the form or should i do another way?
    this.setState({line1Text: null,
      line2Text: null,
      line3Text: null,
      line1Syl: null,
      line2Syl: null,
      line3Syl: null})
  }

  handleShare(event) {
    event.preventDefault();
    console.log("shared");
  }

  // function to determine whether to add green class to counter
  syllableClassGen(syllables, counterLineNum) {
    // check whether line should have 5 or 7 syllables
    const num = counterLineNum === 2 ? 7 : 5;
    if (syllables === num){
      return "syllablesDiv green"
    }
    return "syllablesDiv"
  }



  // uses syllable component but applies to each word individually for total line tally
  syllableCounter(input) {
    let sylCount = 0;
    const inputArr = input.split(" ");
    inputArr.forEach(word => {
      // stop spaces from adding to count
      const trimmed = word.replace('&nbsp;', "");
      if (trimmed !== '') {
        sylCount += Syllable(trimmed)
      }
    })
    return sylCount;
  }

  // main functionality for handling text changes to the 3 lines
  handleTextMain(event, lineNum) {
    const input = event.target.value
    const syllables = this.syllableCounter(input);
    const obj = {};
    // fills obj with dynamic keys based on lineNum
    obj[`line${lineNum}Text`] = input,
    obj[`line${lineNum}Syl`] = syllables,
    obj[`syl${lineNum}Classes`] = this.syllableClassGen(syllables, lineNum)
    this.setState(obj);
  }

  //helper function to check haiku formatting
  haikuFormat(){
    if(this.state.line1Syl === 5 && this.state.line2Syl === 7 && this.state.line3Syl === 5){
      return true
    }
    return false
  }

  handleOnKeyUp () {
    // check to see if format is correct before enabling save & share buttons
    if (this.haikuFormat()) {
      console.log("nicely formatted!")
      this.setState({buttonsDisabled: false})
      // populating twitterText state with haiku
      const haiku = this.haikuSubmitFormatter()
      this.setState({twitterText: haiku})
      console.log(haiku)
    }
    else {
      this.setState({buttonsDisabled: true})
    }
  }

  handleTextChangeLine1(event) {
    this.handleTextMain(event, 1)
  }

  handleTextChangeLine2(event) {
    this.handleTextMain(event, 2)
  }

  handleTextChangeLine3(event) {
    this.handleTextMain(event, 3)
  }


  handleLogout(event) {
    event.preventDefault();
    // firebase.auth().signOut()
    //   .then(() => {
    //     // console.log('user logged OUT');
    //   })
    //   .catch(function(error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    //   })
    this.props.dispatch(actions.logOutUser());
  }

  handleDelete (){
    // confirmation pop up for delete button
    const retVal = confirm("Are you sure you'd like to delete this haiku?");
       if( retVal === true ){
         this.props.dispatch(actions.deleteHaiku(this.props.haikuId));
         // immediately redirect to the compose page
         this.setState({redirectTo: true});
        //  return true;
       }
       else{
          return false;
       }
  }

  handleBack() {
    this.setState({redirectTo: true});
  }

  componentDidMount (){
    // fill in blank lines or haiku to be edited
    const line1 = this.props.line1 || ''
    const line2 = this.props.line2 || ''
    const line3 = this.props.line3 || ''
    // refresh syllable count and classes for line inputs
    const syl1 = this.syllableCounter(line1);
    const syl2 = this.syllableCounter(line2);
    const syl3 = this.syllableCounter(line3);
    const classLine1 = this.syllableClassGen(syl1, 1);
    const classLine2 = this.syllableClassGen(syl2, 2);
    const classLine3 = this.syllableClassGen(syl3, 3);

    this.setState({
      line1Text: line1,
      line2Text: line2,
      line3Text: line3,
      line1Syl: syl1,
      line2Syl: syl2,
      line3Syl: syl3,
      syl1Classes: classLine1,
      syl2Classes: classLine2,
      syl3Classes: classLine3,
    })

  }


  render () {
    const text = `${this.state.twitterText}${this.state.twitterAddOns}`
    const textEncoded = encodeURI(text).replace(/#/g, '%23');
    const fullUrl = `https://twitter.com/intent/tweet/?text=${textEncoded}`
    // {this.state.redirectTo && (
    //   <Refresh />
    // )}
    return (
      <div className='compose'>


        {this.state.redirectTo && (
          <Redirect to={'/home'}/>
        )}


        <div className='textAreaWrapper' >
          <RaisedButton label="Save" disabled={this.state.buttonsDisabled} onClick={this.handleSave} />
          <RaisedButton
            href={fullUrl}
            target="_blank"
            className="twitter-material-button"
            label="Twitter"
            icon={<TwitterIcon />}
            disabled={this.state.buttonsDisabled}
          />
          {this.props.deleteButton && (
            <RaisedButton label="Delete" onClick={this.handleDelete} />
          )}
          {this.props.backButton && (
            <RaisedButton label="Go Back" onClick={this.handleBack} />
          )}
        </div>

        <ContentEditable
          className="haiku_input_divs haiku_input_div1 color_gradient_text"
          html={this.state.line1Text}
          disabled={false}
          onChange={this.handleTextChangeLine1}
          onKeyUp={this.handleOnKeyUp}
        />
        <div className={this.state.syl1Classes}>
          {this.state.line1Syl}
        </div>
        <ContentEditable
          className="haiku_input_divs haiku_input_div2 color_gradient_text"
          html={this.state.line2Text}
          disabled={false}
          onChange={this.handleTextChangeLine2}
          onKeyUp={this.handleOnKeyUp}
        />
        <div className={this.state.syl2Classes}>
          {this.state.line2Syl}
        </div>
        <ContentEditable
          className="haiku_input_divs haiku_input_div3 color_gradient_text"
          html={this.state.line3Text}
          disabled={false}
          onChange={this.handleTextChangeLine3}
          onKeyUp={this.handleOnKeyUp}
        />
        <div className={this.state.syl3Classes}>
          {this.state.line3Syl}
        </div>
      </div>
    )
  }
}

//// twitter component from react-sharingbuttons
// <Twitter
//   shareText={text}
// />

// <div className={this.state.buttonsDisabled ? 'twitter-button-wrapper disabled' : 'twitter-button-wrapper'}>
// </div>


const mapStateToProps = (state, props) => ({
  loginErrorMessage: state.loginErrorMessage,
  email: state.email,
  userId: state.userId,
  haikuId: state.haikuIdToEdit,
});

export default connect(mapStateToProps)(Compose);
