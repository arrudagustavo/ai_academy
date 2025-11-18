async function generate() {
    const output = document.getElementById("output");
    output.textContent = "Lendo arquivos da pasta /docs...\n";

    // Lista manual de arquivos por segurança
    const files = await fetch("docs/")
        .then(res => res.text())
        .then(html => {
            const matches = [...html.matchAll(/href="([^"]+)"/g)];
            return matches
                .map(m => m[1])
                .filter(name => !name.startsWith("?") && name !== "../");
        });

    output.textContent += "Arquivos encontrados:\n" + files.join("\n") + "\n\n";

    const vectors = [];

    for (const file of files) {
        const url = "docs/" + file;

        output.textContent += `Lendo ${file}...\n`;

        const text = await fetch(url).then(r => r.text());

        vectors.push({
            filename: file,
            text: text
        });
    }

    output.textContent += "\nGerando arquivo vectorstore.json...\n";

    // Baixar o arquivo gerado
    const json = JSON.stringify(vectors, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "vectorstore.json";
    link.click();

    output.textContent += "Pronto! Baixe o arquivo e faça upload manualmente para o repositório.\n";
}
