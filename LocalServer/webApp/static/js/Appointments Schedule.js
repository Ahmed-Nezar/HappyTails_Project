{
    const Helpers = {
    isValidDate: (date) => {
      return (
        date &&
        Object.prototype.toString.call(date) === "[object Date]" &&
        !isNaN(date)
      );
    },
    getFormattedDate: (date) => {
        const year = date.getFullYear();
        let month = "" + (date.getMonth() + 1); // Add 1 to get the correct month
        let day = "" + date.getDate();
      
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
      
        return `${year}/${month}/${day}`;
      },
      
    getUpdatedObject: (oldObject, updatedObject) => {
      return Object.assign({}, oldObject, updatedObject);
    }
  };
  
  const AppointmentItem = ({ dateKey, appointment, onAppointmentItemClick }) => {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "appointment__item",
        "data-datekey": dateKey,
        onClick: onAppointmentItemClick
      },
      appointment &&
        appointment.title /*#__PURE__*/ &&
        React.createElement(
          "div",
          { className: "appointment__item-content" } /*#__PURE__*/,
          React.createElement("div", {
            className: "appointment__item-indicator"
          }) /*#__PURE__*/,
          React.createElement(
            "div",
            { className: "appointment__item-title truncate--small" },
            " ",
            appointment.title,
            " "
          )
        )
    );
  };
  
  const AppointmentDetail = ({
    appointment,
    onAppointmentEdit,
    onAppointmentDelete,
    onCancelClick
  }) => {
    const { title, description, date, time, selectedPet } = appointment;
    return /*#__PURE__*/ React.createElement(
      "div",
      { className: "p-1" } /*#__PURE__*/,
      React.createElement(
        "div",
        { className: "section-heading" },
        "Appointment Detail"
      ) /*#__PURE__*/,
  
      React.createElement(
        "div",
        { className: "content appointment__detail" } /*#__PURE__*/,
        React.createElement(
          "div",
          { className: "card" } /*#__PURE__*/,
          React.createElement(
            "div",
            { className: "card-header has-background-primary" } /*#__PURE__*/,
            React.createElement(
              "div",
              { className: "card-header-title appointment__detail-title" },
              title
            ) /*#__PURE__*/,
  
            React.createElement("button", {
              className: "delete p-0",
              onClick: onCancelClick
            })
          ) /*#__PURE__*/,
  
          React.createElement(
            "div",
            { className: "card-content" } /*#__PURE__*/,
            React.createElement(
              "div",
              { className: "content" } /*#__PURE__*/,
              React.createElement(
                "p",
                { className: "appointment__detail-description" },
                " ",
                description,
                " "
              ) /*#__PURE__*/,
              
            React.createElement(
                'p',
                { className: 'appointment__detail-date' },
                ' ',
                `${Helpers.getFormattedDate(date)}, ${time}, `,
                React.createElement('span',{ className: 'has-text-weight-bold' },'Pet:'), ' ',`${selectedPet || 'N/A'}`,
            ),
          ) /*#__PURE__*/,
  
          React.createElement(
            "footer",
            { className: "card-footer p-0" } /*#__PURE__*/,
            React.createElement(
              "a",
              {
                className: "button br-0 p-2 mr-4 mt-2 is-warning card-footer-item",
                onClick: onAppointmentEdit
              },
              "Edit"
            ) /*#__PURE__*/,
            React.createElement(
              "a",
              {
                className: "button br-0 p-2 mt-2 is-danger card-footer-item",
                onClick: onAppointmentDelete
              },
              "Delete"
            )
          )
        )
      )
    )
    );
  };
  
  const AppointmentForm = ({
    isEditMode,
    appointment,
    onInputChange,
    onAppointmentFormSubmit,
    onAppointmentFormCancel
  }) => {
    const { title, description, date, time, selectedPet, isDropdownActive } = appointment;
    isEditMode = isEditMode || false;
    const formTitle = isEditMode ? "Update Appointment" : "Add New Appointment";
    const handlePetSelection = (e) => {
      const selectedPet = e.target.textContent;
      onInputChange({ target: { name: "selectedPet", value: selectedPet } });
    };
    const toggleDropdown = () => {
      $('.js-dropdown-list').toggleClass('dropdown-active');
      if ($('.js-dropdown-list').hasClass('dropdown-active')) {
          $(".fa-chevron-down").css({
              "transform": "rotate(180deg)",
          })
      } else {
          $(".fa-chevron-down").css({
              "transform": "rotate(0deg)",
          })
      }
    };
    return /*#__PURE__*/ React.createElement(
      "div",
      null /*#__PURE__*/,
      React.createElement(
        "div",
        { className: "section-heading" } /*#__PURE__*/,
        React.createElement("h3", null, formTitle)
      ) /*#__PURE__*/,
  
      React.createElement(
        "form",
        {
          className: "has-background-white-ter p-3",
          onSubmit: onAppointmentFormSubmit,
          "data-datakey": Helpers.getFormattedDate(date)
        } /*#__PURE__*/,
        React.createElement(
          "div",
          { className: "field" } /*#__PURE__*/,
          React.createElement(
            "label",
            { className: "label" },
            "Title"
          ) /*#__PURE__*/,
          React.createElement(
            "div",
            { className: "control" } /*#__PURE__*/,
            React.createElement("input", {
              name: "title",
              value: title,
              className: "input",
              type: "text",
              placeholder: "Enter Title",
              onChange: onInputChange,
              required: true
            })
          )
        ) /*#__PURE__*/,
  
        React.createElement(
          "div",
          { class: "field" } /*#__PURE__*/,
          React.createElement(
            "label",
            { class: "label" },
            "Description"
          ) /*#__PURE__*/,
          React.createElement(
            "div",
            { class: "control" } /*#__PURE__*/,
            React.createElement(
              "textarea",
              {
                name: "description",
                class: "textarea",
                placeholder: "Enter Description",
                onChange: onInputChange
              },
              description
            )
          )
        ) /*#__PURE__*/,
        React.createElement(
        "div",
        { class: "field is-grouped", style: {justifyContent: "space-around"}},
         /*#__PURE__*/
            React.createElement(
                "div",
                { class: "field" }, /*#__PURE__*/
                React.createElement(
                "label",
                { class: "label" },
                "Time"
                ) /*#__PURE__*/,
                React.createElement(
                    "div",
                    { class: "control" }, /*#__PURE__*/
                    React.createElement("input", {
                        name: "time",
                        value: time,
                        className: "input",
                        type: "time",
                        onChange: onInputChange,
                        required: true
                    })
                ) /*#__PURE__*/
            ),
            React.createElement(
                "div",
                { class: "field" },
                React.createElement(
                    "label",
                    { className: "label" },
                    "Pet",
                ),React.createElement(
                    "div",{class:"dropdown", onClick: toggleDropdown },
                    React.createElement(
                        "div",{class:"js-link",style:{width: "7rem",padding:"5px 10px"}}, selectedPet ||"Select Pet",
                        React.createElement(
                            "i",{class:"fa fa-chevron-down mt-1"},
                        )
                    ),React.createElement(
                        "ul",{class:"js-dropdown-list"},
                        React.createElement(
                            "li",{class:"",onClick: handlePetSelection},"Pet1"
                        ),
                        React.createElement(
                            "li",{class:"",onClick: handlePetSelection},"Pet2"
                        )
                    )
                )
            )
        ), 
        React.createElement(
        'p',
        { className: 'is-italic mb-3' },
        /*#__PURE__*/ React.createElement(
            'span',
            { className: 'has-text-weight-bold' },
            'Appointment Date:'
        ),
        ' ',
        Helpers.getFormattedDate(date),
        ' ',
        time
        ),

        React.createElement(
          "div",
          { class: "field is-grouped" } /*#__PURE__*/,
          React.createElement(
            "div",
            { class: "control" } /*#__PURE__*/,
            React.createElement(
              "button",
              { type: "submit", class: "button is-primary" },
              "Save"
            )
          ) /*#__PURE__*/,
  
          React.createElement(
            "div",
            { class: "control" } /*#__PURE__*/,
            React.createElement(
              "button",
              {
                type: "button",
                class: "button",
                onClick: onAppointmentFormCancel
              },
              "Cancel"
            )
          )
        )
      
    )
    );
  };
  
  const CalendarHeader = (props) => {
    const { onPrevMonthClick, onNextMonthClick, monthName, year } = props;
    return /*#__PURE__*/ React.createElement(
      "div",
      { className: "calendar__header" } /*#__PURE__*/,
      React.createElement(
        "div",
        { className: "calendar__controls" } /*#__PURE__*/,
        React.createElement(
          "div",
          {
            className: "calendar__control-icon",
            onClick: onPrevMonthClick
          } /*#__PURE__*/,
          React.createElement("span", { className: "icon is-medium" }, "<")
        ) /*#__PURE__*/,
  
        React.createElement(
          "div",
          {
            className: "calendar__control-icon",
            onClick: onNextMonthClick
          } /*#__PURE__*/,
          React.createElement("span", { className: "icon is-medium" }, ">")
        )
      ) /*#__PURE__*/,
  
      React.createElement(
        "div",
        { className: "calendar__title" },
        monthName,
        " ",
        year
      )
    );
  };
  
  const CalendarRowItem = (props) => {
    const {
      day,
      date,
      index,
      onCalendarItemClick,
      onAppointmentItemClick,
      appointments
    } = props;
    const dateKey = Helpers.getFormattedDate(
      new Date(date.getFullYear(), date.getMonth(), day)
    );
    const _getDayAppointment = (appointments, dateKey) => {
      return appointments.hasOwnProperty(dateKey) ? appointments[dateKey] : null;
    };
    const appointment = _getDayAppointment(appointments, dateKey);
    if (day > 0) {
      return /*#__PURE__*/ React.createElement(
        "td",
        { key: index } /*#__PURE__*/,
        React.createElement(
          "div",
          {
            className: "calendar__item",
            onClick: onCalendarItemClick,
            "data-datekey": dateKey
          } /*#__PURE__*/,
          React.createElement(
            "div",
            {
              className: "calendar__item-title",
              onClick: (e) => e.stopPropagation()
            },
            day
          ),
          appointment &&
            /*#__PURE__*/ React.createElement(AppointmentItem, {
              date: date,
              dateKey: dateKey,
              appointment: appointment,
              onAppointmentItemClick: onAppointmentItemClick
            })
        )
      );
    }
    return /*#__PURE__*/ React.createElement("td", { key: index }, "\xA0");
  };
  
  const CalenderRowList = ({
    date,
    onCalendarItemClick,
    onAppointmentItemClick,
    appointments
  }) => {
    const _getCalendarDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week (0 - 6)
        const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
        let calendarDays = [];
      
        // Insert leading empty cells based on the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
          calendarDays.push(-1);
        }
      
        // Build calendar days
        for (let i = 1; i <= numberOfDaysInMonth; i++) {
          calendarDays.push(i);
        }
      
        return calendarDays;
      };
    const _getCalendarBody = (calendarDays) => {
      let rows = [];
      let rowItems = [];
      let itemCount = 1;
      calendarDays.map((dayNumber, index) => {
        rowItems.push(
          /*#__PURE__*/ React.createElement(CalendarRowItem, {
            date: date,
            day: dayNumber,
            index: index,
            onCalendarItemClick: onCalendarItemClick,
            onAppointmentItemClick: onAppointmentItemClick,
            appointments: appointments
          })
        );
  
        if (itemCount % 7 === 0) {
          rows.push(
            /*#__PURE__*/ React.createElement(
              "tr",
              { key: `row_${index}` },
              rowItems
            )
          );
          rowItems = [];
        }
        itemCount++;
      });
  
      // handle edge case: when remaining rowitems is less than a mulitple of 7
      if (rowItems.length > 0) {
        rows.push(
          /*#__PURE__*/ React.createElement("tr", { key: "row_last" }, rowItems)
        );
      }
      return rows;
    };
  
    return _getCalendarBody(_getCalendarDays(date));
  };
  
  const CalendarBody = (props) => {
    const {
      date,
      onCalendarItemClick,
      onAppointmentItemClick,
      appointments
    } = props;
    return /*#__PURE__*/ React.createElement(
      "table",
      {
        className:
          "table is-bordered is-fullwidth calendar__table calendar__table--center"
      } /*#__PURE__*/,
      React.createElement(
        "thead",
        null /*#__PURE__*/,
        React.createElement(
          "tr",
          null /*#__PURE__*/,
          React.createElement("td", null, "Sun") /*#__PURE__*/,
          React.createElement("td", null, "Mon") /*#__PURE__*/,
          React.createElement("td", null, "Tue") /*#__PURE__*/,
          React.createElement("td", null, "Wed") /*#__PURE__*/,
          React.createElement("td", null, "Thu") /*#__PURE__*/,
          React.createElement("td", null, "Fri") /*#__PURE__*/,
          React.createElement("td", null, "Sat")
        )
      ) /*#__PURE__*/,
  
      React.createElement(
        "tbody",
        null /*#__PURE__*/,
        React.createElement(CalenderRowList, {
          date: date,
          onCalendarItemClick: onCalendarItemClick,
          onAppointmentItemClick: onAppointmentItemClick,
          appointments: appointments
        })
      )
    );
  };
  
  const Calendar = (props) => {
    /**
     * Week Days => Sunday (0) - Saturday (6)
     * Months => January (0) - December (11)
     */
    const MONTH_NAMES = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December"
    };
  
    const {
      date,
      onPrevMonthClick,
      onNextMonthClick,
      onCalendarItemClick,
      onAppointmentItemClick,
      appointments
    } = props;
    const year = date.getFullYear();
    const monthName = MONTH_NAMES[date.getMonth()];
  
    return /*#__PURE__*/ React.createElement(
      "div",
      { className: "calendar calender--light p-1" } /*#__PURE__*/,
      React.createElement(CalendarHeader, {
        onPrevMonthClick: onPrevMonthClick,
        onNextMonthClick: onNextMonthClick,
        monthName: monthName,
        year: year
      }) /*#__PURE__*/,
  
      React.createElement(CalendarBody, {
        date: date,
        onCalendarItemClick: onCalendarItemClick,
        onAppointmentItemClick: onAppointmentItemClick,
        appointments: appointments
      })
    );
  };
  
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        calendarData: {
          currentDate: new Date()
        },
  
        appointments: {},
        appointment: {
          id: null,
          title: "",
          description: "",
          date: null
        },
  
        isNewAppointment: false,
        isEditAppointment: false,
        isViewAppointment: false
      };
  
      this.handlePrevMonthClick = this.handlePrevMonthClick.bind(this);
      this.handleNextMonthClick = this.handleNextMonthClick.bind(this);
      this.handleCalendarItemClick = this.handleCalendarItemClick.bind(this);
      this.handleAppointmentItemClick = this.handleAppointmentItemClick.bind(
        this
      );
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleAppointmentFormSubmit = this.handleAppointmentFormSubmit.bind(
        this
      );
      this.handleAppointmentUpdateFormSubmit = this.handleAppointmentUpdateFormSubmit.bind(
        this
      );
      this.handleAppointmentActionCancel = this.handleAppointmentActionCancel.bind(
        this
      );
      this.resetSideViews = this.resetSideViews.bind(this);
      this.handleAppointmentEdit = this.handleAppointmentEdit.bind(this);
      this.handleAppointmentDelete = this.handleAppointmentDelete.bind(this);
    }
  
    get initialAppointmentState() {
      return {
        id: null,
        title: "",
        description: "",
        date: null
      };
    }
  
    getPrevMonthDate(date) {
      /**
       *
       * check if previous month is less than  January (0)
       * and decrement year by one and set previous month to December (11)
       *
       * returns new Date()
       */
      if (!Helpers.isValidDate(date)) {
        throw new Error("ArgumentError: Invalid Date");
      }
      let prevMonth = date.getMonth() - 1;
      let year = date.getFullYear();
      if (prevMonth < 0) {
        year -= 1;
        prevMonth = 11;
      }
      return new Date(year, prevMonth);
    }
  
    getNextMonthDate(date) {
      /**
       *
       * checks if next month is more than December (11)
       * and increment year by one and set next month to January (0)
       *
       * returns new Date()
       */
      if (!Helpers.isValidDate(date)) {
        throw new Error("ArgumentError: Invalid Date");
      }
      let nextMonth = date.getMonth() + 1;
      let year = date.getFullYear();
      if (nextMonth > 11) {
        year += 1;
        nextMonth = 0;
      }
      return new Date(year, nextMonth);
    }
  
    handlePrevMonthClick() {
      this.setState({
        calendarData: {
          currentDate: this.getPrevMonthDate(this.state.calendarData.currentDate)
        }
      });
    }
    handleNextMonthClick() {
      this.setState({
        calendarData: {
          currentDate: this.getNextMonthDate(this.state.calendarData.currentDate)
        }
      });
    }
  
    handleInputChange(e) {
      let tempAppointment = { ...this.state.appointment };
      if (e.target.name === 'time') {
        // Update the time property
        tempAppointment.time = e.target.value;
      } else {
        // Update other properties as usual
        tempAppointment[e.target.name] = e.target.value;
      }
    
      this.setState({
        appointment: tempAppointment
      });
    }
  
    resetSideViews() {
      this.setState({
        isEditAppointment: false,
        isNewAppointment: false,
        isViewAppointment: false
      });
    }
  
    handleCalendarItemClick(e) {
      e.stopPropagation();
      this.resetSideViews();
      const dataKey = e.currentTarget.dataset.datekey;
      const dateFields = dataKey.split("/");
      const itemDate = new Date(dateFields[0], dateFields[1], dateFields[2]);
      const newAppointment = this.initialAppointmentState;
      newAppointment.id = dataKey;
      newAppointment.date = new Date(dateFields[0], dateFields[1] - 1, dateFields[2]);;
      this.setState({
        appointment: newAppointment,
        isNewAppointment: true
      });
    }
  
    handleAppointmentItemClick(e) {
      e.stopPropagation();
      this.resetSideViews();
      const dataKey = e.currentTarget.dataset.datekey;
      const { appointments } = this.state;
      if (appointments.hasOwnProperty(dataKey)) {
        this.setState({
          isViewAppointment: true,
          appointment: { ...appointments[dataKey] }
        });
      }
    }
  
    handleAppointmentFormSubmit(e) {
      e.preventDefault();
      const { appointments, appointment } = this.state;
      if (!appointment.selectedPet) {
        alert("Please choose a pet.");
        return;
      }
      if (appointments.hasOwnProperty(appointment.id)) {
        alert("An appointment already exists on this day.");
        return;
      }
      const currentAppointments = { ...appointments };
      currentAppointments[appointment.id] = appointment;
      this.setState({
        appointments: currentAppointments
      });
  
      // reset form
      e.currentTarget.reset();
      this.setState({
        appointment: this.initialAppointmentState,
        isNewAppointment: false
      });
    }
  
    handleAppointmentEdit(e) {
      this.setState({
        isViewAppointment: false,
        isEditAppointment: true
      });
    }
  
    handleAppointmentDelete(e) {
      const { appointments, appointment } = this.state;
      if (
        appointments.hasOwnProperty(appointment.id) &&
        confirm("Are you sure you want to delete this Appointment?")
      ) {
        const currentAppointments = { ...appointments };
        delete currentAppointments[appointment.id];
        this.setState({
          appointments: currentAppointments
        });
      }
      this.resetSideViews();
    }
  
    handleAppointmentUpdateFormSubmit(e) {
      e.preventDefault();
      const { appointments, appointment } = this.state;
      if (appointments.hasOwnProperty(appointment.id)) {
        const currentAppointments = { ...appointments };
        appointment.date = new Date(Date.now());
        currentAppointments[appointment.id] = appointment;
        this.setState({
          appointments: currentAppointments
        });
  
        // reset form
        e.currentTarget.reset();
        this.resetSideViews();
        this.setState({
          appointment: this.initialAppointmentState
        });
      }
    }
  
    handleAppointmentActionCancel(e) {
      this.resetSideViews();
      this.setState({
        appointment: this.initialAppointmentState
      });
    }
  
    render() {
      const {
        calendarData,
        appointments,
        isEditAppointment,
        isNewAppointment,
        isViewAppointment,
        appointment
      } = this.state;
      const isActivateSideView =
        isNewAppointment || isViewAppointment || isEditAppointment;
      return /*#__PURE__*/ React.createElement(
        "div",
        { className: "container" } /*#__PURE__*/,
        React.createElement(
          "div",
          { className: "columns" } /*#__PURE__*/,
          React.createElement(
            "div",
            { className: "column" } /*#__PURE__*/,
            React.createElement(Calendar, {
              date: calendarData.currentDate,
              onPrevMonthClick: this.handlePrevMonthClick,
              onNextMonthClick: this.handleNextMonthClick,
              onCalendarItemClick: this.handleCalendarItemClick,
              onAppointmentItemClick: this.handleAppointmentItemClick,
              appointments: appointments
            })
          ),
  
          isActivateSideView &&
            /*#__PURE__*/ React.createElement(
              "div",
              { className: "column is-one-third" },
              isNewAppointment &&
                /*#__PURE__*/ React.createElement(AppointmentForm, {
                  appointment: appointment,
                  onInputChange: this.handleInputChange,
                  onAppointmentFormSubmit: this.handleAppointmentFormSubmit,
                  onAppointmentFormCancel: this.handleAppointmentActionCancel
                }),
  
              isViewAppointment &&
                /*#__PURE__*/ React.createElement(AppointmentDetail, {
                  appointment: appointment,
                  onAppointmentEdit: this.handleAppointmentEdit,
                  onAppointmentDelete: this.handleAppointmentDelete,
                  onCancelClick: this.handleAppointmentActionCancel
                }),
  
              isEditAppointment &&
                /*#__PURE__*/ React.createElement(AppointmentForm, {
                  appointment: appointment,
                  onInputChange: this.handleInputChange,
                  onAppointmentFormSubmit: this.handleAppointmentUpdateFormSubmit,
                  onAppointmentFormCancel: this.handleAppointmentActionCancel
                })
            )
        )
      );
    }
  }
  
  ReactDOM.render(
    /*#__PURE__*/ React.createElement(App, null),
    document.getElementById("root")
  );
};