
async function ask() {
    const input = document.getElementById("userInput").value;
    const responseDiv = document.getElementById("response");

    responseDiv.innerHTML = "Processando...";

    const vectorData = await fetch("vectorstore.json").then(res => res.json());

    const match = vectorData.find(doc => 
        doc.text.toLowerCase().includes(input.toLowerCase())
    );

    if (match) {
        responseDiv.innerHTML = `<b>Resposta:</b><br>${match.text}`;
    } else {
        responseDiv.innerHTML = "Não encontrei nada sobre isso na documentação.";
    }
}
