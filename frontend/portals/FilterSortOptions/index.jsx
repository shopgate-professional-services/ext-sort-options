import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { sortOptions, hideSortOptions } from '../../config';

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
  const props = useMemo(() => {
    if (!sortOptionsMapped.length && (!hideSortOptions || !hideSortOptions.length)) {
      return null;
    }

    let { items } = children.props;

    // Add custom options
    if (sortOptionsMapped.length) {
      items = items.concat(sortOptionsMapped);
    }

    // Hide some options
    if (hideSortOptions && hideSortOptions.length) {
      items = items.filter(i => !hideSortOptions.includes(i.value));
    }

    // Exclude duplicates, apply custom i18n
    items = items
      .reverse()
      .filter((i, ind) => items.findIndex(s => s.value === i.value) === ind)
      .reverse();

    return { items };
  }, [children.props]);

  if (!props) {
    return children;
  }

  return React.cloneElement(children, {
    ...children.props,
    ...props,
  });
};

FilterSortOptions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterSortOptions;
