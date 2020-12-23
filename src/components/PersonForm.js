import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../store/selectors';
import * as actions from '../store/actions';
class PersonForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
    state = {
      id: '',
      enabled: '',
      name: {
        first: '',
        last: '',
      },
      age: '',
      company: '',
      email: '',
      createdAt: '',
      favoriteFruit: '',
    }

  onSubmit(e) {
    e.preventDefault()

    return this.props.save({ ...this.state  })
  }

  handleChange(e, field) {
    if (field === 'first' || field === 'last') {
      const { name } = { ...this.state };
      const currentState = name;
      const { value } = e.target;

      currentState[field] = value;

      this.setState({ name: currentState });
    } else {
      this.setState({ [field]: e.target.value });
    }
  }

  renderFields(field) {
    const { person } = this.props;
    
    // TODO: Come up with a more elegant way to handle first & last names
    return Object.keys(field).map(attr => {
      if (attr === 'name') {
        return (
          <React.Fragment>
            <div className='field'>
              <label>{`First Name: `}</label>
              <input onChange={e => this.handleChange(e, 'first')} defaultValue={this.state[attr].first.length > 0 ? this.state[attr].first : person[attr].first} />
            </div>
            <div className='field'>
              <label>{`Last Name: `}</label>
              <input onChange={e => this.handleChange(e, 'last')} defaultValue={this.state[attr].last.length > 0 ? this.state.last : person[attr].last} />
            </div>
          </React.Fragment>
        )
      } else {
        return (
          <div className='field'>
            <label>{`${attr}: `}</label>
            <input onChange={e => this.handleChange(e, attr)} defaultValue={this.state[attr].length > 0 ? this.state[attr] : person[attr]} />
          </div>
        ) 
      }
    })
  }

  updateField (e, id, field) {
    this.props.save({ activeId: id, [field]: e.target.value} )
  }

  render() {
    const { person } = this.props;
    console.log('ACTIVE PERSON', person);

    return (
      <div className="form">
        {
          person ? (
            <form onSubmit={this.onSubmit}>
              {this.renderFields(person)}
              <input type="submit" value="Update Person" />
            </form>
          ) :
          (
            ''
          )
        }
        
      </div>
      );
  }
}

export const mapStateToProps = state => {
  return {
    person: selectors.selectActivePerson(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  save: data => dispatch(actions.savePerson(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonForm);
