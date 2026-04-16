import { Component } from '@angular/core';
import { NavComponent }          from './components/nav/nav';
import { HeroComponent }         from './components/hero/hero';
import { PhilosophyComponent }   from './components/philosophy/philosophy';
import { FeaturesComponent }     from './components/features/features';
import { CodeShowcaseComponent } from './components/code-showcase/code-showcase';
import { UsecasesComponent }     from './components/usecases/usecases';
import { ToolingComponent }      from './components/tooling/tooling';
import { DownloadsComponent }    from './components/downloads/downloads';
import { SupportComponent }      from './components/support/support';
import { FooterComponent }       from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    PhilosophyComponent,
    FeaturesComponent,
    CodeShowcaseComponent,
    UsecasesComponent,
    ToolingComponent,
    DownloadsComponent,
    SupportComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
