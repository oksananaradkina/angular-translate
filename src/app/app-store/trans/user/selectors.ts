import { IUser as EntityType, IUserStatus as StatusType } from '@app/types/user';
import { EntityStore } from '@app-lib/store/entity';
// import IFormProps = FormSelectors.IFormProps;
import { IAppState } from '@app/app-store/app-store.module';
import { StoreState } from './state';

export const StoreSelectors = EntityStore.createSelectors<IAppState, EntityType, StatusType>(
  StoreState.featureName,
  StoreState.featureAdapter
)

