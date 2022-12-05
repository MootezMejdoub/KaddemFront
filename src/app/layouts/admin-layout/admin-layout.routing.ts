import { Routes, } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AddStudentComponent } from 'src/app/pages/add-student/add-student.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile/:id',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    {path:'addStudent', component:AddStudentComponent},
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

];
