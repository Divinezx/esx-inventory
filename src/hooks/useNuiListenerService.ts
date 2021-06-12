import { useSetPrimaryContainerState, useSetSecondaryContainerState } from '../state/container.state';
import { useSetIsMenuVisible } from '../state/visibility.state';
import { useNuiEvent } from './useNuiEvent';

export const useNuiListenerService = (): any => {

  const setVisibility = useSetIsMenuVisible();
  useNuiEvent('inventory', 'setVisibility', setVisibility);

  const setPrimaryContainer = useSetPrimaryContainerState();
  useNuiEvent('inventory', 'setPrimaryContainer', setPrimaryContainer);

  const setSecondaryContainer = useSetSecondaryContainerState();
  useNuiEvent('inventory', 'setSecondaryContainer', setSecondaryContainer);

}
