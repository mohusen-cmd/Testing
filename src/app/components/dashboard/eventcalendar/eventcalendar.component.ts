import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { isSameMonth, isSameDay, isToday, isFuture } from 'date-fns';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { DashboardService } from 'src/app/services/dashboard.service';
export const colors: any = {
  orange: {
    primary: '#FFA500',
    secondary: '#D1E8FF'
  },

  pink: {
    primary: '#fdbcf0',
    secondary: '#8d818b'
  },
  green: {
    primary: '#2ecc71',
    secondary: '#b1fdcf'
  }
};
@Component({
  selector: 'app-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.scss']
})
export class EventcalendarComponent implements OnInit {
  view = '';
  events: CalendarEvent[] = []
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;
  constructor(public service: DashboardService, public claims: ClaimsHelper, public router: Router, public toastr: ToastrManager, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.view = 'month'
    let UserId = this.claims.GetUserIdAPIKeyFromClaims()
    this.service.GeteventsCalender(UserId).subscribe((events: CalendarEvent) => {
      this.Bindeventstocalendar(events)
    })
  }
  Bindeventstocalendar(data) {
    
    var fetchevents = [];
    for (let i = 0; i < data.length; i++) {

      var title = data[i].text;
      var Module = data[i].Module;
      data[i].id = data[i].AccountTypeID + "M" + data[i].id;
      var startdate = data[i].start_date;
      var jsDate1 = startdate;
      if (jsDate1 == null) {
        return jsDate1 = "";
      }
      else if (jsDate1 != "") {
        
        var jsDatedata = new Date(Date.parse(startdate.toString()));
        var jsDate = new Date(Date.parse(jsDatedata.toString()));
        var stdate = (jsDate.getMonth() + 1) + '/' + jsDate.getDate() + '/' + jsDate.getFullYear();
        var fullDate = new Date(stdate);
        var twoDigitMonth = this.getMonth(fullDate);
        var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate;
        data[i].start_date = currentDate;
      }
      var enddate = data[i].end_date;
      var jsDate1 = enddate;
      if (jsDate1 == null) {
        return jsDate1 = "";
      }
      else if (jsDate1 != "") {
        
        var jsDatedata = new Date(Date.parse(enddate.toString()));
        var jsDate = new Date(Date.parse(jsDatedata.toString()));
        enddate = (jsDate.getMonth() + 1) + '/' + jsDate.getDate() + '/' + jsDate.getFullYear();
        var fullDate = new Date(enddate);
        var twoDigitMonth = this.getMonth(fullDate);
        var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate;
        data[i].end_date = currentDate;
      }

      var Due_Date = data[i].Due_Date;
      var jsDate1 = Due_Date;
      if (jsDate1 == null) {
        return jsDate1 = "";
      }
      else if (jsDate1 != "") {
        
        var jsDatedata = new Date(Date.parse(Due_Date.toString()));
        var jsDate = new Date(Date.parse(jsDatedata.toString()));
        Due_Date = (jsDate.getMonth() + 1) + '/' + jsDate.getDate() + '/' + jsDate.getFullYear();
        var fullDate = new Date(Due_Date);
        var twoDigitMonth = this.getMonth(fullDate);
        var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate;
        data[i].Due_Date = currentDate;
      }//Reminder_Date

      var Reminder_Date = data[i].Reminder_Date;
      var jsDate1 = Reminder_Date;
      if (jsDate1 == null) {
        return jsDate1 = "";
      }
      else if (jsDate1 != "") {
        
        var jsDatedata = new Date(Date.parse(Reminder_Date.toString()));
        var jsDate = new Date(Date.parse(jsDatedata.toString()));
        Reminder_Date = (jsDate.getMonth() + 1) + '/' + jsDate.getDate() + '/' + jsDate.getFullYear();
        var fullDate = new Date(Reminder_Date);
        var twoDigitMonth = this.getMonth(fullDate);
        var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
        var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate;
        data[i].Reminder_Date = currentDate;
      }


      if (title == "" || title == " ") {
        
        title = "No-Title"
      }

      var data1: any = {
        title: '', start: null, end: null, ActivityType: "", color: "", actions: this.actions
        , ActSubject: "", ContactName: "", Phone: "", Email: "", Notes: "", activityid: "", moduleid: ""
        , AccountType: "",
      };
      data1.title = title;
      data1.start = new Date(data[i].start_date);
      data1.end = new Date(data[i].end_date);
      data1.ActivityType = data[i].Activitytype;
      data1.ActSubject = data[i].ActSubject;
      data1.ContactName = data[i].ContactName;
      data1.Phone = data[i].Phone;
      data1.Email = data[i].Email;
      data1.Notes = data[i].Notes;
      data1.activityid = data[i].ActivityID;
      data1.moduleid = data[i].AccountTypeID;
      data1.AccountType = data[i].AccountTypeName;
      data1.actions = this.actions
      if (data[i].StatusID == 2) {
        data1.color = colors.orange;
      }
      else {
        

        var CurrDate = new Date();
        var currentnum = CurrDate.setDate(CurrDate.getDate() - 1);
        var sdatenum = new Date(data[i].start_date);
        var startdatenumber = sdatenum.setDate(sdatenum.getDate() - 1);
        if (startdatenumber > currentnum) {
          
          data1.color = colors.green;
        }
        else {
          

          data1.color = colors.pink;
        }
      }
      fetchevents.push(data1);
    }
    this.events = fetchevents
    console.log(this.events)
    this.refresh.next()
  }
  getMonth(date) {
    
    var month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
  }
  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   
  //   if (isSameMonth(date, this.viewDate)) {
  //     this.viewDate = date;
  //     if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
  //       this.activeDayIsOpen = false;
  //       if (events.length === 0) {
  //         this.toastr.warningToastr("Activity cannot be created for Past date(s).", "warning")
  //       }
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //   }
  // }
  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

