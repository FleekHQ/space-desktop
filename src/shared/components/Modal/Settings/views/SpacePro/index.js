import React from 'react';
import { shell } from 'electron';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { getAccount } from '@events';

import PlanDetails from './components/PlanDetails';
import AddFundsBox from './components/AddFundsBox';
import SpaceProCard from './components/SpaceProCard';

import useStyles from './styles';

const SpacePro = () => {
  const classes = useStyles();
  const { user, spacePro } = useSelector((s) => ({
    user: s.user,
    spacePro: s.settings.spacePro,
  }));

  React.useEffect(() => {
    // retry request in case the first once was not success
    if (!spacePro.success) {
      getAccount();
    }
  }, []);

  // TODO: Redirect to the correct URL
  const onAddFunds = () => shell.openExternal(`https://space.storage/add_funds?username=${user.username}`);

  return (
    <>
      {
        spacePro.planInfo.paymentType === 'crypto' && (spacePro.planInfo.credits.severity === 'danger' || spacePro.planInfo.credits.severity === 'warning') && (
          <Box mb="15px">
            <AddFundsBox
              severity={spacePro.planInfo.credits.severity}
              onAddFunds={onAddFunds}
            />
          </Box>
        )
      }
      {
        spacePro.loading ? (
          <Box mb="15px">
            <Skeleton height={160} animation="wave" variant="rect" classes={{ root: classes.skeletonRoot }} />
          </Box>
        ) : (
          <SpaceProCard
            activated={spacePro.planInfo.isActive}
            username={user.username}
            // TODO: Redirect to the correct URL
            onGetSpacePro={() => shell.openExternal(`https://space.storage/pricing?username=${user.username}`)}
          />
        )
      }
      {
        spacePro.loading ? <Skeleton height={160} animation="wave" variant="rect" classes={{ root: classes.skeletonRoot }} /> : (
          <PlanDetails
            plan={spacePro.planInfo.plan}
            billDate={spacePro.planInfo.billDate}
            amount={spacePro.planInfo.credits.amount}
            paymentType={spacePro.planInfo.paymentType}
            severity={spacePro.planInfo.credits.severity}
            timeRemaining={spacePro.planInfo.credits.timeRemaining}
            onAddFounds={onAddFunds}
            // TODO: Redirect to the correct URL
            onChangePlan={() => shell.openExternal(`https://space.storage/change_plan?username=${user.username}`)}
          />
        )
      }
      {/* {
        // TODO: cancel plan is not prioritize yet
        spacePro && spacePro.planInfo && spacePro.planInfo.plan !== 'Basic' && (
          <Box mt="15px" color="#b5b5b5">
            <Button
              color="inherit"
              onClick={() => null}
            >
              Cancel
            </Button>
          </Box>
        )
      } */}
    </>
  );
};

export default SpacePro;
