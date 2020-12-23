import React from 'react';
import { connect } from 'react-redux';

// (Optional) Select component
import Select from 'react-select';

import * as selectors from '../store/selectors';
import * as actions from '../store/actions';

// Options for select
const FRUITS = ['ALL', 'banana', 'strawberry', 'apple'];

class PeopleList extends React.Component {
  constructor(props) {
    super(props);

    this.renderPeople = this.renderPeople.bind(this);
  }

  fruitSelector() {
    return FRUITS.map((fruit) => {
      return (
        <option>{fruit}</option>
      )
    })
  }

  renderPeople() {
    return this.props.people.map((person) => {
      return (
        <div className="person" onClick={() => this.props.setActiveId(person.id)}>{person.name.first}</div> 
      )
    })
  }
  
  render() {
    const { people } = this.props;

    console.log('PEOPLE', people);
    // eslint-disable-next-line no-unused-expressions
    return (
      <div>
        <select onChange={e => this.props.filter(e.target.value)}>
          {this.fruitSelector()}
        </select>
        <div className="list">
            {this.renderPeople()}
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => {
  return {
    people: selectors.selectFilteredPeople(state),
    activeId: selectors.selectActiveId(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  filter: filterValue => dispatch(actions.filterPeople(filterValue)),
  setActiveId: id => dispatch(actions.setActiveId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleList);
