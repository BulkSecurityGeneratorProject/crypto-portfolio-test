import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CPortfolioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CPortfolioSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [CPortfolioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CPortfolioSharedModule {
  static forRoot() {
    return {
      ngModule: CPortfolioSharedModule
    };
  }
}
