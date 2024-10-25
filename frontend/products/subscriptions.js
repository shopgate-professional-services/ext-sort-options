import { appDidStart$, redirects, parseObjectToQueryString } from '@shopgate/engage/core';
import { CATEGORY_PATTERN, CATEGORY_ALL_PATTERN } from '@shopgate/engage/category';
import { SEARCH_PATTERN } from '@shopgate/engage/search';
import config from '../config';

const { defaultSortOption } = config;

/**
 * Subscriptions
 * @param {Function} subscribe subscribe
 */
export default (subscribe) => {
  if (defaultSortOption) {
    subscribe(appDidStart$, () => {
      /**
       * @param {Object} action .
       * @return {string}
       */
      const handler = ({ action }) => {
        const { params: { pathname }, route: { pathname: routePath, query } } = action;

        const { sort } = query;
        if (!sort) {
          query.sort = defaultSortOption;
          return `${routePath}${parseObjectToQueryString(query)}`;
        }

        return pathname;
      };

      redirects.set(CATEGORY_PATTERN, handler);
      redirects.set(SEARCH_PATTERN, handler);
      redirects.set(CATEGORY_ALL_PATTERN, handler);
    });
  }
};

