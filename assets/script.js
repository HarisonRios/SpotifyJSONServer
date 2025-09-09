      const baseUrl = "http://localhost:3000/albuns";
      const vinilUrl =
        "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png";

      function adicionar() {
        const nomeValor = nome.value;
        const artistaValor = artista.value;
        const imagemValor = imagem.value;

        fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: nomeValor,
            artista: artistaValor,
            imagem: imagemValor,
          }),
        })
          .then(() => {
            nome.value = "";
            artista.value = "";
            imagem.value = "";
            mostrar();
          })
          .catch(() => console.log("Erro ao adicionar"));
      }

      async function mostrar() {
        lista.innerHTML = "";

        try {
          const response = await fetch(baseUrl);
          const data = await response.json();

          data.forEach((element) => {
            lista.innerHTML += `
              <div class="album-item">
                <div class="album-artwork">
                  <img src="${element.imagem}" alt="Capa do álbum" class="album-cover" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHZpZXdCb3g9IjAgMCA5MCA5MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjkwIiBoZWlnaHQ9IjkwIiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik0zMCAzMEg2MFY2MEgzMFYzMFoiIGZpbGw9IiM2NjYiLz4KPC9zdmc+'" />
                  <img src="${vinilUrl}" alt="Vinil" class="album-vinil" />
                </div>
                <div class="album-details">
                  <div class="album-name">${element.nome}</div>
                  <div class="album-artist">${element.artista}</div>
                </div>
                <div class="album-id">#${element.id}</div>
              </div>
            `;
          });
        } catch (error) {
          console.log("Erro ao carregar dados");
        }
      }

      function alterar() {
        const idValor = id.value;
        const nomeValor = nome.value;
        const artistaValor = artista.value;
        const imagemValor = imagem.value;

        fetch(`${baseUrl}/${idValor}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: nomeValor,
            artista: artistaValor,
            imagem: imagemValor,
          }),
        })
          .then(() => {
            id.value = "";
            nome.value = "";
            artista.value = "";
            imagem.value = "";
            mostrar();
          })
          .catch(() => console.log("Erro ao alterar"));
      }

      function remover() {
        const idValor = id.value;

        fetch(`${baseUrl}/${idValor}`, {
          method: "DELETE",
        })
          .then(() => {
            id.value = "";
            mostrar();
          })
          .catch(() => console.log("Erro ao remover"));
      }

      mostrar();