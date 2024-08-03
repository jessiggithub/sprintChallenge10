import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPizzaHistoryQuery } from '../state/pizzaApi';
import { updateFilter } from '../state/filtersSlice';

export default function OrderList() {
  const distpach = useDispatch();
  const orders = useGetPizzaHistoryQuery().data || [];
  const currentFilter = useSelector((state) => state.filters.size);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders && 
        orders
        .filter(
          (ord) => currentFilter === 'All' || currentFilter === ord.size
        )
        .map((ord) => {
          const { id, customer, size, toppings } = ord;
          return (
          <li key={id}>
            <div>
              {customer} ordered a size {size} with 
              {' '}
              {toppings?.length || 'no'} topping
              {toppings && toppings.length === 1 ? "" : "s"}
            </div>
          </li>
        );
      })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => {
            const onClick = () => distpach(updateFilter(size));
            const className = `button-filter${size === 'All' ? 'active' : ''}`;
            return (
             <button
               data-testid={`filterBtn${size}`}
              className={className}
              onClick={onClick}
              key={size}
              >
                {size}
              </button>
            );
          })}
      </div>
    </div>
  );
}
