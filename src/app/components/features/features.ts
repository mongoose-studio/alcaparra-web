import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface Feature {
  icon: SafeHtml;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class FeaturesComponent {
  private san = inject(DomSanitizer);

  private svg(paths: string): SafeHtml {
    return this.san.bypassSecurityTrustHtml(
      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
    );
  }

  features: Feature[] = [
    {
      icon: this.svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>'),
      title: 'Inmutabilidad explícita',
      description: 'Cada variable declara su intención: <code>let</code> para inmutables, <code>var</code> para mutables. El compilador y el IDE lo refuerzan visualmente.',
    },
    {
      icon: this.svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
      title: 'Determinismo por diseño',
      description: 'Un script con los mismos inputs siempre produce el mismo output. Sin efectos secundarios, sin I/O, sin sorpresas. Ideal para auditorías.',
    },
    {
      icon: this.svg('<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'),
      title: 'Stdlib para negocio',
      description: 'Más de 120 funciones listas: redondeo financiero, formateo de moneda, operaciones con fechas, manipulación de arrays y strings.',
    },
    {
      icon: this.svg('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>'),
      title: 'DocBlocks nativos',
      description: 'Documenta con <code>///</code> directamente antes de cada función. El runtime y el IDE leen la documentación para hover, autocompletado y validación.',
    },
    {
      icon: this.svg('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
      title: 'Módulos reutilizables',
      description: 'Organiza la lógica en librerías <code>.caper</code> e impórtalas con tree-shaking semántico. Sin ciclos, sin dependencias ocultas.',
    },
    {
      icon: this.svg('<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>'),
      title: 'Contexto inyectable',
      description: 'Las variables externas se declaran en <code>.capercfg</code> y se inyectan en tiempo de ejecución. Separa la lógica de los datos sin tocar el código.',
    },
  ];
}
