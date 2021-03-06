import { getMonth, getDate } from 'date-fns';

import { Transaction } from 'types/Transaction';
import formatDate from 'utils/formatDate';

const getTransactionByDate = (
  transactions: Transaction[],
  value: number,
  dateType = 'withInMonth'
) => {
  let amount = 0;
  let selected = false;
  let selectedDate = '';

  transactions.forEach((transaction) => {
    let date = 0;

    switch (dateType) {
      case 'withInMonth':
        date = getDate(new Date(transaction.happened_on));
        break;
      case 'withInMoreThanMonth':
      case 'withInYear':
        date = getMonth(new Date(transaction.happened_on)) + 1;
        break;
    }

    if (value === date) {
      amount += transaction.amount;
      selectedDate = formatDate(transaction.happened_on);
      selected = true;
    }
  });

  if (selected) {
    return {
      amount,
      selectedDate,
    };
  }
};

export default getTransactionByDate;
