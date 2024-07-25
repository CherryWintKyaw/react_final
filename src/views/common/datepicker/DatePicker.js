import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';


const DatePicker = props => {
    const handleDateChange = (date) => {
        // Do something with the selected date
        console.log(date);
      };
    
      const maxDate = new Date(); // Set max date to today

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
                id={props.id ? props.id : "date-picker-dialog"}
                className="date-css"
                disabled={props.disabled}
                value={props.value}
                onChange={props.change}
                clearable={props.clear !== undefined ? false : true}
                minDate={props.minDate !== null && props.minDate}
                maxDate={maxDate} // Set max date to todaymaxDate={maxDate} // Set max date to todaymaxDate={maxDate} // Set max date to todaymaxDate={maxDate} // Set max date to todaymaxDate={maxDate} // Set max date to today
                InputProps={{ readOnly: true }}
                disableToolbar={(props.format === 'month') ? true : false}
				        emptyLabel={props.format === "month" || props.format === "year-month"? "Select Month":"Select Date"}
                format={(props.format === 'year') ? 'yyyy' : (props.format === 'month') ? 'MMM' : (props.format === 'year-month')? 'yyyy-MM' : 'yyyy-MM-dd'}
                views={(props.format === 'year') ? ["year"] : (props.format === 'month') ? ["month"] : (props.format === 'year-month')? ["year","month"]:["year", "month", "date"]}
            />
        </MuiPickersUtilsProvider>
    )
}
export default DatePicker

