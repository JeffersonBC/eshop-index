import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  public readonly dateParams = [{
    monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November' , 'December' ],
    weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday' ],
    weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
    weekdaysLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    format: 'mm/dd/yyyy',
    min: [2017, 2, 3],
    max: [2025, 11, 31],
    selectMonths: true,
    selectYears: 20,
    today: 'Today',
    clear: 'Clear',
    close: 'OK',
    closeOnSelect: false
  }];

  dateAmericanToISO(dateString: string) {
    const dateArray = dateString.split('/');
    console.log(`string: ${dateString} - array: ${dateArray}`);

    return `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
  }

  dateISOtoAmerican(dateString: string) {
    const dateArray = dateString.split('-');
    console.log(`string: ${dateString} - array: ${dateArray}`);

    return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
  }
}
