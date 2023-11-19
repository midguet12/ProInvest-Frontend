export function validar () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (evento) {
                if (!form.checkValidity()) {
                    evento.preventDefault()
                    evento.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
};
