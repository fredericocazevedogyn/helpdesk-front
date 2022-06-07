import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from './../../../service/chamado.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Tecnico } from './../../../models/tecnicos';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientes';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-chamado-view',
  templateUrl: './chamado-view.component.html',
  styleUrls: ['./chamado-view.component.css']
})
export class ChamadoViewComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacao: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade:   FormControl = new FormControl(null, [Validators.required])
  status:       FormControl = new FormControl(null, [Validators.required])
  titulo:       FormControl = new FormControl(null, [Validators.required])
  observacao:  FormControl = new FormControl(null, [Validators.required])
  tecnico:      FormControl = new FormControl(null, [Validators.required])
  cliente:      FormControl = new FormControl(null, [Validators.required])

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toastService:   ToastrService,
    private router:         Router,
    private route:          ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }
  retornaStatus(status: any): string {
    if (status == '0'){
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0'){
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

}
