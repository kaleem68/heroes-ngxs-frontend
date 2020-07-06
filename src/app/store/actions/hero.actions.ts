
import { EntityOp } from '@ngrx/data';

const action = {
  type: 'some/arbitrary/action/type',
  entityName: 'Hero',
  entityOp: EntityOp.QUERY_ALL
};

