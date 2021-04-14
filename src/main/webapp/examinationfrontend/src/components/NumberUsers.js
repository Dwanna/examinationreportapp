import React from "react";

import PieChart, {
    Legend,
    Series,
    Export,
    Label,
    SmallValuesGrouping,
    Connector
} from 'devextreme-react/pie-chart';

import { users } from '../service/dataUsers';

class NumberUsers extends React.Component{

    render() {
        return (
            <div>
                <PieChart
                    id="pie"
                    type="doughnut"
                    title="Number of user types in the system"
                    palette="Soft Pastel"
                    dataSource={users}
                >
                    <Series argumentField="userType" valueField="val">
                        <SmallValuesGrouping mode="topN" topCount={3} />
                        <Label
                            visible={true}
                            format="fixedPoint"
                            customizeText={this.customizeLabel}
                        >
                            <Connector visible={true} width={1} />
                        </Label>
                    </Series>
                    <Export enabled={true} />
                    <Legend horizontalAlignment="center" verticalAlignment="bottom" />
                </PieChart>
        <a href="/adminHomePage" className="btn btn-primary" style={{"margin-top":"40px"}}>BACK TO HOMEPAGE</a>
            </div>
        );
    }


}

export default NumberUsers;