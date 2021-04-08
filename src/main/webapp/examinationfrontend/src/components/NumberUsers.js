import React from "react";
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Export
} from 'devextreme-react/pie-chart';

import { users } from '../service/dataUsers';

class NumberUsers extends React.Component{

    render() {
        return (
            <div>
            <PieChart
                id="pie"
                type="doughnut"
                title="Total number of users in the System"
                palette="Soft Pastel"
                dataSource={users}
            >
                <Series argumentField="userType">

                </Series>
                <Export enabled={true} />
                <Legend
                    margin={0}
                    horizontalAlignment="right"
                    verticalAlignment="top"
                />
                <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>
                    <Format type="tens" />
                </Tooltip>
            </PieChart>
        <a href="/adminHomePage" className="btn btn-primary" style={{"margin-top":"40px"}}>BACK TO HOMEPAGE</a>
            </div>
        );
    }

    customizeTooltip(arg) {
        return {
            text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`
        };
    }
}

export default NumberUsers;