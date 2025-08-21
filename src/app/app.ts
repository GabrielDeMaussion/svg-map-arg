import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { province, SvgMap } from './components/svg-map/svg-map';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SvgMap],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('svg-map');

  svgPath = signal('images/argentina-map.svg');
  provinces = signal<province[]>([
    { id: '1', name: 'Province 1', clients: 100 },
    { id: '2', name: 'Province 2', clients: 200 },
    { id: '3', name: 'Province 3', clients: 300 },
    { id: '4', name: 'Province 4', clients: 400 },
    { id: '5', name: 'Province 5', clients: 500 },
    { id: '6', name: 'Province 6', clients: 600 },
    { id: '7', name: 'Province 7', clients: 700 },
    { id: '8', name: 'Province 8', clients: 800 },
    { id: '9', name: 'Province 9', clients: 900 },
    { id: '10', name: 'Province 10', clients: 1000 },
    { id: '11', name: 'Province 11', clients: 1100 },
    { id: '12', name: 'Province 12', clients: 1200 },
    { id: '13', name: 'Province 13', clients: 1300 },
    { id: '14', name: 'Province 14', clients: 1400 },
    { id: '15', name: 'Province 15', clients: 1500 },
    { id: '16', name: 'Province 16', clients: 1600 },
    { id: '17', name: 'Province 17', clients: 1700 },
    { id: '18', name: 'Province 18', clients: 1800 },
    { id: '19', name: 'Province 19', clients: 1900 },
    { id: '20', name: 'Province 20', clients: 2000 },
    { id: '21', name: 'Province 21', clients: 2100 },
    { id: '22', name: 'Province 22', clients: 2200 },
    { id: '23', name: 'Province 23', clients: 2300 },
    { id: '24', name: 'Province 24', clients: 2400 },
    { id: '25', name: 'Province 25', clients: 2500 },
  ]);
}
