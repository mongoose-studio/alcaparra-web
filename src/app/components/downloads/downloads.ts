import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Installer {
    key: string;
    os: string;
    osIcon: string;
    arch: string;
    format: string;
    href: string;
    primary: boolean;
}

export interface Plugin {
    editor: string;
    editorIcon: string;
    format: string;
    href: string;
    note: string;
}

const BASE = 'https://github.com/mongoose-studio/alcaparra-lsp/releases/latest/download';

@Component({
    selector: 'app-downloads',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './downloads.html',
    styleUrl: './downloads.scss',
})
export class DownloadsComponent implements OnInit {
    version = '0.1.0';
    curlCommand = 'curl -fsSL https://alcaparra.mongoosestudio.cl/install.sh | sh';
    copied = signal(false);

    installers = signal<Installer[]>([
        {
            key: "mac_arm",
            os: 'macOS',
            osIcon: 'images/macos.svg',
            arch: 'Apple Silicon (arm64)',
            format: '.dmg',
            href: `${BASE}/alcaparra-macos-arm64.dmg`,
            primary: false,
        },
        {
            key: "mac_intel",
            os: 'macOS',
            osIcon: 'images/macos.svg',
            arch: 'Intel (x86_64)',
            format: '.dmg',
            href: `${BASE}/alcaparra-macos-x86_64.dmg`,
            primary: false,
        },
        {
            key: "linux",
            os: 'Linux',
            osIcon: 'images/linux.svg',
            arch: 'x86_64',
            format: '.deb',
            href: `${BASE}/alcaparra-linux-x86_64.deb`,
            primary: false,
        },
        {
            key: "linux2",
            os: 'Linux',
            osIcon: 'images/linux.svg',
            arch: 'x86_64',
            format: '.tar.gz',
            href: `${BASE}/alcaparra-linux-x86_64.tar.gz`,
            primary: false,
        },
        {
            key: "windows",
            os: 'Windows',
            osIcon: 'images/windows.svg',
            arch: 'x86_64',
            format: '.msi',
            href: `${BASE}/alcaparra-windows-x86_64.msi`,
            primary: false,
        },
    ]);

    ngOnInit() {
        this.detectPrimaryInstaller();
    }

    private detectPrimaryInstaller() {
        const ua = navigator.userAgent;
        const isMac = /Mac/i.test(ua) && !/iPhone|iPad/.test(ua);
        const isLinux = /Linux/i.test(ua) && !/Android/.test(ua);
        const isWindows = /Win/i.test(ua);

        if (isMac) {
            // userAgentData.getHighEntropyValues distingue arm64 vs x86 en Chromium.
            // En Safari/Firefox caemos al default: arm64 (mayoría de Macs actuales).
            const uad = (navigator as any).userAgentData;
            if (uad?.getHighEntropyValues) {
                uad.getHighEntropyValues(['architecture'])
                    .then((data: { architecture: string }) => {
                        this.setPrimary(data.architecture === 'arm' ? 'mac_arm' : 'mac_intel');
                    })
                    .catch(() => this.setPrimary('mac_arm'));
            } else {
                this.setPrimary('mac_arm');
            }
        } else if (isLinux) {
            this.setPrimary('linux');
        } else if (isWindows) {
            this.setPrimary('windows');
        }
    }

    private setPrimary(key: string) {
        this.installers.update(list =>
            list.map(i => ({ ...i, primary: i.key === key }))
        );
    }

    plugins: Plugin[] = [
        {
            editor: 'JetBrains IDEs',
            editorIcon: 'jetbrains',
            format: '.zip',
            href: `${BASE}/alcaparra-jetbrains.zip`,
            note: 'Settings → Plugins → Install from disk…',
        },
        {
            editor: 'VS Code',
            editorIcon: 'vscode',
            format: '.vsix',
            href: `${BASE}/alcaparra-vscode.vsix`,
            note: 'Extensions → Install from VSIX…',
        },
    ];

    async copyCurl() {
        await navigator.clipboard.writeText(this.curlCommand);
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
    }
}
