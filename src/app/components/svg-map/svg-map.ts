import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';

export interface province {
  id: string;
  name: string;
  clients: number;
}

export interface provinceSvg {
  province: province;
  nodes?: string;    // Esto es por si tenes el "d" (path) en el json en vez de leerlo desde un .svg a mano (en este caso lo estamos leyendo a mano)
  fill: string;
  stroke: string;
  opacity: number;
}

@Component({
  selector: 'app-svg-map',
  imports: [],
  templateUrl: './svg-map.html',
  styleUrl: './svg-map.css'
})
export class SvgMap implements OnInit {
  // --------------- Inputs & Outputs (signals) --------------- //
  /** SVG file path */
  svgPath = input<string>('');

  /** Countries data */
  provinces = input<province[]>([]);

  // --------------- Component Properties --------------- //
  /** SVG size */
  svgSize = signal<{ width: number; height: number }>({ width: 0, height: 0 });

  /** Provinces SVG data */
  provincesSvg = signal<provinceSvg[]>([]);

  // --------------- Injections --------------- //
  private readonly http = inject(HttpClient);

  constructor() {
    // Load SVG size
    effect(() => {
      const path = this.svgPath();
      this.http.get(path, { responseType: 'text' }).subscribe({
        next: (svgText) => {
          //Parseo del SVG (si tuvieses los nodos como string por json o algo entonces esto no haria falta)
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
          const svgElement = svgDoc.querySelector('svg');

          //Actualizo tamaño del SVG (esto solo es para que veas que puede ser dinámico y responsivo)
          this.svgSize.set({
            width: parseFloat(svgElement?.getAttribute('width') || '0'),
            height: parseFloat(svgElement?.getAttribute('height') || '0')
          });

          const paths = svgDoc.querySelectorAll('path[d]');
          const updatedProvincesSvg: provinceSvg[] = [];

          // Actualizo provinciasSvg con los datos de las provincias y sus nodos
          paths.forEach((pathEl: Element) => {
            const id = pathEl.id || pathEl.getAttribute('id') || '';
            const provinceData = this.provinces().find(p => p.id === id);

            updatedProvincesSvg.push({
              province: provinceData || { id, name: id, clients: 0 },
              nodes: pathEl.getAttribute('d') || '',
              fill: 'gray',
              stroke: 'BLACK',
              opacity: 1
            });
          }
          );
          this.provincesSvg.set(updatedProvincesSvg);
        },
        error: () => this.svgSize.set({ width: 0, height: 0 }),
      });
    });
  }


  // --------------- Methods --------------- //
  ngOnInit(): void {
    // Load SVG size

  }

  onClick(id: string) {
    const p = this.provinces().find(p => p.id === id);
    alert("Province clicked: " + p?.name);
  }

}
