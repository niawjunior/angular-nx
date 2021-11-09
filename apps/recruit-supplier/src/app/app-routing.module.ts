import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';
import { UiLayoutComponent, UiLayoutModule } from '@recruit-supplier/ui-layout';
import { AwayDisableGuard } from '@recruit-supplier/guards';
const routes: Routes = [
  {
    path: EPageRoute.LOGIN,
    loadChildren: () =>
      import('@recruit-supplier/module-login').then((m) => m.ModuleLoginModule),
  },
  {
    path: '',
    component: UiLayoutComponent,
    children: [
      {
        path: EPageRoute.JOB_POSITION,
        loadChildren: () =>
          import('@recruit-supplier/module-job-position').then(
            (m) => m.JobPositionModule
          ),
      },
      {
        path: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
        loadChildren: () =>
          import(
            '@recruit-supplier/module-recommend-job-position-to-agency'
          ).then((m) => m.RecommendJobPositionToAgencyModule),
      },
      {
        path: EPageRoute.HOME_MANAGEMENT,
        loadChildren: () =>
          import('@recruit-supplier/module-home-management').then(
            (m) => m.HomeManagementModule
          ),
      },
      {
        path: EPageRoute.INTERNSHIP_PAGE_CONTENT,
        loadChildren: () =>
          import('@recruit-supplier/module-internship-page-content').then(
            (m) => m.InternshipPageContentModule
          ),
      },

      {
        path: EPageRoute.WELFARE_PAGE_CONTENT,
        loadChildren: () =>
          import('@recruit-supplier/module-welfare-page-content').then(
            (m) => m.WelfarePageContentModule
          ),
      },
      {
        path: EPageRoute.OTHER_PAGE_CONTENT,
        loadChildren: () =>
          import('@recruit-supplier/module-other-page-content').then(
            (m) => m.OtherPageContentModule
          ),
      },
      {
        path: EPageRoute.ROLE,
        loadChildren: () =>
          import('@recruit-supplier/module-role').then((m) => m.RoleModule),
      },
      {
        path: EPageRoute.USER,
        // canActivate: [AwayDisableGuard],
        loadChildren: () =>
          import('@recruit-supplier/module-user').then((m) => m.UserModule),
      },
      {
        path: EPageRoute.MASTER_INFORMATION,
        loadChildren: () =>
          import('@recruit-supplier/module-master-information').then(
            (m) => m.MasterInformationModule
          ),
      },
      {
        path: EPageRoute.UNKNOWN,
        loadChildren: () =>
          import('@recruit-supplier/module-page-not-found').then(
            (m) => m.PageNotFoundModule
          ),
      },
      { path: '', redirectTo: EPageRoute.JOB_POSITION, pathMatch: 'full' },
      {
        path: '**',
        redirectTo: EPageRoute.UNKNOWN,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), UiLayoutModule],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
