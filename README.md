# n8n-nodes-brasilapi

> **Nodes customizados do n8n para múltiplas consultas à BrasilAPI (CEP, DDD, CNPJ, FIPE e outros)**

Este pacote adiciona ao n8n vários nodes que permitem buscar informações em diversos endpoints da [BrasilAPI](https://brasilapi.com.br/): CEP, DDD, CNPJ, FIPE e outros.  
Ótimo para automatizar validação de dados e enriquecer seus workflows!

---

## 🚀 Instalação

No diretório do seu n8n:

```bash
npm install n8n-nodes-brasilapi```


Reinicie seu n8n após instalar.

🟢 Como usar
No editor do n8n, busque por qualquer node começando por BrasilAPI (CEP, DDD, CNPJ, FIPE, etc).

Adicione ao seu workflow.

Configure os parâmetros conforme o node/consulta desejada.

Rode o fluxo normalmente.

📚 Endpoints suportados
CEP — consulta de endereço via CEP

DDD — consulta de cidades/estados por DDD

CNPJ — informações completas de empresa

FIPE — marcas, modelos e preços de veículos

Outros endpoints da BrasilAPI podem ser adicionados futuramente!

🧩 Exemplo de uso
Consultando um CEP:
json
Copiar
Editar
{
  "cep": "74310-110",
  "state": "GO",
  "city": "Goiânia",
  "neighborhood": "Vila Redenção",
  "street": "Rua 106",
  "service": "correios"
}
🖼️ Ícone personalizado
Cada node exibe um ícone BrasilAPI para facilitar identificação visual.

🤝 Contribuindo
Pull requests são super bem-vindos!
Para sugestões, bugs ou melhorias, abra uma issue.

📄 Licença
MIT

Autor: Gabryel Goncalves

yaml
Copiar
Editar

---

Se quiser um README mais avançado (com exemplos por endpoint, prints, badges ou links diretos), só avisar!  
Pode publicar tranquilamente esse texto — ficou bem completo e profissional! 🚀