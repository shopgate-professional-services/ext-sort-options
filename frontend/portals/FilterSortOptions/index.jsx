import React from 'react';
import PropTypes from 'prop-types';
import { sortOptions } from '../../config';

const sortOptionsMapped = sortOptions
  ? Object.keys(sortOptions).map(key => ({
    value: key,
    label: sortOptions[key],
  }))
  : [];

/**
 * @returns {JSX}
 */
const FilterSortOptions = ({ children }) => {
  if (!sortOptions) {
    return children;
  }
  return React.cloneElement(children, {
    ...children.props,
    items: children.props.items.concat(sortOptionsMapped),
  });
};

FilterSortOptions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterSortOptions;
