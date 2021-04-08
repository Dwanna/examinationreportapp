import React from "react";
import { dataSource } from '../service/dataLecturer';

import Funnel, {
    Title,
    Margin,
    Export,
    Tooltip,
    Item,
    Border,
    Label
} from 'devextreme-react/funnel';

class LecturerType extends React.Component{


    render(){
        return(
            <div>
                <Funnel id="funnel"
                        dataSource={dataSource}
                        palette="Soft Pastel"
                        argumentField="argument"
                        valueField="value"
                >
                    <Title text="Number of lectures per courses">
                        <Margin bottom={30} />
                    </Title>
                    <Export enabled={true} />
                    <Tooltip enabled={true} format="fixedPoint" />
                    <Item>
                        <Border visible={true} />
                    </Item>
                    <Label
                        visible={true}
                        position="inside"
                        backgroundColor="none"
                        customizeText={formatLabel}
                    />
                </Funnel>

                <a href="/adminHomePage" className="btn btn-primary" style={{"margin-top":"40px"}}>BACK</a>
            </div>


        )
    }

}
function formatLabel(arg) {
    return `<span class="label">${arg.percentText}</span><br/>${arg.item.argument}`;
}

export default LecturerType;