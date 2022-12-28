import { Router } from '@angular/router';
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
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

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
    private router:         Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex)
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

}
