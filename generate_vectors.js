// 👇 LISTE AQUI OS ARQUIVOS QUE ESTÃO EM /docs
const MANUAL_FILE_LIST = [
    "Resumo - Cuponeria.docx",
    "WS - CWS - DOC - APIS.pdf"
    // adicione aqui todos os nomes
];

async function generate() {
    const output = document.getElementById("output");
    output.textContent = "Gerando vetores...\n\n";

    if (MANUAL_FILE_LIST.length === 0) {
        output.textContent = "❌ Erro: A lista MANUAL_FILE_LIST está vazia.\n";
        return;
    }

    output.textContent += "Arquivos configurados:\n";
    output.textContent += MANUAL_FILE_LIST.join("\n") + "\n\n";

    const vectors = [];

    for (const file of MANUAL_FILE_LIST) {
        const url = "docs/" + file;

        output.textContent += `Lendo: ${file} ...\n`;

        let text = "";

        try {
            text = await fetch(url).then(r => r.text());
        } catch (err) {
            output.textContent += `❌ Erro ao ler ${file}\n`;
            continue;
        }

        vectors.push({
            filename: file,
            text: text
        });
    }

    output.textContent += "\n✔ Vetores gerados! Baixando vectorstore.json...\n";

    // Download automático do arquivo
    const json = JSON.stringify(vectors, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "vectorstore.json";
    link.click();

    output.textContent += "\nAgora faça upload do vectorstore.json para a raiz do repositório.\n";
}
