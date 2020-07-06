
import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';


const entityMetadata: EntityMetadataMap = {
  Hero: {}
};

export const pluralNames = {
  Hero: 'Heroes'
};

export const entityConfig: EntityDataModuleConfig = {
    pluralNames: pluralNames,
    entityMetadata: entityMetadata
  }


