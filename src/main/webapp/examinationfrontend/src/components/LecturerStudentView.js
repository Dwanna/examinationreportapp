import React from "react";
import {Button} from "react-bootstrap";


class LecturerStudentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allStudents: [[]]
        }

        this.setStudentGrade= this.setStudentGrade.bind(this);
        this.back= this.back.bind(this);

    }

    componentDidMount() {
        this.setState({
            allStudents:this.props.history.location.state.students
        })

    }
    back(){
        this.props.history.push("/lecturerHomePage");
    }

    setStudentGrade(username){



        console.log(username.student[1]);


        this.props.history.push({
            pathname: '/lecturerStudentGrade',
            state: {
                username:username.student[1],
                name:this.props.history.location.state.module

            }
        });

    }


    render() {


        return (
            <div>

                <h2 style={{"border":"solid 1px grey"}}>{this.props.history.location.state.module}</h2>
                {
                    this.props.history.location.state.students.length === 0 ?


                            <h4 style={{"float":"center","margin-top":"30px"}}> No students have registered to this module</h4>
                         :
                        this.props.history.location.state.students.map((student) => (



                                <div className="row">
                                    <a className="btn btn-outline-secondary" style={{marginTop:"20px"}}
                                       onClick={() => this.setStudentGrade({student})} >Name:{student[0]}</a>
                                </div>



                        ))
                }

                <Button type="button" variant="outline-info" style={{"margin-top":"30px"}} onClick={this.back} > BACK</Button>
            </div>
        );


    }
}


export default LecturerStudentView;