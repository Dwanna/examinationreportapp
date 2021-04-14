const data = [

    { arg: 'Engineering', val: 50, parentID: '' },
    { arg: 'Business', val: 26, parentID: '' },
    { arg: 'Science', val: 24, parentID: '' },
    { arg: 'Msc. in Software Engineering', val: 30, parentID: 'Engineering' },
    { arg: 'Bsc. in Software Engineering', val: 20, parentID: 'Engineering' },
    { arg: 'Bsc. in Chemistry', val: 14, parentID: 'Science' },
    { arg: 'Bsc. in Food and Nutrition', val: 10, parentID: 'Science' },
    { arg: 'Bsc. in Accounting', val: 13, parentID: 'Business' },
    { arg: 'Bsc. in Economics', val: 13, parentID: 'Business' }

];

export default {
    filterData(name) {
        return data.filter(function (item) {
            return item.parentID === name;
        });
    }
};