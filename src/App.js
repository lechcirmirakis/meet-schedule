import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './hoc/container';
import Navbar from './components/Navbar/navbar';
import List from './components/List/list';
import DelModal from './components/Modals/delModal';
import AddModal from './components/Modals/addModal';
import Filters from './components/Filters/filters';
import staticlist from './static/list';
import './App.scss';

const App = () => {
  console.log('App Render');
  
  const [meetListState, setMeetListState] = useState([]);
  const [addModalState, setAddModalState] = useState(false);
  const [filtersShowState, setFiltersShowState] = useState(false);

  useEffect(() => {
    console.log('first USe Effect for sort meetings');
    setMeetListState(staticlist.sort((a, b) => b['date'].localeCompare(a['date'])));
  }, []);

  const addModalTrigger = () => setAddModalState(prevState => !prevState);
  const filtersTrigger = () => setFiltersShowState(prevState => !prevState);

  const showItemDescript = id => {
    const meetList = [...meetListState];
    const meetIndex = meetList.findIndex(item => item.id === id);
    const openState = meetList[meetIndex].open;
    meetList[meetIndex].open = !openState;

    setMeetListState(meetList);
  }

  return (
    <div className='App'>
      <Navbar
        addTrigger={addModalTrigger}
        filtersState={filtersShowState}
        filtersTrigger={filtersTrigger}
      />
      <Container>
        {/* <Filters
          sortAscent={this.state.sortAscent}
          sortHandler={this.sortMeetings}
          filterHandler={this.filterMeetings}
          numberOfMeetings={this.state.list.length}
          updateDate={this.updateFiltersHandler}
          dateRange={this.state.dateRange}
          filtersState={this.state.filtersState}
          resetFilters={this.resetFilters}
        /> */}
        <List
          meetList={meetListState}
          showDescript={showItemDescript}
        // modalTrigger={this.modalTrigger}
        // filtersState={this.state.filtersState}
        />
        {/* <DelModal
          show={this.state.delModalShow}
          delTrigger={this.modalTrigger}
          delHandler={this.delMeetingHandler}
          meetTitle={this.state.meetToDel.title}
        /> */}
        <AddModal
          show={addModalState}
          addTrigger={addModalTrigger}
        // onAddMeeting={this.addMeetingHandler}
        />
      </Container>
    </div>
  )
}


// class App extends Component {
//   state = {
//     list: [],
//     listForReset: [],
//     delModalShow: false,
//     sortAscent: true,
//     filtersState: false,
//     dateRange: {
//       dateFrom: '',
//       dateTo: '',
//       disabledTo: true,
//       validInputs: false,
//       validDates: false
//     },
//     meetToDel: {
//       id: null,
//       title: ''
//     }
//   }

//   componentDidMount() {
//     console.log('component did MOUNT ');

//     this.setState({
//       list: staticlist,
//     }, () => {
//       this.sortMeetings();
//     })
//   }

//   // sorting list of meetings
//   sortMeetings = () => {
//     const allMeetings = [...this.state.list];
//     const sortState = this.state.sortAscent;
//     const sortKey = 'date';

//     if (!sortState) {
//       allMeetings.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
//     }
//     else {
//       allMeetings.sort((a, b) => b[sortKey].localeCompare(a[sortKey]))
//     }

//     this.setState({ list: allMeetings, sortAscent: !sortState });
//   }
//
//   filterMeetings = () => {
//     let dateFrom = Date.parse(this.state.dateRange.dateFrom);
//     let dateTo = Date.parse(this.state.dateRange.dateTo);
//     const dataRangeState = this.state.dateRange;

//     if (dateFrom < dateTo) {
//       console.log(true);
//       const listToFilter = this.state.list;
//       dataRangeState.validDates = true;

//       this.setState({ dateRange: dataRangeState, listForReset: listToFilter });
//     }
//     else {
//       console.log(false);

//       dataRangeState.validDates = 'error';
//       this.setState({ dateRange: dataRangeState });
//     }
//   }

//   resetFilters = () => {
//     const listBeforFilter = this.state.listForReset;
//     const dataRangeReset = this.state.dateRange;

//     dataRangeReset.dateFrom = '';
//     dataRangeReset.dateTo = '';
//     dataRangeReset.disabledTo = true;
//     dataRangeReset.validInputs = false;
//     dataRangeReset.validDates = false;

//     this.setState({ list: listBeforFilter, dateRange: dataRangeReset });
//   }

//   updateFiltersHandler = event => {
//     const dateName = event.target.name;
//     const dateValue = event.target.value;

//     const dateRange = { ...this.state.dateRange }
//     dateRange[dateName] = dateValue;

//     if (this.state.dateRange.dateFrom === '') {
//       dateRange.disabledTo = false;
//     }
//     if (this.state.dateRange.dateFrom !== '' && this.state.dateRange.dateTo === '') {
//       dateRange.validInputs = true;
//     }

//     this.setState({ dateRange: dateRange });
//   }
//   modalTrigger = (modal, id, title) => {
//     const modalState = modal === 'del' ? this.state.delModalShow : this.state.addModalShow;
//     const modalToTrigg = modal === 'del' ? 'delModalShow' : 'addModalShow';

//     if (!modalState && modal === 'del') {
//       const meetTodelState = this.state.meetToDel;
//       meetTodelState.id = id;
//       meetTodelState.title = title;

//       this.setState({ delModalShow: !modalState, meetToDel: meetTodelState });
//       return
//     }

//     // if (modal !== 'del') {
//     //   this.formReset();
//     // }

//     this.setState({ [modalToTrigg]: !modalState, hourValid: true });
//   }

//   delMeetingHandler = () => {
//     const meetList = [...this.state.list];
//     let refreshArray = meetList.filter(item => item.id !== this.state.meetToDel.id);

//     this.setState({ list: refreshArray, delModalShow: false });
//   }




//   addMeetingHandler = newMeet => {
//     const meetList = [...this.state.list];
//     meetList.push(newMeet);

//     this.setState({ list: meetList, addModalShow: false });
//   }
// }

export default App;
