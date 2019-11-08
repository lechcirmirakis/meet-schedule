export default {
    name: {
      value: '',
      title: 'Meeting title',
      validText: 'Enter the meeting title!',
      required: true,
      type: 'text',
      placeholder: 'Meeting title'
    },
    descript: {
      value: '',
      title: 'Meeting description',
      validText: 'Enter the meeting descript!',
      required: true,
      as: 'textarea',
      rows: '4',
      placeholder: 'Meeting description'
    },
    date: {
      value: '',
      title: 'Meeting date',
      validText: 'Enter the meeting date (min today date)!',
      required: true,
      type: 'date',
      placeholder: null,
      min: ''
    },
    start: {
      value: '',
      title: 'Start of meeting',
      validText: 'Select the meeting start time!',
      required: true,
      type: 'time'
    },
    end: {
      value: '',
      title: 'End of meeting',
      validText: 'Select the meeting end time!',
      required: true,
      type: 'time'
    },
  }