import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { useAppSelector } from 'app/hooks';
import { CURRENCIES } from 'constants/currency';
import TransactionMenuActions from 'features/transactions/TransactionMenuActions';
import { Transaction } from 'types/Transaction';
import formatMoney from 'utils/formatMoney';

interface Props {
  transaction: Transaction;
  hasMenu?: boolean;
}

const useStyles = makeStyles((theme) => ({
  expense: {
    color: theme.palette.error.main,
  },
  income: {
    color: theme.palette.primary.main,
  },
  amount: {
    marginTop: 10,
  },
  datesContainer: {
    marginBottom: 10,
  },
  cardContainer: {
    display: 'flex',
  },
  infoContainer: {
    flex: 1,
  },
  actionsContainer: {
    padding: 5,
  },
  mainInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
}));

const TransactionCard: React.FC<Props> = ({ transaction, hasMenu = true }) => {
  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  const amountClassName = transaction.type === 'expense' ? classes.expense : classes.income;

  const amountOperation = transaction.type === 'expense' ? '-' : '+';

  const currencyCode = user?.currency || 'USD';
  const locale = CURRENCIES[currencyCode].locale;

  return (
    <Card>
      <CardContent>
        <div className={classes.cardContainer}>
          <div className={classes.infoContainer}>
            <div className={classes.datesContainer}>
              <Typography variant="body2" color="textSecondary">
                {transaction.happened_on}
              </Typography>
            </div>
            <Typography variant="h6" component="h2">
              {transaction.category.title}
            </Typography>

            <div className={classes.mainInfoContainer}>
              <Typography variant="body1" component="h2">
                {transaction.title}
              </Typography>

              <Typography variant="h6" className={amountClassName}>
                {amountOperation}
                {formatMoney(transaction.amount, currencyCode, locale)}
              </Typography>
            </div>
          </div>
          {hasMenu && <TransactionMenuActions transaction={transaction} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