  //   if (isSameMonth(date, this.viewDate)) {
  //     if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
  //       this.activeDayIsOpen = false;
  //     }
  //     else {
  //       this.activeDayIsOpen = true;
  //       this.viewDate = date;
  //     }
  //   }
  // }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    
    if (isSameMonth(date, this.viewDate)) {
      if (isToday(date) || isFuture(date)) {
        var dateField = this.GetDateFormat(date).replace(/\//g, '-');
        this.router.navigate(['/CRM/Common/CreateNewActivity'], { queryParams: { dateField:dateField} }); // Adjust the route as needed.
      } else {
        // Show a toaster message for past dates.
        this.toastr.warningToastr("Activity cannot be created for Past date(s).", "warning")
      }
    } else {
      // Show a toaster message for dates in the previous month.
      this.toastr.warningToastr("Activity cannot be created for Past date(s).", "warning")
    }
  }
  GetDateFormat(date) {
    
    const currentDate = new Date(date);
    // Get the year, month (0-11), and day (1-31)
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to get the actual month (1-12)
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`

  }

  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   this.activeDayIsOpen = false;
  //   if (isSameMonth(date, this.viewDate)) {
  //     this.viewDate = date;
  //     if (isToday(date) || isFuture(date) || events.length) {
  //       if (events.length > 0) {
  //         // Allow event creation only if there are events on the clicked date.
  //         this.activeDayIsOpen = !this.activeDayIsOpen
  //       }
  //     } else {
  //       // Show a toastr message for past dates.
  //       this.toastr.warningToastr("Activity cannot be created for Past date(s).", "warning");
  //       this.activeDayIsOpen = false;
  //     }
  //   }
  // }


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => { }
    },
  ];
  handleEvent(action: string, event: CalendarEvent): void {
    
    var eventdata: any = { ...event }
    var ActivityID = eventdata.activityid
    var moduleId = eventdata.moduleid
    var accounttype = eventdata.AccountType
    this.router.navigate(['/CRM/Common/GetActivityDetails'], { queryParams: { ActivityId: ActivityID, ModuleId: moduleId, AccountType: 'Activity' } }).then(nav => nav)
  }
}







