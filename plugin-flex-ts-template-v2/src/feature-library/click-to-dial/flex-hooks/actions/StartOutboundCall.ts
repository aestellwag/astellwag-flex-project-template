import * as Flex from '@twilio/flex-ui';

import { isFeatureEnabled } from '../../config';
import { FlexAction, FlexActionEvent } from '../../../../types/feature-loader';

export const actionName = FlexAction.StartOutboundCall;
export const actionEvent = FlexActionEvent.after;
export const actionHook = async function enhanceClickToDialTaskAttributes(flex: typeof Flex) {
  if (!isFeatureEnabled()) return;
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload) => {
    console.warn(`afterStartOutboundCall Listener Triggered`);
    console.warn(payload);
    // Adding a window Event Listener to intercept attributes that are passed via the openCTI
    window.addEventListener('message', async (event) => {
      if (event.data.apiType === 'opencti') {
        console.warn('Window EventListner Triggered!');
        console.warn(event);
        console.warn('Response =', event.data.response);
        const windowResponse = event.data.response.returnValue;
        payload.taskAttributes = {
          case_id: windowResponse.recordId,
          phoneNumber: windowResponse.number,
          recordId: windowResponse.recordId,
          recordName: windowResponse.recordName,
          objectType: windowResponse.objectType,
          origin: 'SFDC',
        };
      }
    });
  });
};
