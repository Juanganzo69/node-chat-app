var moment = require('moment');

moment.locale('es',{
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_')
});

var someTimeStap = moment().valueOf();
console.log(someTimeStap);


var date = moment(someTimeStap);
// console.log(date.format('MMMM Do YYYY'));
console.log(date.format('h:mm a'));
