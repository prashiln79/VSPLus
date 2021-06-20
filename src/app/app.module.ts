import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileNavigatorComponent } from './components/file-navigator/file-navigator.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FloatingCtrlComponent } from './components/floating-ctrl/floating-ctrl.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BranchDetailsEffects } from './effects/branch-details.effects';

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    FileNavigatorComponent,
    HeaderComponent,
    ChatBoxComponent,
    FloatingCtrlComponent,
    TerminalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule,
    MatInputModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([BranchDetailsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
