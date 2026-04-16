import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.html',
    styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
    readonly phrases = [
        'cálculos complejos',
        'business intelligence',
        'generación de datasets',
        'reglas de negocio',
        'lógica declarativa',
        'ejecución embebida',
        'runtime de reglas',
        'cálculo determinístico',
        'validación de lógica',
        'simulación de escenarios',
        'modelado de reglas',
        'automatización de decisiones',
    ];

    currentIndex = signal(0);
    animating = signal(false); // true durante la transición (fade-out → fade-in)

    private timer?: ReturnType<typeof setInterval>;

    ngOnInit() {
        this.timer = setInterval(() => this.nextPhrase(), 3000);
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }

    private nextPhrase() {
        this.animating.set(true);
        // Tras el fade-out (300ms) cambia el texto y hace fade-in
        setTimeout(() => {
            this.currentIndex.update((i) => (i + 1) % this.phrases.length);
            this.animating.set(false);
        }, 350);
    }

    get currentPhrase(): string {
        return this.phrases[this.currentIndex()];
    }
}
