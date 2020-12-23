import { createSelector } from 'reselect';
import find from 'lodash/find';

export const selectPeople = state => state.people;
export const selectActiveId = state => state.activeId;
export const selectFilterValue = state => state.filterValue;

export const selectActivePerson = createSelector(
  selectPeople,
  selectActiveId,
  (people, activeId) => find(people, { id: activeId }),
);

export const selectFilteredPeople = createSelector(
  selectPeople,
  selectFilterValue,
  (people, filterValue) => {
    // Add Filter Logic Here
    return people.filter((person) => {
      return filterValue === 'ALL' ? person : person.favoriteFruit === filterValue
    })
  },
);
