import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/checklist',
    pathMatch: 'full',
  },
  {
    path: 'checklist',
    loadChildren: () =>
      import('./pages/checklist/checklist.module').then(
        (m) => m.ChecklistPageModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'checklist/:id',
    loadChildren: () =>
      import('./pages/checklist/checklist.module').then(
        (m) => m.ChecklistPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
