import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface UseCase {
    icon: SafeHtml;
    title: string;
    description: string;
    tags: string[];
}

@Component({
    selector: 'app-usecases',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './usecases.html',
    styleUrl: './usecases.scss',
})
export class UsecasesComponent {
    private san = inject(DomSanitizer);

    private svg(paths: string): SafeHtml {
        return this.san.bypassSecurityTrustHtml(
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`,
        );
    }

    cases: UseCase[] = [
        {
            icon: this.svg(
                '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>',
            ),
            title: 'Liquidaciones de sueldo',
            description:
                'Calcula gratificaciones, descuentos previsionales, impuesto de segunda categoría, horas extra y asignaciones familiares con lógica auditada y reproducible.',
            tags: ['AFP', 'Desc. Salud', 'Impuesto 2ª Cat.', 'Horas extra'],
        },
        {
            icon: this.svg(
                '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
            ),
            title: 'Reglas de negocio',
            description:
                'Codifica políticas de precios, descuentos por volumen, cálculo de comisiones y bonos de desempeño como scripts versionados y testeables.',
            tags: ['Pricing', 'Comisiones', 'Bonos', 'Descuentos'],
        },
        {
            icon: this.svg(
                '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>',
            ),
            title: 'Transformación de datos',
            description:
                'Procesa, normaliza y enriquece datasets con funciones de alto nivel. Genera reportes estructurados listos para consumir por otras aplicaciones.',
            tags: ['ETL', 'Reportes', 'Normalización'],
        },
        {
            icon: this.svg(
                '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
            ),
            title: 'Cálculos financieros',
            description:
                'Proyecciones de flujo de caja, amortizaciones, cálculo de intereses y simulación de escenarios con precisión numérica controlada.',
            tags: ['Flujo de caja', 'Amortización', 'Simulación'],
        },
        {
            icon: this.svg(
                '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
            ),
            title: 'Validación de lógica',
            description:
                'Valida que los datos de entrada cumplan reglas de negocio complejas antes de procesar. Genera mensajes de error descriptivos y estructurados.',
            tags: ['Validación', 'Errores', 'Pre-procesado'],
        },
        {
            icon: this.svg(
                '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
            ),
            title: 'Automatización embebida',
            description:
                'Embebe scripts en tu aplicación y ejecútalos en el servidor. El runtime es ligero, sin dependencias externas y con output JSON nativo.',
            tags: ['Servidor', 'JSON', 'Runtime embebido'],
        },
    ];
}
