import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface CodeTab {
  id: string;
  label: string;
  filename: string;
  tokens: CodeToken[];
}

export interface CodeToken {
  type: 'kw' | 'fn' | 'str' | 'num' | 'cmt' | 'doc' | 'tag' | 'var' | 'mut' | 'punct' | 'plain' | 'nl';
  text: string;
}

function t(type: CodeToken['type'], text: string): CodeToken { return { type, text }; }
const nl: CodeToken = { type: 'nl', text: '' };

const SCRIPT_TOKENS: CodeToken[] = [
  t('doc','/// Calcula el bono mensual del trabajador.'), nl,
  t('doc','/// '), t('tag','@param'), t('doc',' base    Sueldo base mensual'), nl,
  t('doc','/// '), t('tag','@param'), t('doc',' factor  Porcentaje del bono (0–1)'), nl,
  t('doc','/// '), t('tag','@returns'), t('doc','        Monto del bono calculado'), nl,
  t('kw','fn'), t('plain',' '), t('fn','calcular_bono'), t('punct','('), t('var','base'), t('punct',', '), t('var','factor'), t('punct',') {'), nl,
  t('plain','    '), t('kw','let'), t('plain',' '), t('var','tope'), t('plain',' = '), t('num','500_000'), t('punct',';'), nl,
  t('plain','    '), t('kw','var'), t('plain',' '), t('mut','resultado'), t('plain',' = '), t('var','base'), t('plain',' * '), t('var','factor'), t('punct',';'), nl,
  t('plain','    '), t('kw','if'), t('plain',' '), t('mut','resultado'), t('plain',' > '), t('var','tope'), t('plain',' {'), nl,
  t('plain','        '), t('mut','resultado'), t('plain',' = '), t('var','tope'), t('punct',';'), nl,
  t('plain','    '), t('punct','}'), nl,
  t('plain','    '), t('kw','emit'), t('plain',' '), t('mut','resultado'), t('punct',';'), nl,
  t('punct','}'), nl,
  nl,
  t('kw','main'), t('plain',' {'), nl,
  t('plain','    '), t('kw','let'), t('plain',' '), t('var','bono'), t('plain',' = '), t('fn','calcular_bono'), t('punct','('), t('plain','SUELDO_BASE, '), t('num','0.15'), t('punct',');'), nl,
  t('plain','    '), t('kw','emit'), t('plain',' { bono: '), t('var','bono'), t('plain',' };'), nl,
  t('punct','}'), nl,
];

const LIBRARY_TOKENS: CodeToken[] = [
  t('kw','use'), t('plain',' std.math.{ '), t('fn','round'), t('plain',', '), t('fn','min'), t('plain',' };'), nl,
  nl,
  t('doc','/// Calcula impuesto 2ª categoría (tramos Chile).'), nl,
  t('doc','/// '), t('tag','@param'), t('doc',' base_imponible  Renta imponible mensual'), nl,
  t('doc','/// '), t('tag','@returns'), t('doc','                Monto de impuesto a retener'), nl,
  t('kw','fn'), t('plain',' '), t('fn','calcular_impuesto'), t('punct','('), t('var','base_imponible'), t('plain',') {'), nl,
  t('plain','    '), t('kw','let'), t('plain',' '), t('var','utm'), t('plain',' = UTM;'), nl,
  t('plain','    '), t('kw','var'), t('plain',' '), t('mut','impuesto'), t('plain',' = '), t('num','0'), t('punct',';'), nl,
  t('plain','    '), t('kw','if'), t('plain',' '), t('var','base_imponible'), t('plain',' <= '), t('var','utm'), t('plain',' * '), t('num','13.5'), t('plain',' {'), nl,
  t('plain','        '), t('mut','impuesto'), t('plain',' = '), t('num','0'), t('punct',';'), nl,
  t('plain','    } '), t('kw','else'), t('plain',' {'), nl,
  t('plain','        '), t('mut','impuesto'), t('plain',' = '), t('var','base_imponible'), t('plain',' * '), t('num','0.04'), t('punct',';'), nl,
  t('plain','    }'), nl,
  t('plain','    '), t('kw','emit'), t('plain',' '), t('fn','round'), t('punct','('), t('mut','impuesto'), t('plain',', '), t('num','0'), t('plain',');'), nl,
  t('punct','}'), nl,
];

const CAPERCFG_TOKENS: CodeToken[] = [
  t('punct','{'), nl,
  t('plain','  '), t('str','"name"'), t('plain',':       '), t('str','"liquidacion-sueldo"'), t('punct',','), nl,
  t('plain','  '), t('str','"version"'), t('plain',':    '), t('str','"2.0.0"'), t('punct',','), nl,
  t('plain','  '), t('str','"entry"'), t('plain',':      '), t('str','"main.caper"'), t('punct',','), nl,
  t('plain','  '), t('str','"context"'), t('plain',': {'), nl,
  t('plain','    '), t('str','"SUELDO_BASE"'), t('plain',':  '), t('num','3200000'), t('punct',','), nl,
  t('plain','    '), t('str','"AFP_TASA"'), t('plain',':     '), t('num','0.10'), t('punct',','), nl,
  t('plain','    '), t('str','"SALUD_TASA"'), t('plain',':   '), t('num','0.07'), nl,
  t('plain','  },'), nl,
  t('plain','  '), t('str','"paths"'), t('plain',': {'), nl,
  t('plain','    '), t('str','"@lib"'), t('plain',':       '), t('str','"./lib"'), nl,
  t('plain','  }'), nl,
  t('punct','}'), nl,
];

/** Convierte tokens a HTML string (sin whitespace extra, apto para <pre>) */
function tokensToHtml(tokens: CodeToken[]): string {
  return tokens.map(tok => {
    if (tok.type === 'nl') return '\n';
    const escaped = tok.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<span class="s-${tok.type}">${escaped}</span>`;
  }).join('');
}

@Component({
  selector: 'app-code-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-showcase.html',
  styleUrl: './code-showcase.scss',
})
export class CodeShowcaseComponent {
  private sanitizer = inject(DomSanitizer);
  activeTab = signal('script');

  tabs: CodeTab[] = [
    { id: 'script',  label: 'Script',   filename: 'liquidacion.caper', tokens: SCRIPT_TOKENS },
    { id: 'library', label: 'Librería', filename: 'legal.caper',       tokens: LIBRARY_TOKENS },
    { id: 'config',  label: 'Config',   filename: '.capercfg',         tokens: CAPERCFG_TOKENS },
  ];

  codeHtml = computed<SafeHtml>(() => {
    const tab = this.tabs.find(t => t.id === this.activeTab()) ?? this.tabs[0];
    return this.sanitizer.bypassSecurityTrustHtml(tokensToHtml(tab.tokens));
  });

  get currentTab(): CodeTab {
    return this.tabs.find(t => t.id === this.activeTab()) ?? this.tabs[0];
  }

  get lineCount(): number {
    const tab = this.tabs.find(t => t.id === this.activeTab()) ?? this.tabs[0];
    return tab.tokens.filter(t => t.type === 'nl').length;
  }

  get lineNumbers(): number[] {
    return Array.from({ length: this.lineCount }, (_, i) => i + 1);
  }

  selectTab(id: string) { this.activeTab.set(id); }
}
