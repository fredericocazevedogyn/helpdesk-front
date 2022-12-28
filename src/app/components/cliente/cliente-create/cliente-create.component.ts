import { Cliente } from './../../../models/clientes';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/service/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3))
  cpf: UntypedFormControl = new UntypedFormControl(null, Validators.required)
  email: UntypedFormControl = new UntypedFormControl(null, Validators.email)
  senha: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3))

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.cliente).subscribe(resposta => {
      this.toastr.success('Cliente cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['clientes']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error.message);
      } 
    });
  }

  addPerfil(perfil: any): void {
    
    if(this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil),1);
    } else {
      this.cliente.perfis.push(perfil);
    }

  }
  
  validaCampos() {
    return this.nome.valid && this.cpf.valid 
        && this.email.valid && this.senha.valid
  }

}
