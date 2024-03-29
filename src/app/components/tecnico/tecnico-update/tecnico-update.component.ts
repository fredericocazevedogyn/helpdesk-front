import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from './../../../models/tecnicos';
import { TecnicoService } from 'src/app/service/tecnico.service';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = []
      this.tecnico = resposta;
    })
  }
  
  update(): void {
    this.service.update(this.tecnico).subscribe(resposta => {
      this.toastr.success('Técnico atualizado com sucesso!', 'Update');
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
