angular.module("hackaton-stefanini").controller("PessoaIncluirAlterarController", PessoaIncluirAlterarController);
PessoaIncluirAlterarController.$inject = ["$rootScope", "$scope", "$location",
    "$q", '$filter', '$routeParams', 'HackatonStefaniniService'];

function PessoaIncluirAlterarController($rootScope, $scope, $location,
    $q, $filter, $routeParams, HackatonStefaniniService) {
    vm = this;
    vm.pessoa = {};
    vm.pessoa.situacao = false;
    vm.url = "http://localhost:8080/treinamento/api/pessoas/";
    vm.init = function () {
       if($routeParams.idPessoa){
        vm.tituloTela = "Editar Pessoa";
        vm.acao = "Editar";
        vm.listarPessoaId($routeParams.idPessoa);
       }else{
        vm.tituloTela = "Cadastrar Pessoa";
        vm.acao = "Cadastrar";
       }
    };

    vm.listarPessoaId = function (id) {
        HackatonStefaniniService.listarId(vm.url+id).then(
            function (response) {
                if (response.data !== undefined){
                    vm.pessoa = response.data;
                    vm.pessoa.dataNascimento = vm.formataDataTela(response.data.dataNascimento);
                }
            }
        );
    };

    vm.incluirAlterarPessoa = function(){
        if(vm.acao == "Cadastrar"){
            vm.executarIncluirPessoa();
        }else if(vm.acao == "Editar"){
            vm.executarAlterarPessoa();
        }
    }

    vm.executarIncluirPessoa = function(metodo){
        vm.pessoa.dataNascimento = vm.formataDataJava(vm.pessoa.dataNascimento);
        var obj = JSON.stringify(vm.pessoa);
        HackatonStefaniniService.incluir(vm.url, obj).then(
            function (response) {
                if (response.status == 200)
                    vm.goToListagem();
            }
        );
    }

    vm.executarAlterarPessoa = function(metodo){
        vm.pessoa.dataNascimento = vm.formataDataJava(vm.pessoa.dataNascimento);
        var obj = JSON.stringify(vm.pessoa);
        HackatonStefaniniService.alterar(vm.url, obj).then(
            function (response) {
                if (response.status == 200)
                    vm.goToListagem();
            }
        );
    }
    
    vm.cancelar = function(){
        vm.goToListagem();
    }

    vm.goToListagem = function(){
        $location.path("listarPessoas");
    }

    vm.formataDataJava = function(data){
        var dia = data.slice(0,2);
        var mes = data.slice(2,4);
        var ano = data.slice(4,8);
        return ano+"-"+mes+"-"+dia;
    }
    vm.formataDataTela = function(data){
        var ano = data.slice(0,4);
        var mes = data.slice(5,7);
        var dia = data.slice(8,10);
        var dataFormatada = dia+mes+ano;
        return dataFormatada;
    }

    vm.abrirModal = function(idPessoa){
           $("#myModal").modal();
    }

}
