import { getFeatureFlags } from '../../utils/configuration';
import ClickToDialConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.click_to_dial as ClickToDialConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
