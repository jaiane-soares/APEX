// jaiane-soares/apex/APEX-dev/js/upload.js

function handleFileUpload(event) {
    const file = event.target.files[0];
    const feedback = document.getElementById('loading-feedback');
    const dropZone = document.getElementById('drop-zone');

    if (file) {
        // Validação simples de tamanho do arquivo (ex: 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("A imagem é muito grande. Máximo 5MB.");
            return;
        }

        // feedback de carregamento
        dropZone.style.opacity = '0.3';
        feedback.style.display = 'flex';

        const reader = new FileReader();

        // Quando a leitura do arquivo terminar
        reader.onload = function(e) {
            const base64Image = e.target.result;

            // Salva a imagem no localStorage (simulando persistencia de dados back)
            try {
                localStorage.setItem('apex_car_image', base64Image);
                console.log("Imagem salva temporariamente.");

                // Redireciona automaticamente para a tela de personalização após um pequeno delay
                setTimeout(() => {
                    window.location.href = 'personalizar.html';
                }, 1500); // 1.5 segundos de delay para mostrar tela de personalização

            } catch (error) {
                console.error("Erro ao salvar imagem:", error);
                alert("Ocorreu um erro ao processar a imagem. Tente uma imagem menor.");
                dropZone.style.opacity = '1';
                feedback.style.display = 'none';
            }
        };

        

        // Lê o arquivo como URL Base64
        reader.readAsDataURL(file);
    }
}