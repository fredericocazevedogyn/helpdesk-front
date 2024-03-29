import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from './../../../service/chamado.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Tecnico } from './../../../models/tecnicos';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientes';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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

  prioridade:   UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  status:       UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  titulo:       UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  observacao:  UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  tecnico:      UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  cliente:      UntypedFormControl = new UntypedFormControl(null, [Validators.required])

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

  update(): void {
    this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado alterado com sucesso', 'Alterar chamado');
      this.router.navigate(['chamados']);
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

  validaCampos(): boolean {
    return  this.prioridade.valid &&
            this.status.valid     &&
            this.titulo.valid     &&
            this.observacao.valid &&
            this.tecnico.valid    &&
            this.cliente.valid
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
