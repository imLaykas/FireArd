function confirmDelete(id) {
    // Exibe o modal de confirmação
    var modal = document.getElementById('confirmModal');
    modal.style.display = 'block';

    // Quando o usuário clicar em "Sim"
    document.getElementById('confirmYes').onclick = function () {
        window.location.href = '/delete/' + id;
    };

    // Quando o usuário clicar em "Não"
    document.getElementById('confirmNo').onclick = function () {
        modal.style.display = 'none';
        window.location.reload();
    };
}