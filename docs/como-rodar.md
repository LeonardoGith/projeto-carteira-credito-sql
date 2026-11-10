# Como rodar o projeto

Você precisa de três coisas: o **PostgreSQL** com a base carregada, uma **IDE** para escrever SQL e o **Node.js** para rodar a correção no seu computador. A correção também roda sozinha no GitHub a cada `git push`, então o Node é opcional.

## 1. Criar o seu repositório

1. No repositório-modelo, clique em **Use this template → Create a new repository**.
2. Dê um nome (por exemplo, `analise-carteira-credito-sql`) e deixe **público**, para que empresas possam ver.
3. Clone para o seu computador:
   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   cd SEU-REPOSITORIO
   ```

## 2. Subir o PostgreSQL com a base

**Opção A: Docker (recomendado).** Com o [Docker Desktop](https://www.docker.com/products/docker-desktop/) aberto:

```bash
docker compose up -d
```

Dados da conexão: host `localhost`, porta `5432`, banco `carteira`, usuário `aluno`, senha `aluno`.

**Opção B: PostgreSQL instalado.** Instale pelo [site oficial](https://www.postgresql.org/download/), crie um banco chamado `carteira` e rode o arquivo [`dados/base.sql`](../dados/base.sql) nele (pelo pgAdmin, pela IDE ou com `psql -d carteira -f dados/base.sql`).

## 3. Conectar a IDE

Escolha a que preferir:

- **VS Code:** instale a extensão **SQLTools** e o driver **SQLTools PostgreSQL/Cockroach Driver**. Crie uma conexão com os dados acima, abra um arquivo de `sql/` e use **Run on active connection**.
- **DBeaver** (gratuito): **Nova conexão → PostgreSQL**, preencha os dados acima e abra os arquivos de `sql/` pelo editor SQL.
- **DataGrip:** **New → Data Source → PostgreSQL**, preencha os dados acima e anexe a pasta do projeto.

## 4. Responder e corrigir

1. Abra cada arquivo de `sql/`, leia o pedido no cabeçalho e escreva **uma única consulta** abaixo dele.
2. Teste na IDE até o resultado fazer sentido.
3. Rode a correção (com [Node.js](https://nodejs.org/) 20 ou mais novo):
   ```bash
   npm install
   npm test
   ```
   Para cada pergunta aparece ✅ ou ❌ com uma pista do que está errado. A correção não mostra a resposta.
4. Preencha os trechos marcados com ✏️ no `README.md` e em `docs/decisoes.md`. Eles também contam na correção.

## 5. Enviar

```bash
git add .
git commit -m "Responde as perguntas da etapa Júnior"
git push
```

Na aba **Actions** do seu repositório, a correção roda sozinha. Quando todos os itens passarem, o selo do README fica verde. Cole o link do repositório na página do projeto no TrainingDevJob para registrar a etapa.
