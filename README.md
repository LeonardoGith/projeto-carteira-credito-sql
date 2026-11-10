# Análise da carteira de crédito em SQL

[![Correção do projeto](../../actions/workflows/corrigir.yml/badge.svg)](../../actions/workflows/corrigir.yml)

> ✏️ Troque esta linha por uma frase sua sobre o projeto. Exemplo: "Projeto em que analisei a carteira de uma financeira fictícia para encontrar onde está o risco de inadimplência."

Projeto de portfólio feito na trilha de SQL do **TrainingDevJob**. Todas as consultas são corrigidas automaticamente a cada envio: o selo acima fica verde quando todas as respostas estão certas.

## O problema

A gerência de risco de uma financeira quer um retrato da carteira de crédito: quanto foi emprestado, em quais produtos, onde está a inadimplência e quais clientes precisam de cobrança. Os dados ficam num banco PostgreSQL com seis tabelas:

| Tabela | O que guarda |
|---|---|
| `agencias` | As 8 agências da financeira, com cidade e UF |
| `clientes` | Quem pega empréstimo: renda mensal, telefone (pode faltar) e data de cadastro |
| `contratos` | Cada empréstimo: produto, valor, taxa, número de parcelas e status (`ativo`, `quitado`, `inadimplente`, `cancelado`) |
| `parcelas` | As parcelas de cada contrato, com vencimento e valor |
| `pagamentos` | Cada pagamento de parcela, com data, valor e canal (`pix`, `boleto`, `debito`) |
| `pagamentos_brutos` | Os pagamentos como chegaram do sistema, antes da limpeza (não é usada nesta etapa) |

## As perguntas (etapa Júnior)

Cada pergunta tem um arquivo em [`sql/`](sql). O pedido completo e as colunas esperadas estão no cabeçalho de cada arquivo.

| # | Pergunta | Arquivo |
|---|---|---|
| 1 | Visão geral da carteira | [`01_visao_geral.sql`](sql/01_visao_geral.sql) |
| 2 | Carteira por produto | [`02_carteira_por_produto.sql`](sql/02_carteira_por_produto.sql) |
| 3 | Contratos por status | [`03_contratos_por_status.sql`](sql/03_contratos_por_status.sql) |
| 4 | Inadimplência por agência | [`04_inadimplencia_por_agencia.sql`](sql/04_inadimplencia_por_agencia.sql) |
| 5 | Clientes com parcelas em aberto | [`05_clientes_em_atraso.sql`](sql/05_clientes_em_atraso.sql) |
| 6 | Os 10 maiores contratos inadimplentes | [`06_maiores_inadimplentes.sql`](sql/06_maiores_inadimplentes.sql) |
| 7 | Clientes que nunca contrataram | [`07_clientes_sem_contrato.sql`](sql/07_clientes_sem_contrato.sql) |
| 8 | Perfil de renda dos clientes | [`08_perfil_de_renda.sql`](sql/08_perfil_de_renda.sql) |
| 9 | Recebimento por canal | [`09_recebimento_por_canal.sql`](sql/09_recebimento_por_canal.sql) |
| 10 | Atraso médio por produto | [`10_atraso_medio_por_produto.sql`](sql/10_atraso_medio_por_produto.sql) |

Os resultados de cada consulta ficam em [`resultados/`](resultados), em CSV, gerados pelo `npm test`.

## Conclusões

> ✏️ Escreva aqui de 3 a 5 conclusões com números tirados das suas consultas. Exemplo de formato: "A agência X tem a maior taxa de inadimplência (Y%), quase o dobro da média."

### Recomendações

> ✏️ O que você recomendaria para a gerência de risco a partir desses números? De 2 a 3 recomendações curtas.

As escolhas que fiz em cada consulta estão em [`docs/decisoes.md`](docs/decisoes.md).

## Como rodar

O passo a passo completo, com VS Code, DBeaver ou DataGrip, está em [`docs/como-rodar.md`](docs/como-rodar.md). Resumo:

```bash
docker compose up -d      # sobe o PostgreSQL com a base carregada
npm install               # instala o corretor (uma vez só)
npm test                  # corrige as consultas e gera os CSVs em resultados/
```

## Ferramentas

PostgreSQL 18 · SQL · GitHub Actions (correção automática) · ✏️ a IDE que você usou
