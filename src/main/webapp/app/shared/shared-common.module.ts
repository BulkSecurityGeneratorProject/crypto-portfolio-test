import { NgModule } from '@angular/core';

import { CPortfolioSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [CPortfolioSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [CPortfolioSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CPortfolioSharedCommonModule {}
