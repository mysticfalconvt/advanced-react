import { mergeDeep } from '@apollo/client/utilities';
import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      // console.log(existing, args, cache);
      const { skip, first } = args;
      // first it asks read function for the items
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are items and tehre arent enough items to satisfy how many were requested
      // and we are on teh last page THEN just send it.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have any items go to network to get items
        return false;
      }

      // if there are items just return them
      if (items.length) {
        // console.log(
        //   `there are ${items.length} items in cache!! Gonna send them to appolo`,
        // );
        return items;
      }
      return false;
      // we can do 2 things:
      // first return the items because they are in cache
      // other thing it can do its return false and it will make a network request.
    },
    merge(existing, incoming, { args }) {
      // this runs when teh appolo client comes back from teh network with the products
      // console.log(`merging items from the network ${incoming.length}`);
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      // return merged items from cache
      return merged;
    },
  };
}
