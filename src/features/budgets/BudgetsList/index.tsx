import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Alert from '@material-ui/lab/Alert';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchBudgets, selectBudgetsByStatus } from 'features/budgets/budgetsSlice';

import BudgetCard from './BudgetCard';

const useStyles = makeStyles(() =>
  createStyles({
    amount: {
      textAlign: 'center',
      marginTop: 10,
    },
    progress: {
      marginTop: 20,
    },
    tabsContainer: {
      margin: '15px 0',
    },
    alertContainer: {
      margin: '20px 8px',
      width: '100%',
    },
    loadingContainer: {
      textAlign: 'center',
      margin: '100px 0',
    },
  })
);

const BudgetList = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const selectedBudgetStatus = value === 0 ? 'on going' : 'finished';

  const { status } = useAppSelector((state) => state.budgets);

  const budgets = useAppSelector((state) => selectBudgetsByStatus(state, selectedBudgetStatus));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBudgets());
    }
  }, [status, dispatch]);

  const handleTabChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };

  if (status === 'idle' || status === 'loading') {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          aria-label="budgets tab"
          className={classes.tabsContainer}
          centered
        >
          <Tab label="On Going" />
          <Tab label="Finished" />
        </Tabs>
      </Paper>
      <Grid container spacing={2}>
        {budgets.length > 0 ? (
          budgets.map((budget) => (
            <Grid item xs={12} key={budget.id}>
              <BudgetCard budget={budget} />
            </Grid>
          ))
        ) : (
          <Alert className={classes.alertContainer} severity="info">
            No {selectedBudgetStatus} budgets yet.
          </Alert>
        )}
      </Grid>
    </>
  );
};

export default BudgetList;
