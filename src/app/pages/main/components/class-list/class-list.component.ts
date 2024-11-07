import { Component, ViewEncapsulation } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClassListComponent {
  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: '/' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: '#' },
    { name: "Professores", image: 'assets/icons-sidebar/professores.svg', route: '#' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route:'#' }
  ];
}
