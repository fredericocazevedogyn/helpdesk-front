import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from './../../../models/tecnicos';
import { TecnicoService } from 'src/app/service/tecnico.service';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toastr.success('Técnico cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['tecnicos']);
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
    
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil),1);
    } else {
      this.tecnico.perfis.push(perfil);
    }

  }
  
  validaCampos() {
    return this.nome.valid && this.cpf.valid 
        && this.email.valid && this.senha.valid
  }
}
