import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import {MustMatchDirective} from './auth/signup/must-match.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectListComponent } from './project-manager/project-list/project-list.component';
import { ProjectDetailsComponent } from './project-manager/project-details/project-details.component';
import { ProjectCreateComponent } from './project-manager/project-create/project-create.component';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ButtonModule,
  CodeHighlighterModule, DialogModule,
  InputTextareaModule,
  InputTextModule,
  ListboxModule, MenubarModule, MessageModule,
  PanelModule, ScrollPanelModule, SplitButtonModule,
  TabViewModule
} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import { TaskItemComponent } from './project-manager/task/task-item/task-item.component';
import { TaskDetailsComponent } from './project-manager/task/task-details/task-details.component';
import {TableModule} from 'primeng/table';
import { HeaderComponent } from './header/header.component';
import { CommentItemComponent } from './project-manager/task/comment/comment-item/comment-item.component';
import { NewCommentComponent } from './project-manager/task/comment/new-comment/new-comment.component';


const appRouts: Routes = [
  {path: 'login', component: SigninComponent},
  {path: 'register', component: SignupComponent},
  {path: 'project-manager', component: ProjectManagerComponent,
      children: [
        {path: 'list', component: ProjectListComponent},
        {path: 'create', component: ProjectCreateComponent},
        {path: 'details/:mode/:id', component: ProjectDetailsComponent}
      ]}
];


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    MustMatchDirective,
    ProjectManagerComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    ProjectCreateComponent,
    ProjectDetailsComponent,
    TaskItemComponent,
    TaskDetailsComponent,
    HeaderComponent,
    CommentItemComponent,
    NewCommentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouts),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    ButtonModule,
    ListboxModule,
    ButtonModule,
    TabViewModule,
    CodeHighlighterModule,
    InputTextareaModule,
    ToastModule,
    PanelModule,
    MessageModule,
    TableModule,
    SplitButtonModule,
    DialogModule,
    MenubarModule,
    InputTextModule,
    ScrollPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
