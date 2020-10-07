import React from 'react';
import { shell } from 'electron';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import PlanDetails from './components/PlanDetails';
import AddFundsBox from './components/AddFundsBox';
import SpaceProCard from './components/SpaceProCard';

const ProductKey = () => {
  const { user, productKey } = useSelector((s) => ({
    user: s.user,
    productKey: s.settings.productKey,
  }));

  // TODO: Redirect to the correct URL
  const onAddFunds = () => shell.openExternal(`https://space.storage/add_funds?username=${user.username}`);

  return (
    <>
      {
        productKey && productKey.planIfo && productKey.planIfo.type === 'crypto' && (
          <Box mb="15px">
            <AddFundsBox
              severity="danger"
              message="Balance is dangerously low. Refill now to avoid losing files."
              tooltipMessage="If you don't add funds to your balance to cover your next monthly bill, your files will be removed from Space 14 days after your next billing date. Please add funds now to avoid any disruption in service and potentially losing your files."
              onAddFunds={onAddFunds}
            />
          </Box>
        )
      }
      <SpaceProCard
        activated={false}
        username={user.username}
        // TODO: Redirect to the correct URL
        onGetSpacePro={() => shell.openExternal(`https://space.storage/pricing?username=${user.username}`)}
      />
      <PlanDetails
        plan={!productKey.planInfo && 'Basic'}
        onAddFounds={onAddFunds}
        // TODO: Redirect to the correct URL
        onChangePlan={() => shell.openExternal(`https://space.storage/change_plan?username=${user.username}`)}
      />
      {
        productKey && productKey.planInfo && (
          <Box mt="15px" color="#b5b5b5">
            <Button
              color="inherit"
              onClick={() => null}
            >
              Cancel
            </Button>
          </Box>
        )
      }
    </>
  );
};

export default ProductKey;
