function confirmDelete(id) {
    // Exibe um pop-up de confirmação
    if (confirm('Você tem certeza que deseja excluir este produto?')) {
        // Se o usuário clicar em "OK", redireciona para a rota de exclusão
        window.location.href = '/delete/' + id;
    } else {
        // Se o usuário clicar em "Cancelar", apenas recarrega a página
        window.location.reload();
    }
}
