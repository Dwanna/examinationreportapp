import React from "react";
import Chart, {
    Legend,
    Series,
    Tooltip,
    ValueAxis
} from 'devextreme-react/chart';
import '../App.css';
import axios from "axios";
import authHeader from "../service/auth-header";
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';

const lineStyles = ['waved', 'straight'];
const breaksCount = [1, 2, 3, 4];

class SearchModule extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            autoBreaksEnabledValue: true,
            breaksCountValue: 3,
            lineStyleValue: lineStyles[0],
            data:[]
        };

        this.changeBreaksCount = (e) => {
            this.setState({
                breaksCountValue: e.value
            });
        };

        this.changeStyle = (e) => {
            this.setState({
                lineStyleValue: e.value
            });
        };

        this.changeBreaksEnabledState = (e) => {
            this.setState({
                autoBreaksEnabledValue: e.value
            });
        };
    }



    componentDidMount() {
        return axios
            .get("http://localhost:8082/lecturer/getGradesForModule",{headers:authHeader()}).then(response=>{

                    console.log(response.data);

                    this.setState({
                        data:response.data
                    })

                    console.log(this.state.data);

                },
                error=>{

                    const  resMessage= (error.response && error.response.data
                        && error.response.data.message) || error.message||error.toString();
                    if(error.message==="Request failed with status code 400") {
                        alert(error.response.data);
                    }
                })
    }

    render(){
        return(
            <div>
                <Chart
                    id="chart"
                    title={'Student grades for database module'}
                    dataSource={this.state.data}>
                    <Series
                        valueField="grade"
                        argumentField="studentName"
                        type="bar" />
                    <ValueAxis
                        visible={true}
                        autoBreaksEnabled={this.state.autoBreaksEnabledValue}
                        maxAutoBreakCount={this.state.breaksCountValue}
                        breakStyle={{ line: this.state.lineStyleValue }} />
                    <Legend visible={false} />
                    <Tooltip enabled={true} />
                </Chart>
                <div className="options">
                    <div className="caption">Options</div>
                    <div className="option">
                        <CheckBox className="checkbox"
                                  text="Enable Breaks"
                                  onValueChanged={this.changeBreaksEnabledState}
                                  value={this.state.autoBreaksEnabledValue}>
                        </CheckBox>
                    </div>
                    &nbsp;
                    <div className="option center">
                        <span>Max Count </span>
                        <SelectBox
                            items={breaksCount}
                            value={this.state.breaksCountValue}
                            onValueChanged={this.changeBreaksCount}
                            width={60}>
                        </SelectBox>
                    </div>
                    &nbsp;
                    <div className="option right">
                        <span>Style </span>
                        <SelectBox
                            items={lineStyles}
                            value={this.state.lineStyleValue}
                            onValueChanged={this.changeStyle}
                            width={120}>
                        </SelectBox>
                    </div>
                </div>
                <a href="/adminHomePage" className="btn btn-primary" style={{"margin-top":"40px"}}>BACK</a>
            </div>
        )
    }



}

export default SearchModule;