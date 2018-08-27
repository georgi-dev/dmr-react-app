import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import logo from '../logo.svg';
import '../App.css';
import Header from './Header.js';
import {Browser} from '../components/Browser.js';
//import {AllLessonMenu} from '../components/AllLessonMenu.js';
import {AllLessonsContent} from '../components/AllLessonsContent.js';
import {AllLessonsInstructions} from '../components/AllLessonsInstructions.js';

import DashboardHeader from '../components/DashboardHeader.js';

import '../../node_modules/bootstrap3/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap3/fonts/glyphicons-halflings-regular.eot';
//import Parser from 'html-react-parser';
import MonacoEditor from 'react-monaco-editor';
//const API = 'https://hn.algolia.com/api/v1/search?query=';
//const DEFAULT_QUERY = 'redux';
class Learn extends Component {

  constructor(props){
    super(props);
    this.state = {
      //title:"Научете HTML: Елементи и Структура",
      lessonNumber:'1',
      code: '<h1>Default</h1>',
      defaultCode: '<h1>Default</h1>',
      showMenu: false,
      current_lesson: 1,
      cnt_all_lessons: this.props.countLessons,
      nextButtonDisabled : true,
      exercises : [],
      exerciseBody:'',
      exerciseDefaultBody:'',
      exerciseInstructions:[],
      instructions_solutions: [],
      instruction_current_solution_id: 0,
      instruction_status: '',
      exerciseStatus:'',
      tabs:[]
    };

    this.renderOnBrowser = this.renderOnBrowser.bind(this);
    this.getSelectedLesson = this.getSelectedLesson.bind(this);
    this.resetCode = this.resetCode.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {

    //alert(this.props.test);
    const syllabusId = this.props.syllabusId;
    const subSyllabusId = this.props.subSyllabusId;

    //console.log(syllabusId);


      fetch('http://dmr-app.localhost/Syllabus/get_all_titles/' + syllabusId)
        .then(response => response.json())
        .then(data => {
          this.setState({exercises:data});
        });

        //console.log(this.state.exercises);

        fetch('http://dmr-app.localhost/Syllabus/get_single_syllabus_lesson_body/' + syllabusId + '/' + 1)
          .then(response => response.json())
          .then(data => {
            this.setState(
              {
                exerciseBody:data[0].sub_syllabus_body,
                exerciseInstructions:data,
                instructions_solutions:data,
                instruction_current_solution_id:0,
                exerciseStatus: data[0].status,
                instruction_status: data[0].instruction_status
              }
            );
            //console.log(this.state.exerciseStatus,'exerciseStatus');
            let instruction_status_obj = this.state.instruction_status.split(',');
            for (var i = 0; i < instruction_status_obj.length; i++) {
              if (instruction_status_obj[i] == '1') {
                ReactDOM.findDOMNode(document.querySelectorAll('input[type="radio"]')[i]).checked = true;
                // document.querySelectorAll('input[type="radio"]')[i].checked = true;
                this.setState({instruction_current_solution_id: i + 1});
              }
            }
            //console.log(instruction_status_obj);

            if (this.state.exerciseStatus == '1') {
                ReactDOM.findDOMNode(document.querySelector('.runButton')).disabled = true;
                ReactDOM.findDOMNode(document.querySelector('.next_btn')).style.color = '#fff';

                this.setState({nextButtonDisabled:false});

                ReactDOM.findDOMNode(document.querySelector('.next_btn')).style.backgroundColor = 'green';

            }
          });


  }
  getNextLesson(){
    ReactDOM.findDOMNode(document.querySelector('.runButton')).disabled = false;
    document.querySelector('input[type="radio"]').checked = false;

    ++this.state.current_lesson;
    if (this.state.current_lesson > 0 && this.state.current_lesson < 17) {
      fetch('http://dmr-app.localhost/Syllabus/get_single_syllabus_lesson_body/' + this.state.current_lesson)
        .then(response => response.json())
        .then(data => {
          this.setState(
            {
              exerciseBody:data[0].sub_syllabus_body,
              exerciseInstructions:data,
              instructions_solutions:data,
              instruction_current_solution_id:0,
              exerciseStatus: data[0].status,
              instruction_status: data[0].instruction_status
            }
          );

          let instruction_status_obj = this.state.instruction_status.split(',');
          for (var i = 0; i < instruction_status_obj.length; i++) {
            if (instruction_status_obj[i] == '1') {
              ReactDOM.findDOMNode(document.querySelectorAll('input[type="radio"]')[i]).checked = true;
              // document.querySelectorAll('input[type="radio"]')[i].checked = true;
              this.setState({instruction_current_solution_id: i + 1});
            }
          }
          //console.log(instruction_status_obj);

          if (this.state.exerciseStatus == '1') {
              ReactDOM.findDOMNode(document.querySelector('.runButton')).disabled = true;
              ReactDOM.findDOMNode(document.querySelector('.next_btn')).style.color = '#fff';

              this.setState({nextButtonDisabled:false});

              ReactDOM.findDOMNode(document.querySelector('.next_btn')).style.backgroundColor = 'green';

          }
        });

        this.toggleMenu;

    }

    ReactDOM.findDOMNode(document.querySelector('.next_btn')).style.color = '#fff';
    document.querySelectorAll('input[type="radio"]')[0].checked = false;
    ReactDOM.findDOMNode(document.querySelector('.next_btn')).style.backgroundColor = '#444446';
    this.setState({nextButtonDisabled:true});
  }
  getLastLesson(){
    --this.state.current_lesson;
    if (this.state.current_lesson > 0 && this.state.current_lesson < 17) {
      fetch('http://dmr-app.localhost/Syllabus/get_single_syllabus_lesson_body/' + this.state.current_lesson)
        .then(response => response.json())
        .then(data => {
          this.setState(
            {
              exerciseBody:data[0].sub_syllabus_body,
              exerciseInstructions:data,
                exerciseStatus: data[0].status

            }
          );
        });

        this.toggleMenu;
    }


  }

  getSelectedLesson(event){

     //console.log(event.currentTarget.getAttribute('data-lesson-id'));
     //const syllabusId = this.props.syllabusId;
     const lessonID = event.currentTarget.getAttribute('data-lesson-id');

     fetch('http://dmr-app.localhost/Syllabus/get_single_syllabus_lesson_body/' + this.props.syllabusId + '/' + lessonID)
       .then(response => response.json())
       .then(data => {
         this.setState(
           {
             exerciseBody:data[0].sub_syllabus_body,
             exerciseInstructions:data,
             exerciseStatus: data[0].status,
             current_lesson: lessonID

           }
         );
       });
       document.getElementById('menu').style.left = '-300px';
       this.hideMenu;

     // this.setState({
     //   lessonNumber: lessonID
     // });
    //console.log()
    //console.log(document.getElementsByClassName('test')[0].dataset.lessonId );
  }
  // componentDidMount(){

  // }
  toggleMenu(){
    this.setState({
      showMenu: !this.state.showMenu
    });
    document.getElementById('menu').style.left = '0px';
    //console.log(document.getElementById('menu'));
    // if (this.state.showMenu === true) {
    //   this.setState({
    //     showMenu: !this.state.showMenu
    //   });
    //   document.getElementById('menu').style.left = '0px';
    // }
    // else{
    //   this.setState({
    //     showMenu: this.state.showMenu
    //   });
    //   document.getElementById('menu').style.left = '-300px';
    // }
  }

  hideMenu(){

    if (this.state.showMenu === true) {
      this.setState({
        showMenu: !this.state.showMenu
      });
      document.getElementById('menu').style.left = '-300px';
    }

  }
  renderOnBrowser(){
    let instruction_solution_id = this.state.instruction_current_solution_id;
    alert(instruction_solution_id);
    let instruction_solution = this.state.instructions_solutions[instruction_solution_id].instruction_solution;
    console.log(instruction_solution);

    let taskCount = document.querySelectorAll('input[type="radio"]').length;

    const model = this.refs.monaco.editor.getModel();
    const value = model.getValue();

    this.setState({
      code: value
    });
    let checkSolution = value.match(instruction_solution);

    console.log(checkSolution);
    if (checkSolution !== null) {
      let userID          = 1;
      let language_id     = 1;
      let syllabus_id     = 2;
      let instruction_status = this.state.instruction_status += '1,';
    // }
    // return false;
    // if(value == '<h1>Georgi</h1>'){
      alert(value);
      //this.getNextLesson;

      document.querySelectorAll('input[type="radio"]')[instruction_solution_id].checked = true;
      let status = '0';
      console.log(taskCount,'length');
      if (instruction_solution_id == taskCount - 1) {
        instruction_status = this.state.instruction_status.slice(0, -1);
        document.querySelector('.next_btn').style.color = '#fff';
        document.querySelector('.runButton').disabled = true;
      //  document.querySelector('.next_btn').removeAttribute("disabled");
        this.setState({nextButtonDisabled:false});
        document.querySelector('.next_btn').style.backgroundColor = 'green';
        status = '1';
      }


      fetch('http://dmr-app.localhost/Syllabus/update_user_progress/', {
        method:'POST'
        ,
        body: JSON.stringify(
        {
          user_id : userID,
          language_id : language_id,
          syllabus_id :syllabus_id,
          syllabus_sub_id : this.state.current_lesson,
          status: status,
          instruction_status: instruction_status
        })
      })
        .then(response => response.json())
        .then(data => {
          //alert(this.state.instructions_solutions[0].instruction_solution)
          this.setState(
            {
              //exerciseBody:data[0].sub_syllabus_body,
              instructions_solutions: this.state.instructions_solutions[instruction_solution_id].instruction_solution,
              instruction_current_solution_id: ++this.state.instruction_current_solution_id//,
              //exerciseInstructions:data
              //exerciseStatus: data[0].status


            }
          );
          console.log(this.state.instructions_solutions);

        });

    }

  }

  resetCode(){
    this.setState({
      code: this.state.defaultCode
    });
  }

  editorDidMount(editor, monaco) {
    //console.log('editorDidMount', editor);
    editor.focus();
  }
  render() {
    //const code = `Hello`;

    const { exercises } = this.state;


    return (
      <div className="App" >

      <DashboardHeader learn_page_header={this.props.lesson}/>

        <ul className="row" style={{padding:0}}>
        <section className="col-md-4" onClick={this.hideMenu.bind(this)} style={{overflow: 'auto',height:'633px'}}>
        <AllLessonsContent exerciseBody={this.state.exerciseBody}/>
        <AllLessonsInstructions exerciseInstructions={this.state.exerciseInstructions} exerciseStatus={this.state.exerciseStatus}/>




        </section>
        <section className="col-md-4" onClick={this.hideMenu.bind(this)} id="editor_code" style={{height:'633px', width:'100%'}}>
        <MonacoEditor
          ref='monaco'
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          value={this.state.code}
          // options={options}
          // onChange={::this.onChange}
          editorDidMount={this.editorDidMount}
        />
        <div style={{position: 'absolute',bottom: '0px'}}>
          <button className="runButton"onClick={this.renderOnBrowser} style={{padding:'5px 15px',color:'#fff',background:'#3c2abf',border:'none'}}>Run</button>
          <button className="glyphicon glyphicon-refresh" onClick={this.resetCode} style={{padding:'5px 15px',background:'rgb(30, 30, 30)',color:'#fff',border:'none'}}></button>

        </div>
        </section>
        <section onClick={this.hideMenu.bind(this)} className="col-md-4" id="browser" style={{height:'633px'}}>
          <Browser fromEditor={this.state.code} />


        </section>
        </ul>

        <footer>


          <ul className="row" style={{listStyle:'none',color:'#fff',padding:'5px'}}>
            <li className="col-md-4" onClick={this.toggleMenu.bind(this)}><i className="	glyphicon glyphicon-menu-hamburger"></i> Menu</li>
            <li className="col-md-4">
              <div className="row">
                <div className="col-md-4">
                  <button onClick={this.getLastLesson.bind(this)} style={{color:'#fff',background:'#2a283e',padding:'5px 20px'}}>Back</button>
                </div>
                <div  className="col-md-4" >
                  <span>{this.state.current_lesson}</span> /
                  <span> {this.state.cnt_all_lessons}</span>
                </div>
                <div className="col-md-4">
                  <button onClick={this.getNextLesson.bind(this)} className="next_btn"  disabled={this.state.nextButtonDisabled} style={{background:'#444',color:'#fff',padding:'5px 20px'}}>Next</button>
                </div>
              </div>
            </li>
            <li className="col-md-4">Get Help</li>
          </ul>
        </footer>

        <div>
           <div id="menu" className="modal__300">
              <div className="modalContent__1HNQ1QviSMA5sxGvsPYLrN">
                 <div className="courseNavButtonContainer__1_gUv3bTN8HAQQf58MIDeP">
                    <a href="/learn/learn-html" className="courseNavButton__2PvUR3d_4qWLyQfxjVCQN3">
                    <span className="leftArrowIcon___-pCF5NI_CCZZ-qpS3uZ1 new-cc-icon icon-heavyleftarrow"></span>Learn HTML: Elements and Structure
                    </a>
                 </div>
                 <div>
                    <h1 className="heading__32zZOICnFS_W6-JZlLrX2y">Introduction to HTML</h1>
                    <h3 className="subheading__rVwyi7V09bKM8slOtu_0E">LESSON</h3>
                    <p className="description__31qWax7kNh79yVS9bXfg3z">In this lesson you will learn the basic structure of an HTML document.</p>
                    <section className="exerciseSection">
                       <div className="groupHeading">Exercises</div>

                       {exercises.map((exercise,index) =>

                         <button onClick={this.getSelectedLesson} key={exercise.id} data-lesson-id={exercise.syllabus_sub_id}  className="test navButton__ZnqfRpK9Q_YnPIBDOqHmg completedListItem__1eHiHnR2W0vFWdZk6zSmIu activeListItem__1WDYeFpcYdIS35PyYU08C">
                            <div className="listItemTitle__3NeTJtrYNQfK-bf7JqWTlG" >
                               {index+1}. {exercise.sub_syllabus_title}
                            </div>
                            {exercise.status == '1' ?
                            <i className="glyphicon" style={{top:'-17px',float:'right'}}></i>
                            :
                            <i className="glyphicon glyphicon-lock" style={{top:'-17px',float:'right'}}></i>
                            }
                         </button>
                       )}
                    </section>
                 </div>
              </div>
           </div>
        </div>
        </div>
    );
  }
}
export default Learn;
