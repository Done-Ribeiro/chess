import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

export interface Jogador {
  id: number;
  nome: string;
  rating: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  titulo = 'Chess_kipe - Sorteador de Equipes';
  rodape = 'Desenvolvido por Done Ribeiro';
  nomeTimeA = 'EQUIPE 1';
  nomeTimeB = 'EQUIPE 2';
  time1: Jogador[] = [];
  time2: Jogador[] = [];
  dataSource1 = new MatTableDataSource(this.time1);
  dataSource2 = new MatTableDataSource(this.time2);
  displayedColumns: string[] = ['id', 'nome', 'rating', 'acao'];
  jogador_timeA = { id: '', nome: '', rating: '' };
  jogador_timeB = { id: '', nome: '', rating: '' };

  getRatingMedioA() {
    if (this.dataSource1.data.length != 0) {
      let soma = 0;
      this.dataSource1.data.forEach(r => {
        soma += Number(r.rating);
      });
      let media = soma / this.dataSource1.data.length;
      return media;
    } else {
      return 0;
    }
  }

  getRatingMedioB() {
    if (this.dataSource2.data.length != 0) {
      let soma = 0;
      this.dataSource2.data.forEach(r => {
        soma += Number(r.rating);
      });
      let media = soma / this.dataSource2.data.length;
      return media;
    } else {
      return 0;
    }
  }

  @ViewChild('sortA', { static: true }) sortA: MatSort;
  @ViewChild('sortB', { static: true }) sortB: MatSort;

  ngAfterViewInit() {
    localStorage.setItem('Time_A', JSON.stringify(this.time1));
    localStorage.setItem('Time_B', JSON.stringify(this.time2));
    this.dataSource1.sort = this.sortA;
    this.dataSource2.sort = this.sortB;
  }

  ordenarDadosRating(data) {
    data.sort((a, b) => {
      return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
    });
    return data;
  }

  addJogadorTimeA(jogador1) {
    this.time1.push(jogador1);
    this.jogador_timeA = { id: '', nome: '', rating: '' };
    this.dataSource1.data = this.time1;
    this.dataSource1.data = this.ordenarDadosRating(this.dataSource1.data);
    let countA = 0;
    this.dataSource1.data.forEach(jogador => {
      jogador.id = countA++;
    });
    localStorage.setItem('Time_A', JSON.stringify(this.time1));
  }

  addJogadorTimeB(jogador2) {
    this.time2.push(jogador2);
    this.jogador_timeB = { id: '', nome: '', rating: '' };
    this.dataSource2.data = this.time2;
    this.dataSource2.data = this.ordenarDadosRating(this.dataSource2.data);
    let countB = 0;
    this.dataSource2.data.forEach(jogador => {
      jogador.id = countB++;
    });
    localStorage.setItem('Time_B', JSON.stringify(this.time2));
  }

  deletarJogadorTimeA(jogadorId1) {
    if (this.time1.length == 1) {
      this.time1.pop();
    } else {
      this.time1.splice(jogadorId1, 1);
    }
    this.dataSource1.data = this.time1;
    let countA = 0;
    this.dataSource1.data.forEach(i => {
      i.id = countA++;
    });
    localStorage.setItem('Time_A', JSON.stringify(this.dataSource1.data));
  }

  deletarJogadorTimeB(jogadorId2) {
    if (this.time2.length == 1) {
      this.time2.pop();
    } else {
      this.time2.splice(jogadorId2, 1);
    }
    this.dataSource2.data = this.time2;
    let countB = 0;
    this.dataSource2.data.forEach(i => {
      i.id = countB++;
    });
    localStorage.setItem('Time_B', JSON.stringify(this.dataSource2.data));
  }

}