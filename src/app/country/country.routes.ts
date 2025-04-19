import { Route } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';

const countryRoutes: Route[] = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: 'by-region',
        loadComponent: () =>
          import('./pages/by-region-page/by-region-page.component'),
      },
      {
        path: 'by-country',
        loadComponent: () =>
          import('./pages/by-country-page/by-country-page.component'),
      },
      {
        path: 'by/:country-code',
        loadComponent: () =>
          import('./pages/country-page/country-page.component'),
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];

export default countryRoutes;
